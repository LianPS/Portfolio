import { PORTFOLIO_PLANETS as PL } from './data.js';
const THREE=window.THREE;
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const cv = document.getElementById('c');
const ren = new THREE.WebGLRenderer({ canvas:cv, antialias:true, powerPreference:'high-performance' });
const pixelRatio = () => Math.min(window.devicePixelRatio || 1, window.matchMedia('(max-width: 700px)').matches ? 1.25 : 1.75);
ren.setPixelRatio(pixelRatio());
ren.setSize(innerWidth, innerHeight);
ren.toneMapping = THREE.ACESFilmicToneMapping;
ren.toneMappingExposure = 1.15;
const sc = new THREE.Scene();
sc.background = new THREE.Color(0x010810);
sc.fog = new THREE.FogExp2(0x010810, .006);
const cam = new THREE.PerspectiveCamera(45, innerWidth/innerHeight, .1, 800);
cam.position.set(0, 36, 72); cam.lookAt(0,0,0);

// ── NEBULA BACKGROUND ──
const nebMat = new THREE.ShaderMaterial({
  uniforms:{ uTime:{value:0} },
  side: THREE.BackSide,
  vertexShader:`varying vec3 vPos; void main(){ vPos=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
  fragmentShader:`
    uniform float uTime;
    varying vec3 vPos;
    float hash31(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
    float noise3(vec3 p){
      vec3 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
      float a=mix(hash31(i),hash31(i+vec3(1.0,0.0,0.0)),f.x);
      float b=mix(hash31(i+vec3(0.0,1.0,0.0)),hash31(i+vec3(1.0,1.0,0.0)),f.x);
      float c=mix(hash31(i+vec3(0.0,0.0,1.0)),hash31(i+vec3(1.0,0.0,1.0)),f.x);
      float d=mix(hash31(i+vec3(0.0,1.0,1.0)),hash31(i+vec3(1.0,1.0,1.0)),f.x);
      return mix(mix(a,b,f.y),mix(c,d,f.y),f.z);
    }
    void main(){
      vec3 d=normalize(vPos);
      vec3 drift=vec3(uTime*.003,-uTime*.002,uTime*.0015);
      float low=noise3(d*2.5+drift);
      float flow=noise3(d*3.8+vec3(4.1,1.7,6.2)-drift*.7);
      vec3 q=d*5.3+vec3((low-.5)*2.2,(flow-.5)*2.0,(low-flow)*1.8)+drift*1.6;
      float body=noise3(q);
      float detail=noise3(q*2.35+vec3(5.2,2.1,3.4)-drift);
      float fine=noise3(q*5.1+vec3(1.3,7.4,2.6)+drift*2.0);
      float density=body*.48+detail*.32+fine*.20;
      float cloud=smoothstep(.47,.70,density);
      float haze=smoothstep(.39,.61,low*.34+density*.66)*.36;
      float texture=clamp(.52+(body-.5)*.70+(detail-.5)*.80+(fine-.5)*.60,.08,1.40);
      float gas=cloud*texture;
      float dust=smoothstep(.64,.78,detail)*cloud;
      float hot=smoothstep(.68,.84,fine)*cloud;
      // Diffuse gas clouds over a dark star field, with mottled dust and restrained hot spots.
      vec3 nebula=vec3(.0015,.0035,.012);
      vec3 gasTint=mix(vec3(.035,.08,.22),vec3(.23,.035,.12),smoothstep(.43,.66,flow));
      vec3 hotTint=mix(vec3(.08,.18,.38),vec3(.52,.16,.05),smoothstep(.42,.68,low));
      nebula+=vec3(.015,.03,.09)*haze;
      nebula+=gasTint*gas*1.05;
      nebula+=hotTint*hot*.22;
      nebula*=1.0-dust*.68;
      gl_FragColor=vec4(nebula,1.0);
    }
  `,
  depthWrite: false,
});
sc.add(new THREE.Mesh(new THREE.SphereGeometry(500,64,48), nebMat));

// ── STARS ──
(()=>{
  const N=12000, pos=new Float32Array(N*3), sz=new Float32Array(N), br=new Float32Array(N);
  for(let i=0;i<N;i++){
    const r=85+Math.random()*320, th=Math.random()*Math.PI*2, ph=Math.acos(2*Math.random()-1);
    pos[i*3]=r*Math.sin(ph)*Math.cos(th); pos[i*3+1]=r*Math.sin(ph)*Math.sin(th); pos[i*3+2]=r*Math.cos(ph);
    sz[i]=Math.random()*2.6+.25; br[i]=Math.random()*.7+.3;
  }
  const geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  geo.setAttribute('size',new THREE.BufferAttribute(sz,1));
  geo.setAttribute('bright',new THREE.BufferAttribute(br,1));
  sc.add(new THREE.Points(geo, new THREE.ShaderMaterial({
    uniforms:{uTime:{value:0}},
    vertexShader:`attribute float size;attribute float bright;varying float vB;uniform float uTime;void main(){vB=bright*(0.75+0.25*sin(uTime*1.8+bright*12.0));vec4 mv=modelViewMatrix*vec4(position,1.0);gl_PointSize=size*(280.0/-mv.z);gl_Position=projectionMatrix*mv;}`,
    fragmentShader:`varying float vB;void main(){float d=distance(gl_PointCoord,vec2(.5));if(d>.5)discard;float a=(1.0-smoothstep(.08,.5,d))*vB;gl_FragColor=vec4(mix(vec3(.82,.9,1.0),vec3(.95,.8,.7),vB*.3),a);}`,
    transparent:true,depthWrite:false,blending:THREE.AdditiveBlending
  })));
  window._starMat = sc.children[sc.children.length-1].material;
})();

// ── ASTEROID BELT ──
const asteroidBelt=(()=>{
  const N=550;
  const pos=new Float32Array(N*3), sz=new Float32Array(N);
  for(let i=0;i<N;i++){
    const a=Math.random()*Math.PI*2;
    const r=11.5+Math.random()*1.2;
    const y=(Math.random()-.5)*.35;
    pos[i*3]=Math.cos(a)*r; pos[i*3+1]=y; pos[i*3+2]=Math.sin(a)*r;
    sz[i]=Math.random()*1.4+.2;
  }
  const geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  geo.setAttribute('size',new THREE.BufferAttribute(sz,1));
  return new THREE.Points(geo,new THREE.ShaderMaterial({
    vertexShader:`attribute float size;void main(){vec4 mv=modelViewMatrix*vec4(position,1.0);gl_PointSize=size*(200.0/-mv.z);gl_Position=projectionMatrix*mv;}`,
    fragmentShader:`void main(){float d=distance(gl_PointCoord,vec2(.5));if(d>.5)discard;gl_FragColor=vec4(vec3(.55,.52,.48),(.6-d));}`,
    transparent:true,depthWrite:false,blending:THREE.AdditiveBlending
  }));
})();
sc.add(asteroidBelt);
// ── SUN ──
const sunMat = new THREE.ShaderMaterial({
  uniforms:{uTime:{value:0},uC1:{value:new THREE.Color(0xff3300)},uC2:{value:new THREE.Color(0xff7a00)},uC3:{value:new THREE.Color(0xffe24a)}},
  vertexShader:`varying vec3 vP,vNormalView,vViewPosition;uniform float uTime;void main(){vP=position;float n=sin(position.x*8.0+uTime*.55)*sin(position.y*7.0+uTime*.48)*sin(position.z*6.0-uTime*.42)*.026;vec4 mvPosition=modelViewMatrix*vec4(position+normal*n,1.0);vNormalView=normalize(normalMatrix*normal);vViewPosition=mvPosition.xyz;gl_Position=projectionMatrix*mvPosition;}`,
  fragmentShader:`
    varying vec3 vP,vNormalView,vViewPosition;
    uniform float uTime;
    uniform vec3 uC1,uC2,uC3;
    float hash31(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
    float noise3(vec3 p){
      vec3 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
      float a=mix(hash31(i),hash31(i+vec3(1.0,0.0,0.0)),f.x);
      float b=mix(hash31(i+vec3(0.0,1.0,0.0)),hash31(i+vec3(1.0,1.0,0.0)),f.x);
      float c=mix(hash31(i+vec3(0.0,0.0,1.0)),hash31(i+vec3(1.0,0.0,1.0)),f.x);
      float d=mix(hash31(i+vec3(0.0,1.0,1.0)),hash31(i+vec3(1.0,1.0,1.0)),f.x);
      return mix(mix(a,b,f.y),mix(c,d,f.y),f.z);
    }
    float fbm(vec3 p){float v=0.0,a=.5;for(int i=0;i<4;i++){v+=noise3(p)*a;p=p*2.03+vec3(7.1,3.7,5.3);a*=.5;}return v;}
    void main(){
      vec3 p=normalize(vP);
      float broad=fbm(p*3.0+vec3(0.0,-uTime*.035,uTime*.025));
      float turbulent=fbm(p*9.0+vec3(broad*2.4,uTime*.07,-uTime*.05));
      float fine=fbm(p*20.0+vec3(-uTime*.11,uTime*.04,0.0));
      float convection=smoothstep(.3,.74,turbulent*.72+broad*.28);
      float hot=pow(smoothstep(.36,.82,fine*.55+turbulent*.45),2.0);
      vec3 color=mix(uC1,uC2,clamp(.2+broad*.9,0.0,1.0));
      color=mix(color,uC3,convection*.72);
      float rim=pow(1.0-max(dot(normalize(vNormalView),normalize(-vViewPosition)),0.0),2.2);
      color+=vec3(1.0,.44,.12)*rim*.95+vec3(1.0,.20,.035)*hot*.62;
      gl_FragColor=vec4(color,1.0);
    }
  `,
});
const sun = new THREE.Mesh(new THREE.SphereGeometry(3.2,64,64), sunMat);
sc.add(sun);

const sunCoronaMat=new THREE.ShaderMaterial({
  uniforms:{uTime:{value:0}},
  vertexShader:`varying vec3 vLocal,vNormalView,vViewPosition;void main(){vLocal=position;vec4 mvPosition=modelViewMatrix*vec4(position,1.0);vNormalView=normalize(normalMatrix*normal);vViewPosition=mvPosition.xyz;gl_Position=projectionMatrix*mvPosition;}`,
  fragmentShader:`varying vec3 vLocal,vNormalView,vViewPosition;uniform float uTime;void main(){float rim=pow(1.0-max(dot(normalize(vNormalView),normalize(-vViewPosition)),0.0),2.0);float waves=.5+.5*sin(vLocal.y*3.2+sin(vLocal.x*2.7+uTime*.12)*1.3+uTime*.16);vec3 color=mix(vec3(1.0,.12,.015),vec3(1.0,.65,.16),waves);gl_FragColor=vec4(color,rim*(.18+.20*waves));}`,
  transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending
});
const sunCorona=new THREE.Mesh(new THREE.SphereGeometry(3.48,48,48),sunCoronaMat);
sc.add(sunCorona);

// Sun glow layers
const sunGlows=[];
[4.2, 5.6, 7.5].forEach((s,i)=>{
  const baseOpacity=[.07,.035,.015][i];
  const m=new THREE.Mesh(new THREE.SphereGeometry(s,24,24), new THREE.MeshBasicMaterial({
    color:new THREE.Color(i===0?0xff6600:i===1?0xff4400:0xff2200),
    transparent:true, opacity:baseOpacity,
    side:THREE.BackSide, depthWrite:false, blending:THREE.AdditiveBlending
  }));
  m.userData.baseOpacity=baseOpacity;
  sunGlows.push(m);
  sc.add(m);
});

const sl = new THREE.PointLight(0xffa030, 4, 90);
sc.add(sl);
sc.add(new THREE.AmbientLight(0x0a1525, .85));

// ── PLANET TEXTURE GENERATOR ──
const PLANET_BODY_BY_ID=Object.freeze({
  about:'mercury', skills:'venus', formations:'earth', exps:'mars',
  passions:'jupiter', contact:'saturn', erma:'uranus', veille:'neptune', greenit:'pluto'
});
const PLANET_PALETTES={
  mercury:{base:'#85817b',dark:'#37383a',light:'#d3ccc0'},
  venus:{base:'#d8ad6b',dark:'#8c653a',light:'#f6e2b0'},
  earth:{base:'#2676a6',dark:'#092c55',light:'#b5d7d1',ocean:'#0c4775',land:'#4c8151'},
  mars:{base:'#b65b43',dark:'#48292b',light:'#f1b38c'},
  jupiter:{base:'#c18a5d',dark:'#68483a',light:'#f0d3a7',spot:'#c95743'},
  saturn:{base:'#d6c193',dark:'#8c795b',light:'#f4e4bd'},
  neptune:{base:'#3156bb',dark:'#101d57',light:'#9abcf3',storm:'#101432'},
  pluto:{base:'#a88070',dark:'#503841',light:'#eadfc8'}
};
const PLANET_NAME_BY_ID={about:'Mercure',skills:'Vénus',formations:'Terre',exps:'Mars',passions:'Jupiter',contact:'Saturne',erma:'Uranus',veille:'Neptune',greenit:'Pluton'};
function mkTex(hex, id, body=PLANET_BODY_BY_ID[id]){
  const s=id==='erma'?1024:512, c=document.createElement('canvas'); c.width=s; c.height=id==='erma'?512:s/2;
  const ctx=c.getContext('2d');

  if(id==='erma'){
    const h=c.height;
    ctx.fillStyle='#f8f9fb';ctx.fillRect(0,0,s,h);
    const tex=new THREE.CanvasTexture(c);
    tex.colorSpace=THREE.SRGBColorSpace;
    const logo=new Image();
    logo.onload=()=>{
      const w=s*.38, logoH=w*logo.naturalHeight/logo.naturalWidth, y=(h-logoH)/2;
      [s*.25,s*.75].forEach(x=>ctx.drawImage(logo,x-w/2,y,w,logoH));
      tex.needsUpdate=true;
    };
    logo.src=new URL('../../logo-ermaconcept.png',import.meta.url).href;
    return tex;
  }

  // Stable per-planet seed keeps the surface recognizable between reloads.
  let seed=2166136261;
  for(let i=0;i<id.length;i++)seed=Math.imul(seed^id.charCodeAt(i),16777619);
  const surfaceSeed=seed>>>0;
  const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  const hash=(x,y)=>{const n=Math.sin((x+surfaceSeed*.000013)*127.1+(y+surfaceSeed*.000019)*311.7)*43758.5453;return n-Math.floor(n);};
  const smooth=(a,b,v)=>{const t=THREE.MathUtils.clamp((v-a)/(b-a),0,1);return t*t*(3-2*t);};
  const valueNoise=(u,v,nx,ny)=>{
    const x=u*nx,y=v*ny,ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy;
    const sx=fx*fx*(3-2*fx),sy=fy*fy*(3-2*fy),wrap=(n,m)=>((n%m)+m)%m;
    const a=THREE.MathUtils.lerp(hash(wrap(ix,nx),iy),hash(wrap(ix+1,nx),iy),sx);
    const b=THREE.MathUtils.lerp(hash(wrap(ix,nx),iy+1),hash(wrap(ix+1,nx),iy+1),sx);
    return THREE.MathUtils.lerp(a,b,sy);
  };
  const fbm=(u,v)=>valueNoise(u,v,5,3)*.48+valueNoise(u,v,11,6)*.27+valueNoise(u,v,23,12)*.16+valueNoise(u,v,47,24)*.09;
  const image=ctx.createImageData(c.width,c.height), data=image.data, w=c.width, h=c.height;
  const mix=(a,b,t)=>a+(b-a)*t;
  const hexCol=(value)=>{const q=value.replace('#','');return [parseInt(q.slice(0,2),16),parseInt(q.slice(2,4),16),parseInt(q.slice(4,6),16)];};
  const palette=PLANET_PALETTES[body]||PLANET_PALETTES.mercury;
  const base=hexCol(palette.base),dark=hexCol(palette.dark),light=hexCol(palette.light);
  const ocean=hexCol(palette.ocean||palette.dark),land=hexCol(palette.land||palette.light);
  const jupiterSpot=hexCol(palette.spot||'#d36045'),neptuneStorm=hexCol(palette.storm||'#12162c');
  const gas=['venus','jupiter','saturn','neptune'].includes(body);
  const continents=body==='earth';

  for(let y=0;y<h;y++){
    const v=y/h, lat=Math.sin(v*Math.PI*2), polar=Math.pow(Math.abs(lat),5);
    for(let x=0;x<w;x++){
      const u=x/w, broad=fbm(u,v), detail=valueNoise(u,v,93,47), fine=valueNoise(u,v,191,96);
      const warped=fbm(u+Math.sin(v*8+u*3)*.018,v+Math.sin(u*10)*.012);
      let color;
      if(continents){
        const height=warped+detail*.10+polar*.045;
        const shore=smooth(.475,.515,height), high=smooth(.61,.77,height);
        const sea=[mix(ocean[0],base[0],detail*.28),mix(ocean[1],base[1],detail*.28),mix(ocean[2],base[2],detail*.28)];
        const landColor=land.map((ch,i)=>mix(ch,light[i],high*.23+detail*.10));
        color=sea.map((ch,i)=>mix(ch,landColor[i],shore));
        if(height>.50&&height<.54)color=color.map((ch,i)=>mix(ch,light[i],.16));
      }else if(gas){
        const frequency=body==='venus'?30:body==='jupiter'?76:body==='saturn'?43:51;
        const wave=Math.sin(v*frequency+Math.sin(u*frequency*.22+warped*5)*1.7+broad*5.5);
        const bands=.5+.5*wave;
        const bandContrast=body==='saturn'?.46:.62;
        const bandMix=THREE.MathUtils.clamp(bands*bandContrast+warped*(1-bandContrast)+detail*.10,0,1);
        color=dark.map((ch,i)=>mix(ch,base[i],bandMix));
        color=color.map((ch,i)=>mix(ch,light[i],smooth(.61,.88,bands)*.20+detail*.045));
        const stormX=(u-.72)*1.35,stormY=(v-.48)*2.15;
        const stormRadius=Math.sqrt(stormX*stormX+stormY*stormY);
        const stormAngle=Math.atan2(stormY,stormX)+stormRadius*8+warped*2;
        const storm=Math.exp(-stormRadius*(body==='jupiter'?17:21))*(.72+.28*Math.sin(stormAngle*4));
        if(body==='jupiter')color=color.map((ch,i)=>mix(ch,jupiterSpot[i],storm*.72));
        if(body==='neptune')color=color.map((ch,i)=>mix(ch,neptuneStorm[i],storm*.84));
        if(body==='venus')color=color.map((ch,i)=>mix(ch,light[i],smooth(.50,.78,detail)*.12));
      }else if(body==='pluto'){
        const terrain=THREE.MathUtils.clamp(warped*.58+detail*.27+fine*.15,0,1);
        color=dark.map((ch,i)=>mix(ch,base[i],terrain));
        const heartX=(u-.55)*3.25,heartY=(v-.53)*4.25;
        const heartShape=Math.pow(heartX*heartX+heartY*heartY-1,3)-heartX*heartX*heartY*heartY*heartY;
        const heart=1-smooth(-.12,.13,heartShape);
        color=color.map((ch,i)=>mix(ch,light[i],heart*.82));
        color=color.map((ch,i)=>mix(ch,dark[i],smooth(.65,.82,detail)*.18*(1-heart)));
      }else{
        const terrain=THREE.MathUtils.clamp(warped*.63+detail*.25+fine*.12,0,1);
        color=dark.map((ch,i)=>mix(ch,base[i],terrain));
        color=color.map((ch,i)=>mix(ch,light[i],smooth(.67,.9,detail*.7+fine*.3)*.32));
        if(body==='mars')color=color.map((ch,i)=>mix(ch,light[i],smooth(.84,.98,polar)*.55));
      }

      const shade=.77+broad*.42+detail*.11-polar*.12;
      const offset=(y*w+x)*4;
      data[offset]=Math.round(color[0]*shade);
      data[offset+1]=Math.round(color[1]*shade);
      data[offset+2]=Math.round(color[2]*shade);
      data[offset+3]=255;
    }
  }
  ctx.putImageData(image,0,0);

  if(body==='mercury'||body==='mars'||body==='pluto'){
    // Dense old craters on Mercury, a lighter scattering on Mars and Pluto.
    const count=body==='mercury'?310:body==='mars'?155:95;
    for(let i=0;i<count;i++){
      const cx=rand()*w,cy=rand()*h,cr=rand()*(body==='mercury'?9:7)+1.5;
      if(body==='pluto'){
        const hx=(cx/w-.55)*3.25,hy=(cy/h-.53)*4.25;
        if(Math.pow(hx*hx+hy*hy-1,3)-hx*hx*hy*hy*hy<0)continue;
      }
      const grd=ctx.createRadialGradient(cx,cy,cr*.42,cx,cy,cr);
      grd.addColorStop(0,'rgba(9,7,7,.48)');grd.addColorStop(.68,'rgba(15,10,9,.17)');
      grd.addColorStop(.82,body==='mars'?'rgba(255,190,150,.24)':'rgba(225,216,204,.22)');
      grd.addColorStop(1,'rgba(0,0,0,0)');
      ctx.beginPath();ctx.arc(cx,cy,cr,0,Math.PI*2);ctx.fillStyle=grd;ctx.fill();
    }
  }
  const texture=new THREE.CanvasTexture(c);
  texture.colorSpace=THREE.SRGBColorSpace;
  texture.anisotropy=ren.capabilities.getMaxAnisotropy();
  return texture;
}

const planetGlowMap=(()=>{
  const c=document.createElement('canvas'); c.width=c.height=128;
  const ctx=c.getContext('2d'), g=ctx.createRadialGradient(64,64,2,64,64,64);
  g.addColorStop(0,'rgba(255,255,255,.24)');
  g.addColorStop(.32,'rgba(255,255,255,.10)');
  g.addColorStop(1,'rgba(255,255,255,0)');
  ctx.fillStyle=g; ctx.fillRect(0,0,128,128);
  return new THREE.CanvasTexture(c);
})();
// ── BUILD PLANETS ──
const pObjs=[],saturnMoonSystems=[];
PL.forEach(d=>{
  const grp=new THREE.Group(); sc.add(grp);
  // orbit ring — subtle gradient fade
  const om=new THREE.Mesh(
    new THREE.RingGeometry(d.r-.045,d.r+.045,128),
    new THREE.MeshBasicMaterial({color:0x00d4ff,transparent:true,opacity:.08,side:THREE.DoubleSide,depthWrite:false})
  ); om.rotation.x=-Math.PI/2; sc.add(om);

  // planet
  const isErma=d.id==='erma';
  const bodyType=PLANET_BODY_BY_ID[d.id];
  const isSaturn=bodyType==='saturn';
  const visualColor=isErma?'#f8f9fb':PLANET_PALETTES[bodyType]?.base||d.hex;
  const baseEmissiveIntensity=isErma?.72:.10;
  const texture=mkTex(d.hex,d.id,bodyType);
  const mat=new THREE.MeshStandardMaterial({
    map:texture, color:0xffffff,
    emissive:new THREE.Color(visualColor), emissiveMap:isErma?texture:null,
    emissiveIntensity:baseEmissiveIntensity,
    roughness:isErma?.78:.65, metalness:isErma?.025:.1
  });
  const mesh=new THREE.Mesh(new THREE.SphereGeometry(d.size,52,52),mat);
  if(isErma)mesh.rotation.y=Math.PI/2-(d.ca+Math.PI*.16);

  // Saturn's rings follow the real planet assignment.
  if(isSaturn){
    [[d.size*1.52,d.size*2.02,0xc8a86a,.6,Math.PI/2.7],
     [d.size*2.08,d.size*2.62,0x9a7a45,.25,Math.PI/2.7]].forEach(([ri,ro,col,op,rx])=>{
      const rm=new THREE.Mesh(new THREE.RingGeometry(ri,ro,64),
        new THREE.MeshBasicMaterial({color:col,transparent:true,opacity:op,side:THREE.DoubleSide,depthWrite:false}));
      rm.rotation.x=rx; mesh.add(rm);
    });
  }

  // Four small Saturnian moons: Titan, Rhea, Dione, and Enceladus.
  let moonGroup=null;
  if(isSaturn){
    moonGroup=new THREE.Group();
    const moons=[],tilt=Math.PI/2.7;
    const specs=[
      {name:'Titan',orbit:d.size*3.85,radius:d.size*.14,color:0xc69b67,speed:.34,phase:.4},
      {name:'Rhea',orbit:d.size*3.30,radius:d.size*.088,color:0xbfc4c7,speed:.49,phase:2.1},
      {name:'Dione',orbit:d.size*2.98,radius:d.size*.073,color:0xd0cbc0,speed:.62,phase:3.7},
      {name:'Enceladus',orbit:d.size*2.76,radius:d.size*.058,color:0xe3e8e9,speed:.77,phase:5.0}
    ];
    specs.forEach(spec=>{
      const points=new Float32Array(96*3);
      for(let i=0;i<96;i++){
        const a=i/96*Math.PI*2;
        points[i*3]=Math.cos(a)*spec.orbit;
        points[i*3+1]=Math.sin(a)*spec.orbit*Math.cos(tilt);
        points[i*3+2]=Math.sin(a)*spec.orbit*Math.sin(tilt);
      }
      const orbitGeometry=new THREE.BufferGeometry();
      orbitGeometry.setAttribute('position',new THREE.BufferAttribute(points,3));
      const orbitMaterial=new THREE.LineBasicMaterial({color:0xa9c5df,transparent:true,opacity:.045,depthWrite:false});
      const orbitLine=new THREE.LineLoop(orbitGeometry,orbitMaterial);
      moonGroup.add(orbitLine);

      const moon=new THREE.Mesh(new THREE.SphereGeometry(spec.radius,20,16),new THREE.MeshStandardMaterial({
        color:spec.color,roughness:.88,metalness:.02,emissive:spec.color,emissiveIntensity:.07
      }));
      moon.userData.moonName=spec.name;
      const halo=new THREE.Sprite(new THREE.SpriteMaterial({map:planetGlowMap,color:spec.color,transparent:true,opacity:.10,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false}));
      const haloBase=spec.radius*4.8;
      halo.scale.set(haloBase,haloBase,1);
      const hitTarget=new THREE.Mesh(new THREE.SphereGeometry(spec.radius*2.1,12,10),new THREE.MeshBasicMaterial({transparent:true,opacity:0,colorWrite:false,depthWrite:false,depthTest:false}));
      hitTarget.userData.moonName=spec.name;
      moonGroup.add(moon,halo,hitTarget);
      moons.push({...spec,mesh:moon,halo,hitTarget,haloBase,orbitMaterial});
    });
    saturnMoonSystems.push({group:moonGroup,moons,selection:0,planet:grp,tilt});
  }

  // atmosphere glow
  const atmMat=new THREE.ShaderMaterial({
    uniforms:{uC:{value:new THREE.Color(visualColor)},uI:{value:.30},uTime:{value:0}},
    vertexShader:`varying vec3 vN,vV,vP;void main(){vN=normalize(normalMatrix*normal);vec4 mv=modelViewMatrix*vec4(position,1.0);vV=normalize(-mv.xyz);vP=position;gl_Position=projectionMatrix*mv;}`,
    fragmentShader:`uniform vec3 uC;uniform float uI,uTime;varying vec3 vN,vV,vP;void main(){float fresnel=pow(1.0-max(dot(normalize(vN),normalize(vV)),0.0),2.7);vec3 p=normalize(vP);float flow=.5+.5*sin(p.y*5.0+sin(p.x*4.0+uTime*.32)*.9-uTime*.42);float pulse=.94+.06*sin(uTime*.8+p.z*3.0);float rim=smoothstep(.04,.94,fresnel);vec3 color=uC*(.82+.34*flow);float alpha=clamp(rim*(.30+.22*flow)*uI*pulse,0.0,.85);gl_FragColor=vec4(color*uI*(.62+.52*flow)*fresnel,alpha);}`,
    transparent:true,depthWrite:false,side:THREE.FrontSide,blending:THREE.AdditiveBlending
  });
  const atm=new THREE.Mesh(new THREE.SphereGeometry(d.size*1.24,32,32),atmMat);
  const glowBase=d.glow??.30, glowSize=d.size*(isSaturn?5.4:4.8);
  const halo=new THREE.Sprite(new THREE.SpriteMaterial({map:planetGlowMap,color:visualColor,transparent:true,opacity:glowBase,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false}));
  halo.scale.set(glowSize,glowSize,1);
  if(moonGroup)grp.add(moonGroup);
  grp.add(mesh,atm,halo);
  grp.position.x=Math.cos(d.a)*d.r; grp.position.z=Math.sin(d.a)*d.r;
  grp.userData={...d, bodyType, bodyName:PLANET_NAME_BY_ID[d.id], visualColor, baseEmissiveIntensity, ca:d.a, mesh, mat, atmMat, halo, glowBase, glowTarget:glowBase, glowSize};
  pObjs.push(grp);
});
const saturnMoonMeshes=saturnMoonSystems.flatMap(system=>system.moons.map(moon=>moon.hitTarget));
const saturnTitanMeshes=saturnMoonSystems.flatMap(system=>system.moons.filter(moon=>moon.name==='Titan').map(moon=>moon.hitTarget));
const planetMeshes=pObjs.map(g=>g.userData.mesh);
function pickVisiblePlanet(){
  const hit=ray.intersectObjects([...planetMeshes,sun],false)[0];
  if(!hit||hit.object===sun)return null;
  return pObjs.find(g=>g.userData.mesh===hit.object)||null;
}
function pickMoonFromMeshes(targetMeshes){
  const directHit=ray.intersectObjects(targetMeshes,false)[0];
  if(directHit)return directHit.object;
  const rect=cv.getBoundingClientRect();
  const px=rect.left+(mouse.x+1)*rect.width/2,py=rect.top+(1-mouse.y)*rect.height/2;
  let nearest=null,nearestDistance=Infinity;
  targetMeshes.forEach(object=>{
    const worldPosition=object.getWorldPosition(new THREE.Vector3());
    const projected=worldPosition.clone().project(cam);
    if(projected.z < -1 || projected.z > 1)return;
    const x=rect.left+(projected.x+1)*rect.width/2,y=rect.top+(1-projected.y)*rect.height/2;
    const distance=Math.hypot(px-x,py-y);
    const distanceToCamera=cam.position.distanceTo(worldPosition);
    const pixelRadius=object.geometry.parameters.radius*innerHeight/(2*Math.tan(cam.fov*Math.PI/360)*distanceToCamera);
    const threshold=Math.max(6,Math.min(18,pixelRadius*1.2));
    if(distance<threshold&&distance<nearestDistance){nearest=object;nearestDistance=distance;}
  });
  return nearest;
}
function pickSaturnMoon(){
  return selG?.userData.bodyType==='saturn'?pickMoonFromMeshes(saturnTitanMeshes):null;
}
function pickAnySaturnMoon(){
  return selG?.userData.bodyType==='saturn'?pickMoonFromMeshes(saturnMoonMeshes):null;
}

// ── NAV ──
const navEl=document.getElementById('nav-planets');
PL.forEach((p,i)=>{
  const btn=document.createElement('button');
  btn.type='button'; btn.className='nav-dot'; btn.id='nd-'+p.id;
  btn.setAttribute('aria-controls','info-panel');
  btn.setAttribute('aria-pressed','false');
  btn.style.setProperty('--nc',p.hex);
  btn.innerHTML=`<span class="dot" style="background:${p.hex};box-shadow:0 0 6px ${p.hex}"></span>${p.name}`;
  btn.addEventListener('click',()=>{
    selP(pObjs[i]);
  });
  navEl.appendChild(btn);
});

// ── STATE ──
let selG=null, hovG=null, hovMoon=null;
const mouse=new THREE.Vector2(-99,-99), ray=new THREE.Raycaster();
const cameraPointer={x:0,y:0};
const cursorGlow=document.getElementById('cursor-glow');
const tip=document.getElementById('tooltip');
const cpx={x:0,y:36,z:72}, clk2={x:0,y:0,z:0}, ctg={x:0,y:0,z:0};
let cameraReturn=1,returningGlobal=false,postReturnEase=.022;
const lp=(a,b,t)=>a+(b-a)*(reduceMotion?1:t);

function selP(g){
  if(selG===g){closeP();return;} closeP(false); selG=g;
  cameraPoseLock=null;
  cameraPointer.x=0; cameraPointer.y=0; pointerCameraLock=false;
  cameraReturn=1; returningGlobal=false; postReturnEase=.022;
  const d=g.userData;
  document.querySelectorAll('.nav-dot').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});
  const selectedButton=document.getElementById('nd-'+d.id);
  selectedButton?.classList.add('active');
  selectedButton?.setAttribute('aria-pressed','true');
  pObjs.forEach(gg=>{
    if(gg!==g){
      gg.userData.mat.opacity=.52;
      gg.userData.mat.transparent=true;
      gg.userData.mat.emissiveIntensity=Math.max(gg.userData.baseEmissiveIntensity,.20);
      gg.userData.atmMat.uniforms.uI.value=.16;
      gg.userData.glowTarget=.22;
    }
  });
  d.mat.emissiveIntensity=d.baseEmissiveIntensity+(d.bodyType==='saturn'?.12:.68); d.atmMat.uniforms.uI.value=1.6;
  d.glowTarget=.68;
  // panel
  document.getElementById('pnm').textContent=d.name;
  document.getElementById('psb2').textContent=d.sub;
  document.getElementById('info-panel').style.setProperty('--pcolor',d.hex);
  const orb=document.getElementById('porb');
  const surface=d.mat.map?.image;
  if(surface?.toDataURL){
    orb.style.backgroundColor='#07111e';
    orb.style.backgroundImage=`radial-gradient(circle at 32% 28%,rgba(255,255,255,.52),transparent 42%),linear-gradient(145deg,rgba(0,0,0,0),rgba(0,0,0,.42)),url("${surface.toDataURL()}")`;
    orb.style.backgroundSize='100% 100%,100% 100%,cover';
    orb.style.backgroundPosition='center';
  }else{
    orb.style.background=`radial-gradient(circle at 32% 32%,#fff,${d.hex} 40%,${d.em?'#'+d.em.toString(16).padStart(6,'0'):'#000'})`;
  }
  orb.style.boxShadow=`0 0 16px ${d.hex},0 0 32px ${d.hex}44`;
  document.getElementById('pb').innerHTML=d.html(d);
  document.getElementById('pb').style.setProperty('--pcolor',d.hex);
  const infoPanel=document.getElementById('info-panel');
  infoPanel.setAttribute('aria-hidden','false');
  setTimeout(()=>{infoPanel.classList.add('open');document.getElementById('pcls').focus();},40);
  // camera
  const dist=d.size*(d.bodyType==='saturn'?18.5:8.2), ang=d.ca+Math.PI*.16;
  ctg.x=g.position.x; ctg.z=g.position.z;
  cpx.x=g.position.x+Math.cos(ang)*dist*.62;
  cpx.z=g.position.z+Math.sin(ang)*dist*.88;
  cpx.y=d.size*4.0;
}

function closeP(rc=true){
  const previousId=selG?.userData.id;
  const infoPanel=document.getElementById('info-panel');
  infoPanel.setAttribute('aria-hidden','true');
  infoPanel.classList.remove('open'); selG=null;
  cameraPoseLock=null;
  document.querySelectorAll('.nav-dot').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});
  pObjs.forEach(g=>{g.userData.mat.opacity=1;g.userData.mat.transparent=false;g.userData.mat.emissiveIntensity=g.userData.baseEmissiveIntensity;g.userData.atmMat.uniforms.uI.value=.30;g.userData.glowTarget=g.userData.glowBase;});
  if(rc&&previousId)document.getElementById('nd-'+previousId)?.focus();
  if(rc){cameraReturn=0;returningGlobal=true;cpx.x=0;cpx.y=36;cpx.z=72;ctg.x=0;ctg.y=0;ctg.z=0;}
}

const moonEggStyle=document.createElement('style');
moonEggStyle.textContent=`
  #moon-easter-egg{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;padding:20px;background:rgba(1,7,18,.88);backdrop-filter:blur(12px);opacity:0;visibility:hidden;transition:opacity .24s ease,visibility .24s ease}
  #moon-easter-egg.open{opacity:1;visibility:visible}
  #moon-easter-egg .moon-egg-card{width:min(820px,94vw);overflow:hidden;border:1px solid rgba(0,220,255,.55);background:#03101f;box-shadow:0 0 70px rgba(0,190,255,.17),0 22px 90px #000b;color:#d9f6ff;font-family:inherit}
  #moon-easter-egg .moon-egg-head{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:15px 19px;border-bottom:1px solid rgba(0,220,255,.2);color:#00dfff;font:10px/1.5 monospace;letter-spacing:.28em;text-transform:uppercase}
  #moon-easter-egg .moon-egg-close{width:36px;height:36px;border:1px solid rgba(0,220,255,.45);background:transparent;color:#00dfff;font:22px/1 monospace;cursor:pointer}
  #moon-easter-egg .moon-egg-close:hover{background:rgba(0,220,255,.12)}
  #moon-easter-egg .moon-egg-video{aspect-ratio:16/9;background:#000}
  #moon-easter-egg iframe{display:block;width:100%;height:100%;border:0}
  #moon-easter-egg .moon-egg-foot{margin:0;padding:12px 18px;color:rgba(190,230,245,.64);font:10px/1.6 monospace;letter-spacing:.12em}
  @media(max-width:600px){#moon-easter-egg{padding:12px}#moon-easter-egg .moon-egg-head{padding:12px;font-size:9px;letter-spacing:.16em}#moon-easter-egg .moon-egg-foot{font-size:9px}}
`;
document.head.appendChild(moonEggStyle);
const moonEgg=document.createElement('div');
moonEgg.id='moon-easter-egg'; moonEgg.setAttribute('aria-hidden','true');
moonEgg.innerHTML=`<section class="moon-egg-card" role="dialog" aria-modal="true" aria-labelledby="moon-egg-title"><header class="moon-egg-head"><span id="moon-egg-title">Signal secret · origine inconnue</span><button class="moon-egg-close" type="button" aria-label="Fermer la vidéo">×</button></header><div class="moon-egg-video"><iframe title="Rick Astley — Never Gonna Give You Up" allow="autoplay; encrypted-media; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div><p class="moon-egg-foot">SIGNAL DÉCODÉ · RICK ASTLEY · NEVER GONNA GIVE YOU UP</p></section>`;
document.body.appendChild(moonEgg);
const moonEggFrame=moonEgg.querySelector('iframe');
let moonEggReturnFocus=null;
function openMoonEgg(){
  moonEggReturnFocus=document.activeElement;
  moonEggFrame.src='https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&playsinline=1&rel=0';
  moonEgg.classList.add('open'); moonEgg.setAttribute('aria-hidden','false');
  moonEgg.querySelector('.moon-egg-close').focus(); tip.classList.remove('show');
}
function closeMoonEgg(){
  if(!moonEgg.classList.contains('open'))return;
  moonEgg.classList.remove('open'); moonEgg.setAttribute('aria-hidden','true');
  moonEggFrame.src='about:blank';
  moonEggReturnFocus?.focus?.();
}
moonEgg.querySelector('.moon-egg-close').addEventListener('click',closeMoonEgg);
moonEgg.addEventListener('click',e=>{if(e.target===moonEgg)closeMoonEgg();});
document.getElementById('pcls').addEventListener('click',closeP);
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(moonEgg.classList.contains('open'))closeMoonEgg();else closeP();}});

let lastTouchAt=0,pendingMoonClick=null,pointerCameraLock=false,cameraPoseLock=null;
function updatePointerPosition(e){
  const rect=cv.getBoundingClientRect();
  mouse.x=((e.clientX-rect.left)/rect.width)*2-1;
  mouse.y=-((e.clientY-rect.top)/rect.height)*2+1;
  tip.style.left=(e.clientX+18)+'px';
  tip.style.top=(e.clientY-16)+'px';
}
window.addEventListener('pointermove',e=>{
  if(e.pointerType!=='mouse'||reduceMotion)return;
  let nextPointerLock=false;
  let overPlanet=null;
  let hoveredMoon=null;
  if(e.target===cv){
    ray.setFromCamera(mouse,cam);
    overPlanet=pickVisiblePlanet();
    hoveredMoon=selG?.userData.bodyType==='saturn'?pickAnySaturnMoon():null;
    nextPointerLock=!!(hoveredMoon||overPlanet);
  }
  const lockObject=hoveredMoon||overPlanet;
  if(lockObject){
    if(!cameraPoseLock||cameraPoseLock.object!==lockObject){
      cameraPoseLock={object:lockObject,objectPosition:lockObject.getWorldPosition(new THREE.Vector3()),position:cam.position.clone(),target:new THREE.Vector3(clk2.x,clk2.y,clk2.z)};
    }
  }else cameraPoseLock=null;
  // Capture the camera angle as the cursor enters a planet, then hold it there.
  if(e.target===cv&&(!pointerCameraLock||!nextPointerLock)){
    cameraPointer.x=(e.clientX/innerWidth)*2-1;
    cameraPointer.y=(e.clientY/innerHeight)*2-1;
  }
  pointerCameraLock=nextPointerLock;
  if(cursorGlow){
    cursorGlow.style.opacity='1';
    cursorGlow.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0) translate(-50%,-50%)`;
  }
},{passive:true});
window.addEventListener('blur',()=>{
  cameraPointer.x=0; cameraPointer.y=0;
  cameraPoseLock=null; pointerCameraLock=false;
  if(cursorGlow){cursorGlow.style.opacity='0';cursorGlow.style.transform='translate3d(-1000px,-1000px,0)';}
});
cv.addEventListener('pointermove',e=>{
  updatePointerPosition(e);
  if(e.pointerType!=='mouse')return;
  const tr=document.getElementById('tr');
  if(tr)tr.innerHTML='CUR: '+String(Math.round(e.clientX)).padStart(4,'0')+', '+String(Math.round(e.clientY)).padStart(4,'0')+'<br>SCAN: ACTIF<br>RENDERER: WEBGL2';
});
cv.addEventListener('pointerdown',e=>{
  updatePointerPosition(e);
  ray.setFromCamera(mouse,cam);
  if(e.pointerType==='mouse'){
    pointerCameraLock=true;
    const moonHit=pickSaturnMoon();
    pendingMoonClick=selG?.userData.bodyType==='saturn'&&moonHit?.userData.moonName==='Titan'?moonHit:null;
    return;
  }
  lastTouchAt=performance.now();
  const moonHit=pickSaturnMoon();
  const anyMoonHit=moonHit||pickAnySaturnMoon();
  if(selG?.userData.bodyType==='saturn'&&moonHit?.userData.moonName==='Titan'){openMoonEgg();return;}
  const visiblePlanet=pickVisiblePlanet();
  if(visiblePlanet)selP(visiblePlanet);
  else if(selG&&!anyMoonHit)closeP();
});
cv.addEventListener('click',e=>{
  if(performance.now()-lastTouchAt<700)return;
  updatePointerPosition(e);
  ray.setFromCamera(mouse,cam);
  const moonHit=pendingMoonClick||pickSaturnMoon();
  pendingMoonClick=null;
  const anyMoonHit=moonHit||pickAnySaturnMoon();
  if(selG?.userData.bodyType==='saturn'&&moonHit?.userData.moonName==='Titan'){openMoonEgg();pointerCameraLock=false;return;}
  const visiblePlanet=pickVisiblePlanet();
  if(visiblePlanet)selP(visiblePlanet);
  else if(selG&&!anyMoonHit)closeP();
  pointerCameraLock=false;
});
// ── ANIMATE ──
const clk3=new THREE.Clock();
function anim(){
  requestAnimationFrame(anim);
  const t=clk3.getElapsedTime();

  sunMat.uniforms.uTime.value=reduceMotion?0:t;
  sunCoronaMat.uniforms.uTime.value=reduceMotion?0:t;
  sunGlows.forEach((glow,i)=>{const pulse=reduceMotion?1:1+Math.sin(t*.72+i*.8)*.025;glow.scale.setScalar(pulse);glow.material.opacity=glow.userData.baseOpacity*(reduceMotion?1:1+Math.sin(t*.9+i)*.1);});
  nebMat.uniforms.uTime.value=reduceMotion?0:t;
  if(window._starMat)window._starMat.uniforms.uTime.value=reduceMotion?0:t;
  sun.rotation.y+=reduceMotion?0:.0016;
  sunCorona.rotation.y+=reduceMotion?0:-.0007;
  asteroidBelt.rotation.y+=reduceMotion?0:.0018;
  sl.intensity=reduceMotion?3.6:3.6+Math.sin(t*1.5)*.7;
  sl.color.setHSL(reduceMotion?.08:.08+Math.sin(t*.3)*.02,.95,.55);

  pObjs.forEach(g=>{
    const d=g.userData;
    d.atmMat.uniforms.uTime.value=reduceMotion?0:t;
    d.ca+=reduceMotion?0:d.sp*.016;
    g.position.x=Math.cos(d.ca)*d.r;
    g.position.z=Math.sin(d.ca)*d.r;
    if(d.id==='erma'&&selG===g)d.mesh.rotation.y=Math.PI/2-(d.ca+Math.PI*.16);
    else d.mesh.rotation.y+=reduceMotion?0:d.rot;
    const haloPulse=reduceMotion?1:1+Math.sin(t*1.35+d.ca)*.035;
    d.halo.scale.set(d.glowSize*haloPulse,d.glowSize*haloPulse,1);
    d.halo.material.opacity=lp(d.halo.material.opacity,d.glowTarget+(reduceMotion?0:Math.sin(t*.8+d.ca)*.035),.06);
  });

  // Saturn's four moons stay subtle in the system view and brighten on selection.
  saturnMoonSystems.forEach(system=>{
    const active=selG===system.planet;
    system.selection=lp(system.selection,active?1:0,.075);
    system.moons.forEach(moon=>{
      const angle=moon.phase+(reduceMotion?0:t*moon.speed),orbit=moon.orbit,tilt=system.tilt;
      moon.mesh.position.set(Math.cos(angle)*orbit,Math.sin(angle)*orbit*Math.cos(tilt),Math.sin(angle)*orbit*Math.sin(tilt));
      moon.hitTarget.position.copy(moon.mesh.position);
      moon.halo.position.copy(moon.mesh.position);
      const prominence=system.selection;
      const scale=.78+prominence*.62;
      moon.mesh.scale.setScalar(scale);
      moon.mesh.material.opacity=.48+prominence*.52;
      moon.mesh.material.emissiveIntensity=.07+prominence*.72;
      moon.halo.scale.setScalar(moon.haloBase*(.72+prominence*1.18));
      moon.halo.material.opacity=.045+prominence*.62;
      moon.orbitMaterial.opacity=.025+prominence*.31;
    });
  });

  // hover
  ray.setFromCamera(mouse,cam);
  const nh=pickVisiblePlanet();
  const nm=pickSaturnMoon();
  if(nh!==hovG){
    if(hovG&&hovG!==selG){
      hovG.userData.mat.opacity=selG?.52:1;
      hovG.userData.mat.transparent=!!selG;
      hovG.userData.mat.emissiveIntensity=selG?Math.max(hovG.userData.baseEmissiveIntensity,.20):hovG.userData.baseEmissiveIntensity;
      hovG.userData.atmMat.uniforms.uI.value=selG?.16:.30;
      hovG.userData.glowTarget=selG?.22:hovG.userData.glowBase;
    }
    hovG=nh;
    if(hovG){
      if(hovG!==selG){
        hovG.userData.mat.opacity=1;
        hovG.userData.mat.transparent=false;
        hovG.userData.mat.emissiveIntensity=hovG.userData.baseEmissiveIntensity+.34;
        hovG.userData.atmMat.uniforms.uI.value=.95;
        hovG.userData.glowTarget=.52;
      }
    }
  }
  hovMoon=nm;
  if(selG?.userData.bodyType==='saturn'&&hovMoon?.userData.moonName==='Titan'){cv.style.cursor='pointer';tip.textContent='LUNE · TITAN · SIGNAL';tip.classList.add('show');}
  else if(hovMoon){cv.style.cursor='crosshair';tip.textContent=`LUNE · ${hovMoon.userData.moonName}`;tip.classList.add('show');}
  else if(hovG){cv.style.cursor='pointer';tip.textContent=hovG.userData.name;tip.classList.add('show');}
  else{cv.style.cursor='crosshair';tip.classList.remove('show');}

  // follow selected
  if(selG){
    const g=selG, d=g.userData;
    ctg.x=lp(ctg.x,g.position.x,.022); ctg.z=lp(ctg.z,g.position.z,.022);
    const dist=d.size*(d.bodyType==='saturn'?18.5:8.2), ang=d.ca+Math.PI*.16;
    cpx.x=lp(cpx.x,g.position.x+Math.cos(ang)*dist*.62,.015);
    cpx.z=lp(cpx.z,g.position.z+Math.sin(ang)*dist*.88,.015);
    cpx.y=lp(cpx.y,d.size*4.0,.018);
  }

  if(returningGlobal){
    cameraReturn=reduceMotion?1:Math.min(1,cameraReturn+.0037);
    if(cameraReturn>=1){returningGlobal=false;postReturnEase=.015;}
  }
  const easedReturn=cameraReturn*cameraReturn*(3-2*cameraReturn);
  const cameraEase=returningGlobal ? .0025+easedReturn*.0125 : postReturnEase;
  const poseLocked=!!cameraPoseLock;
  if(!poseLocked){
    clk2.x=lp(clk2.x,ctg.x,cameraEase);
    clk2.y=lp(clk2.y,ctg.y,cameraEase);
    clk2.z=lp(clk2.z,ctg.z,cameraEase);
  }
  const bx=cpx.x-ctg.x, by=cpx.y-ctg.y, bz=cpx.z-ctg.z;
  const cameraDistance=Math.max(.001,Math.hypot(bx,by,bz));
  const pointerStrength=reduceMotion?0:Math.min(1,cameraDistance/12);
  const baseYaw=Math.atan2(bx,bz), basePitch=Math.asin(THREE.MathUtils.clamp(by/cameraDistance,-.95,.95));
  const yaw=baseYaw+cameraPointer.x*.48*pointerStrength;
  const pitch=THREE.MathUtils.clamp(basePitch+cameraPointer.y*.30*pointerStrength,-.2,1.1);
  const horizontalDistance=cameraDistance*Math.cos(pitch);
  const targetX=ctg.x+Math.sin(yaw)*horizontalDistance;
  const targetY=ctg.y+Math.sin(pitch)*cameraDistance;
  const targetZ=ctg.z+Math.cos(yaw)*horizontalDistance;
  if(poseLocked){
    const current=cameraPoseLock.object.getWorldPosition(new THREE.Vector3());
    const delta=current.clone().sub(cameraPoseLock.objectPosition);
    cameraPoseLock.position.add(delta);
    cameraPoseLock.target.add(delta);
    cameraPoseLock.objectPosition.copy(current);
    cam.position.copy(cameraPoseLock.position);
    clk2.x=cameraPoseLock.target.x;
    clk2.y=cameraPoseLock.target.y;
    clk2.z=cameraPoseLock.target.z;
  }else{
    cam.position.x=lp(cam.position.x,targetX,cameraEase);
    cam.position.y=lp(cam.position.y,targetY,cameraEase);
    cam.position.z=lp(cam.position.z,targetZ,cameraEase);
  }
  cam.lookAt(clk2.x,clk2.y,clk2.z);

  ren.render(sc,cam);
}

// ── RESIZE ──
window.addEventListener('resize',()=>{
  cam.aspect=innerWidth/innerHeight;
  cam.updateProjectionMatrix();
  ren.setPixelRatio(pixelRatio());
  ren.setSize(innerWidth,innerHeight);
});

// ── BOOT SEQUENCE ──
const sysLines=['MOTEUR 3D: WEBGL2 OK','NÉBULEUSE: CHARGÉE',`PLANÈTES: ${PL.length} DÉTECTÉES`,'ORBITES: CALCULÉES','HUD: ACTIF'];
const lsys=document.getElementById('lsystem');
sysLines.forEach((l,i)=>{
  setTimeout(()=>{
    const el=document.createElement('div');
    el.className='lsys-line'; el.textContent=l;
    el.style.animationDelay='0s';
    lsys.appendChild(el);
  }, 200+i*220);
});

let pct=0; const pEl=document.getElementById('lpct');
const iv=setInterval(()=>{
  pct+=Math.random()*14+4;
  if(pct>=100){pct=100;clearInterval(iv);}
  pEl.textContent=Math.round(pct)+'%';
},110);

setTimeout(()=>{
  document.getElementById('loader').classList.add('hidden');
  setTimeout(()=>{document.getElementById('loader').style.display='none';},800);
  anim();
},1900);
