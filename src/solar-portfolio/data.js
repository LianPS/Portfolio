export const PORTFOLIO_PLANETS = [
  {
    id:'about', name:'À PROPOS', sub:'Lian Piter Silvente · 20 ans · Le Touvet',
    color:0x38bdf8, hex:'#38bdf8', em:0x0a3a54,
    size:.82, r:7, sp:.27, a:0, rot:.009,
    html:d=>`
      <p class="pdesc">Passionné par l'informatique, je poursuis un <strong>BTS SIO option SLAM</strong> au Campus Nexa Digital School de Lyon. Mon intérêt se porte sur le développement, la donnée et les technologies d'intelligence artificielle.<br><br>
      Mon objectif est de poursuivre vers un <strong>Bachelor Data &amp; Business Intelligence</strong>. J'aime comprendre comment les systèmes fonctionnent et apprendre en construisant des solutions concrètes.</p>
      <div><div class="slb">COORDONNÉES</div>
      <div class="tags2">
        <span class="tag2" style="--tc:${d.hex}">📍 Le Touvet, 38660</span>
        <span class="tag2" style="--tc:${d.hex}">📱 06 99 94 03 41</span>
        <span class="tag2" style="--tc:${d.hex}">✉ lianpitersilvente@gmail.com</span>
        <span class="tag2" style="--tc:${d.hex}">🚗 Mobilité Auvergne RA</span>
      </div></div>
      <div class="mets2">
        <div class="met2"><span class="mv2" style="color:${d.hex}">20</span><span class="ml2">ANS</span></div>
        <div class="met2"><span class="mv2" style="color:${d.hex}">SLAM</span><span class="ml2">BTS SIO</span></div>
        <div class="met2"><span class="mv2" style="color:${d.hex}">DATA</span><span class="ml2">OBJECTIF</span></div>
      </div>
      <div class="cta2">
        <a href="mailto:lianpitersilvente@gmail.com" class="btn2 btnp2" style="--pcolor:${d.hex}">✉ ENVOYER EMAIL</a>
        <a href="tel:0699940341" class="btn2 btns2">📱 APPELER</a>
      </div>`
  },
  {
    id:'skills', name:'COMPÉTENCES', sub:'Réseaux, Systèmes & Hardware',
    color:0xfbbf24, hex:'#fbbf24', em:0x6b3000,
    size:1.0, r:10.5, sp:.21, a:Math.PI*.45, rot:.007,
    html:d=>`
      <div><div class="slb">RÉSEAUX & SYSTÈMES</div>
      <div class="tags2">
        ${[
          ['IP / Masque de sous-réseau'],
          ['Binaire & adressage'],
          ['DNS & Active Directory'],
          ['Windows / Windows Server']
        ].map(([l])=>`<span class="tag2">${l}</span>`).join('')}
      </div></div>
      <div><div class="slb">MATÉRIEL & FABRICATION</div>
      <div class="tags2">
        ${[
          ['Diagnostic et réparation de PC'],
          ['Impression 3D & modélisation'],
          ['Électronique DIY'],
          ['Maintenance des équipements réseau']
        ].map(([l])=>`<span class="tag2">${l}</span>`).join('')}
      </div></div>
      <div><div class="slb">EN COURS D'APPRENTISSAGE (BTS SLAM)</div>
      <div class="tags2">
        <span class="tag2" style="--tc:#f97316">Programmation</span>
        <span class="tag2" style="--tc:#f97316">Data & Business Intelligence</span>
        <span class="tag2" style="--tc:#f97316">Intelligence Artificielle</span>
        <span class="tag2" style="--tc:#f97316">Solutions Logicielles</span>
      </div></div>
      <div class="mets2">
        <div class="met2"><span class="mv2" style="color:${d.hex}">4+</span><span class="ml2">ANS PRATIQUE</span></div>
        <div class="met2"><span class="mv2" style="color:${d.hex}">3</span><span class="ml2">STAGES</span></div>
        <div class="met2"><span class="mv2" style="color:${d.hex}">∞</span><span class="ml2">CURIOSITÉ</span></div>
      </div>`
  },
  {
    id:'formations', name:'FORMATIONS', sub:'Parcours Académique · 2022 → 2027',
    color:0xa78bfa, hex:'#a78bfa', em:0x3b1578,
    size:.92, r:14.5, sp:.15, a:Math.PI*.9, rot:.008, hasRing:true,
    html:d=>`
      <div><div class="slb">PARCOURS DE FORMATION</div>
      <div class="tl2" style="--ac:${d.hex}">
        <div class="ti2">
          <div class="tdate">2025<br>→ 2027</div>
          <div class="tdot2" style="background:${d.hex};box-shadow:0 0 10px ${d.hex}"></div>
          <div>
            <div class="ttl2">BTS SIO — Option SLAM</div>
            <div class="tpl2">Campus Nexa Digital School · Lyon</div>
            <div class="tdc2">Services Informatiques aux Organisations — Solutions Logicielles et Applications Métiers. En cours. Vise ensuite un Bachelor Data &amp; BI.</div>
          </div>
        </div>
        <div class="ti2">
          <div class="tdate">2023<br>→ 2025</div>
          <div class="tdot2" style="background:#818cf8;box-shadow:0 0 10px #818cf8"></div>
          <div>
            <div class="ttl2">Bac Pro Systèmes Numériques — RISC</div>
            <div class="tpl2">MFR Maison de la maintenance · St Egrève</div>
            <div class="tdc2">2ème et 3ème année — option C Réseaux Informatiques et Systèmes Communicants. Diplômé.</div>
          </div>
        </div>
        <div class="ti2">
          <div class="tdate">2022<br>→ 2023</div>
          <div class="tdot2" style="background:#6366f1;box-shadow:0 0 10px #6366f1"></div>
          <div>
            <div class="ttl2">Bac Pro Transitions Numérique &amp; Énergétique</div>
            <div class="tpl2">Lycée Charles Gabriel Pravaz</div>
            <div class="tdc2">1ère année — Métiers des transitions numérique et énergétique.</div>
          </div>
        </div>
        <div class="ti2">
          <div class="tdate">Avant<br>2022</div>
          <div class="tdot2" style="background:#4f46e5;box-shadow:0 0 8px #4f46e5"></div>
          <div><div class="ttl2">Brevet des Collèges</div></div>
        </div>
      </div></div>
      <div class="mets2">
        <div class="met2"><span class="mv2" style="color:${d.hex}">BTS</span><span class="ml2">EN COURS</span></div>
        <div class="met2"><span class="mv2" style="color:${d.hex}">Bac Pro</span><span class="ml2">RISC OBTENU</span></div>
        <div class="met2"><span class="mv2" style="color:${d.hex}">2027</span><span class="ml2">DIPLÔME CIBLE</span></div>
      </div>`
  },
  {
    id:'exps', name:'EXPÉRIENCES', sub:'Alternance & Stages · 2021 → 2024',
    color:0xf87171, hex:'#f87171', em:0x6b0000,
    size:.92, r:18.5, sp:.11, a:Math.PI*1.5, rot:.006,
    html:d=>`
      <div><div class="slb">EXPÉRIENCES PROFESSIONNELLES</div>
      <div class="tl2" style="--ac:${d.hex}">
        <div class="ti2">
          <div class="tdate">2023<br>→ 2024</div>
          <div class="tdot2" style="background:${d.hex};box-shadow:0 0 10px ${d.hex}"></div>
          <div>
            <div class="ttl2">Technicien Informatique — Alternance</div>
            <div class="tpl2">Microtech Maintenance et Réseau</div>
            <div class="tdc2">Diagnostic et réparation de PC, maintenance d'équipements réseau. Première expérience professionnelle en alternance.</div>
          </div>
        </div>
        <div class="ti2">
          <div class="tdate">2023<br>2 mois</div>
          <div class="tdot2" style="background:#fb923c;box-shadow:0 0 9px #fb923c"></div>
          <div>
            <div class="ttl2">Stage — Maintenance Informatique</div>
            <div class="tpl2">Gresi Info</div>
            <div class="tdc2">Maintenance et dépannage informatique en entreprise.</div>
          </div>
        </div>
        <div class="ti2">
          <div class="tdate">2022<br>1 mois</div>
          <div class="tdot2" style="background:#fbbf24;box-shadow:0 0 9px #fbbf24"></div>
          <div>
            <div class="ttl2">Stage — Maintenance Informatique</div>
            <div class="tpl2">IPC Informatique</div>
            <div class="tdc2">Maintenance et dépannage informatique, découverte du milieu professionnel.</div>
          </div>
        </div>
        <div class="ti2">
          <div class="tdate">2021</div>
          <div class="tdot2" style="background:#a3e635;box-shadow:0 0 9px #a3e635"></div>
          <div>
            <div class="ttl2">Stage — Rédaction Radiophonique</div>
            <div class="tpl2">Radio Grésivaudan</div>
            <div class="tdc2">Écriture et mise en voix de contenus radiophoniques. Expérience de communication orale.</div>
          </div>
        </div>
      </div></div>
      <div class="mets2">
        <div class="met2"><span class="mv2" style="color:${d.hex}">1</span><span class="ml2">ALTERNANCE</span></div>
        <div class="met2"><span class="mv2" style="color:${d.hex}">3</span><span class="ml2">STAGES</span></div>
        <div class="met2"><span class="mv2" style="color:${d.hex}">3+</span><span class="ml2">ANS EXP.</span></div>
      </div>`
  },
  {
    id:'passions', name:'INTÉRÊTS', sub:'Mes intérêts',
    color:0x34d399, hex:'#34d399', em:0x01382a,
    size:.78, r:23, sp:.08, a:Math.PI*.2, rot:.010,
    html:d=>`
      <p class="pdesc">Au-delà du cursus, je suis quelqu'un qui aime <strong>comprendre comment les choses fonctionnent</strong> — qu'il s'agisse d'un algorithme d'IA, du mécanisme d'une console de jeu ou d'un circuit électronique. Créer, démonter, reconstruire.</p>
      <div class="card-grid">
        <div class="card2"><div class="card-ico2">🖨️</div><div class="card-t2" style="color:${d.hex}">IMPRESSION 3D</div><div class="card-d2">Paramétrage et création de modèles 3D, production d'objets physiques à partir de designs numériques.</div></div>
        <div class="card2"><div class="card-ico2">🎮</div><div class="card-t2" style="color:${d.hex}">JEUX VIDÉO & MATÉRIEL</div><div class="card-d2">Conception de consoles, composants PC, architecture matérielle et compréhension des systèmes.</div></div>
        <div class="card2"><div class="card-ico2">⚡</div><div class="card-t2" style="color:${d.hex}">ÉLECTRONIQUE</div><div class="card-d2">Bricolage d'objets électroniques, montage et modification de circuits. Comprendre l'hardware.</div></div>
        <div class="card2"><div class="card-ico2">🤖</div><div class="card-t2" style="color:${d.hex}">INTELLIGENCE ARTIFICIELLE</div><div class="card-d2">Raisonnement machine, apprentissage profond, fonctionnement des LLMs et IA génératives.</div></div>
      </div>
      <div class="mets2">
        <div class="met2"><span class="mv2" style="color:${d.hex}">3D</span><span class="ml2">IMPRESSION</span></div>
        <div class="met2"><span class="mv2" style="color:${d.hex}">IA</span><span class="ml2">PASSION CŒUR</span></div>
        <div class="met2"><span class="mv2" style="color:${d.hex}">DIY</span><span class="ml2">ÉLECTRONIQUE</span></div>
      </div>`
  },
  {
    id:'erma', name:'ERMA CONCEPT', sub:'Alternance · Grésy-sur-Aix, Savoie',
    color:0xffffff, hex:'#ff8c42', em:0x111111,
    size:1.08, r:32, sp:.045, a:Math.PI*1.8, rot:.006, glow:.46,
    html:d=>`
      <div style="border:1px solid ${d.hex}30;background:${d.hex}08;padding:13px 14px;position:relative;overflow:hidden">
        <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${d.hex},transparent);opacity:.6"></div>
        <div style="font-size:7px;letter-spacing:4px;color:${d.hex};opacity:.7;margin-bottom:4px">ENTREPRISE D'ACCUEIL — ALTERNANCE</div>
        <div style="font-family:var(--fd);font-size:16px;font-weight:800;color:#fff;letter-spacing:3px">ERMA CONCEPT</div>
        <div style="font-size:8px;color:rgba(200,220,240,.62);letter-spacing:1.5px;margin-top:3px">Ingénierie · Automatisme industriel · Savoie</div>
      </div>

      <div><div class="slb">PRÉSENTATION</div>
      <p class="pdesc">Entreprise <strong>100% française</strong> de 25 collaborateurs, fondée en 1999, localisée à <strong>Grésy-sur-Aix (73100, Savoie)</strong> avec une antenne à Mexico City. Spécialisée dans la <strong>conception et fabrication de lignes automatiques de peinture, laquage, vernissage et séchage</strong>.</p>
      <p class="pdesc" style="margin-top:6px">Ses secteurs d'application : <strong>parfumerie</strong> (flacons), <strong>cosmétique</strong> (pots de crème), <strong>vins &amp; spiritueux</strong>, arts de la table. Maîtrise toute la chaîne : études 3D, fabrication, assemblage, tests, livraison et mise en service sur site.</p></div>

      <div><div class="slb">LOCALISATION</div>
      <div class="card-grid">
        <div class="card2" style="border-color:${d.hex}40"><div class="card-ico2">📍</div><div class="card-t2" style="color:${d.hex}">SIÈGE</div><div class="card-d2">151 Imp. le Pré Mûrier<br>73100 Grésy-sur-Aix<br>Savoie, France</div></div>
        <div class="card2" style="border-color:${d.hex}40"><div class="card-ico2">🌍</div><div class="card-t2" style="color:${d.hex}">INTERNATIONAL</div><div class="card-d2">Antenne à Mexico City<br>95%+ export<br>CA : ~8M€</div></div>
      </div></div>

      <div><div class="slb">MES MISSIONS EN ALTERNANCE</div>
      <div class="tl2" style="--ac:${d.hex}">
        <div class="ti2"><div class="tdate">Mission 1</div><div class="tdot2" style="background:${d.hex};box-shadow:0 0 8px ${d.hex}"></div><div><div class="ttl2">Gestion du Parc Informatique</div><div class="tdc2">Inventaire, suivi et maintenance du matériel. Gestion du cycle de vie des équipements (PC, périphériques, imprimantes). Diagnostic de pannes hardware et software, interventions correctives.</div></div></div>
        <div class="ti2"><div class="tdate">Mission 2</div><div class="tdot2" style="background:#ffb347;box-shadow:0 0 8px #ffb347"></div><div><div class="ttl2">Mise en Place de Postes</div><div class="tdc2">Configuration et déploiement de postes de travail Windows. Installation des logiciels métier, paramétrage réseau, jonction au domaine Active Directory et préparation des environnements utilisateurs.</div></div></div>
        <div class="ti2"><div class="tdate">Mission 3</div><div class="tdot2" style="background:#ffd580;box-shadow:0 0 8px #ffd580"></div><div><div class="ttl2">Administration Microsoft 365</div><div class="tdc2">Gestion des comptes utilisateurs, groupes et licences. Administration Exchange Online (boîtes mail, listes de distribution), Teams et SharePoint. Gestion des permissions et sécurité.</div></div></div>
      </div></div>

      <div><div class="slb">STACK TECHNIQUE</div>
      <div class="tags2"><span class="tag2" style="--tc:${d.hex}">Windows Server</span><span class="tag2" style="--tc:${d.hex}">Active Directory</span><span class="tag2" style="--tc:${d.hex}">Microsoft 365</span><span class="tag2" style="--tc:${d.hex}">Exchange Online</span><span class="tag2" style="--tc:${d.hex}">Teams Admin</span><span class="tag2" style="--tc:${d.hex}">SharePoint</span><span class="tag2" style="--tc:${d.hex}">Intune / MDM</span><span class="tag2" style="--tc:${d.hex}">DNS / DHCP</span></div></div>

      <div class="mets2"><div class="met2"><span class="mv2" style="color:${d.hex}">25</span><span class="ml2">COLLABORATEURS</span></div><div class="met2"><span class="mv2" style="color:${d.hex}">~8M€</span><span class="ml2">CHIFFRE D'AFF.</span></div><div class="met2"><span class="mv2" style="color:${d.hex}">1999</span><span class="ml2">FONDÉE EN</span></div></div>
      <div class="cta2"><a href="https://ermaconcept.com" target="_blank" rel="noopener noreferrer" class="btn2 btnp2" style="--pcolor:${d.hex}">🌐 SITE WEB</a><a href="https://www.google.com/maps/search/Grésy-sur-Aix+73100" target="_blank" rel="noopener noreferrer" class="btn2 btns2">📍 LOCALISATION</a></div>`
  },
  {
    id:'veille', name:'VEILLE INFORMATIQUE', sub:'IA Locale · PQC · Green IT',
    color:0x00e5ff, hex:'#00e5ff', em:0x002f3a,
    size:1.15, r:36.5, sp:.035, a:Math.PI*.3, rot:.006, type:'scanner', glow:.38,
    html:d=>`
      <div style="border:1px solid ${d.hex}30;background:${d.hex}08;padding:11px 14px;margin-bottom:15px;position:relative;overflow:hidden">
        <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${d.hex},transparent);opacity:.6"></div>
        <div style="font-size:7px;letter-spacing:4px;color:${d.hex};opacity:.6;margin-bottom:3px;text-transform:uppercase">Épreuve E5 · BTS SIO SLAM · 2025–2026</div>
        <div style="font-family:var(--fd);font-size:15px;font-weight:800;color:#fff;letter-spacing:2px">VEILLE TECHNOLOGIQUE</div>
        <div style="font-size:8.5px;color:rgba(200,240,255,.55);letter-spacing:1.5px;margin-top:2px">Thèmes : IA Locale, Cryptographie PQC &amp; Éco-conception</div>
      </div>

      <div style="padding-top:5px">
        <div class="sec">THÈME 1 · EXÉCUTION IA EN LOCAL</div>
        <p class="desc" style="margin-bottom:12px">L’exécution locale d’une IA garantit la confidentialité des données et supprime la dépendance au Cloud. Le défi technique majeur réside dans la gestion de la mémoire et de la bande passante VRAM. Un réseau de neurones n’est mathématiquement qu’un gigantesque tableau de coefficients appelés <strong>poids</strong>. Les modèles classiques stockent ces milliards de poids en <strong>virgule flottante</strong> (nombres décimaux très précis, codés sur 16 ou 32 bits, type <code style="color:${d.hex}">float16</code>). Un modèle de 7 milliards de paramètres sature ainsi immédiatement la RAM et exige des processeurs graphiques (GPU) surpuissants pour calculer les multiplications matricielles. L’enjeu est donc d’utiliser des <strong>SLM (Small Language Models)</strong> et la <strong>quantification</strong>.</p>

        <div style="border:1px solid ${d.hex}25;background:${d.hex}05;padding:14px 16px;position:relative;overflow:hidden;margin-bottom:12px">
          <div style="position:absolute;top:0;left:0;bottom:0;width:3px;background:linear-gradient(180deg,${d.hex},${d.hex}22)"></div>
          <div style="font-size:6.5px;letter-spacing:4px;color:${d.hex};opacity:.7;margin-bottom:4px;text-transform:uppercase">Février 2024 · Microsoft Research</div>
          <div style="font-family:var(--fd);font-size:13px;font-weight:800;color:#fff;letter-spacing:1px;margin-bottom:6px">BitNet b1.58 · Logique ternaire</div>
          <div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap"><span class="tag" style="border-color:${d.hex}40;color:${d.hex};background:${d.hex}0a">ALGORITHMIE</span><span class="tag" style="border-color:${d.hex}40;color:${d.hex};background:${d.hex}0a">1-BIT LLM</span></div>
          <p style="font-size:10.5px;color:rgba(200,235,252,.78);line-height:1.9;margin-bottom:8px">L’architecture BitNet b1.58 illustre une optimisation radicale. Elle abandonne totalement la virgule flottante au profit d’une logique ternaire où chaque poids ne vaut que -1, 0 ou 1. Les lourdes multiplications de décimaux (MatMul) disparaissent au profit de simples additions d’entiers (<code>int</code>). L’empreinte mémoire chute de 90 %, rendant l’IA exécutable sur un processeur (CPU) standard.</p>
        </div>

        <div style="border:1px solid #a78bfa25;background:#a78bfa05;padding:14px 16px;position:relative;overflow:hidden;margin-bottom:12px">
          <div style="position:absolute;top:0;left:0;bottom:0;width:3px;background:linear-gradient(180deg,#a78bfa,#a78bfa22)"></div>
          <div style="font-size:6.5px;letter-spacing:4px;color:#a78bfa;opacity:.7;margin-bottom:4px;text-transform:uppercase">Décembre 2024 · Hugging Face</div>
          <div style="font-family:var(--fd);font-size:13px;font-weight:800;color:#fff;letter-spacing:1px;margin-bottom:6px">Microsoft Phi-4 · SLM local</div>
          <div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap"><span class="tag" style="border-color:#a78bfa40;color:#a78bfa;background:#a78bfa0a">EDGE COMPUTING</span><span class="tag" style="border-color:#a78bfa40;color:#a78bfa;background:#a78bfa0a">NPU</span></div>
          <p style="font-size:10.5px;color:rgba(200,185,252,.78);line-height:1.9;margin-bottom:8px">En parallèle de la recherche sur le ternaire, l’optimisation s’applique via la réduction d’échelle. Phi-4 est un modèle compact structuré pour déléguer sa charge de calcul directement aux puces NPU (Neural Processing Units) des postes clients, garantissant un fonctionnement 100 % hors ligne.</p>
        </div>

        <div class="sec">POC ET IMPACT DÉVELOPPEMENT (SLAM)</div>
        <p class="desc" style="border-left:2px solid ${d.hex}80;padding:6px 0 6px 10px;background:rgba(0,229,255,.03);margin-bottom:20px">En tant que développeur SLAM, comprendre la virgule flottante et la quantification permet de maîtriser l’impact matériel des applications. Plutôt que de développer des requêtes vers une API Cloud coûteuse, nous pouvons désormais <strong style="color:${d.hex}">embarquer le moteur d’IA localement</strong> (Edge Computing).<br><strong style="color:${d.hex}">POC validé :</strong> exécution locale hors-ligne d’un modèle SLM quantifié au format GGUF via le framework Ollama, avec vérification de l’absence totale de requêtes réseau lors de l’inférence.</p>
      </div>

      <div style="padding-top:15px;border-top:1px dashed #f472b640">
        <div class="sec" style="color:#f472b6">THÈME 2 · CRYPTOGRAPHIE POST-QUANTIQUE (PQC)</div>
        <p class="desc" style="margin-bottom:12px">D’ici 2030, la puissance de calcul des ordinateurs quantiques pourrait compromettre les algorithmes de chiffrement asymétrique standards (RSA, ECC). La <strong style="color:#f472b6">Cryptographie Post-Quantique (PQC)</strong> devient une priorité pour sécuriser les systèmes d’information.</p>
        <div style="border:1px solid #f472b625;background:#f472b605;padding:14px 16px;position:relative;overflow:hidden;margin-bottom:12px">
          <div style="position:absolute;top:0;left:0;bottom:0;width:3px;background:linear-gradient(180deg,#f472b6,#f472b622)"></div>
          <div style="font-size:6.5px;letter-spacing:4px;color:#f472b6;opacity:.7;margin-bottom:4px;text-transform:uppercase">NIST · ANSSI · Hybridation</div>
          <div style="font-family:var(--fd);font-size:13px;font-weight:800;color:#fff;letter-spacing:1px;margin-bottom:6px">Standardisation et agilité cryptographique</div>
          <div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap"><span class="tag" style="border-color:#f472b640;color:#f472b6;background:#f472b60a">CYBERSÉCURITÉ</span><span class="tag" style="border-color:#f472b640;color:#f472b6;background:#f472b60a">STANDARDS NIST</span></div>
          <p style="font-size:10.5px;color:rgba(252,200,225,.78);line-height:1.9;margin-bottom:8px">Validation des premiers standards de chiffrement par réseaux par le <strong>NIST (National Institute of Standards and Technology)</strong>. En France, l’<strong>ANSSI (Agence Nationale de la Sécurité des Systèmes d’Information)</strong> impose une doctrine d’hybridation : le code source doit combiner un algorithme classique avec un algorithme PQC.</p>
        </div>
        <div style="border:1px solid #fbbf2425;background:#fbbf2405;padding:14px 16px;position:relative;overflow:hidden;margin-bottom:12px">
          <div style="position:absolute;top:0;left:0;bottom:0;width:3px;background:linear-gradient(180deg,#fbbf24,#fbbf2422)"></div>
          <div style="font-size:6.5px;letter-spacing:4px;color:#fbbf24;opacity:.7;margin-bottom:4px;text-transform:uppercase">IETF · TLS 1.3</div>
          <div style="font-family:var(--fd);font-size:13px;font-weight:800;color:#fff;letter-spacing:1px;margin-bottom:6px">Intégration dans les couches de transport</div>
          <div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap"><span class="tag" style="border-color:#fbbf2440;color:#fbbf24;background:#fbbf240a">PROTOCOLES</span><span class="tag" style="border-color:#fbbf2440;color:#fbbf24;background:#fbbf240a">RÉSEAU / SLAM</span></div>
          <p style="font-size:10.5px;color:rgba(252,240,200,.78);line-height:1.9;margin-bottom:8px">L’<strong>IETF (Internet Engineering Task Force)</strong> intègre ces standards dans TLS 1.3. L’augmentation du volume des clés PQC exige l’adaptation du traitement de la fragmentation des paquets au niveau de l’infrastructure logicielle.</p>
        </div>
        <div class="sec">POC ET IMPACT DÉVELOPPEMENT (SLAM)</div>
        <p class="desc" style="border-left:2px solid #f472b680;padding:6px 0 6px 10px;background:rgba(244,114,182,.03);margin-bottom:20px">Le développement de logiciels impose l’<strong style="color:#f472b6">agilité cryptographique</strong>. Les primitives doivent être conçues comme des modules substituables via configuration.<br><strong style="color:#f472b6">POC validé :</strong> déploiement de l’utilitaire d’analyse Trivy dans un environnement conteneurisé pour détecter les dépendances logicielles cryptographiques obsolètes.</p>
      </div>

      <div style="padding-top:15px;border-top:1px dashed #4ade8040">
        <div class="sec" style="color:#4ade80">THÈME 3 · GREEN IT &amp; ÉCO-CONCEPTION LOGICIELLE</div>
        <p class="desc" style="margin-bottom:12px">Le développement d’IA et de systèmes complexes consomme beaucoup d’énergie. Le numérique représente environ <strong style="color:#4ade80">4 % des émissions mondiales de gaz à effet de serre</strong>. L’éco-conception devient une norme — et une obligation légale — pour réduire l’empreinte carbone du système d’information. Pour un développeur SLAM, l’enjeu est de rendre le code durable et sobre.</p>
        <div style="border:1px solid #4ade8025;background:#4ade8005;padding:14px 16px;position:relative;overflow:hidden;margin-bottom:12px">
          <div style="position:absolute;top:0;left:0;bottom:0;width:3px;background:linear-gradient(180deg,#4ade80,#4ade8022)"></div>
          <div style="font-size:6.5px;letter-spacing:4px;color:#4ade80;opacity:.7;margin-bottom:4px;text-transform:uppercase">2022 · Cadre réglementaire français · DINUM</div>
          <div style="font-family:var(--fd);font-size:13px;font-weight:800;color:#fff;letter-spacing:1px;margin-bottom:6px">RGESN · Référentiel général d’écoconception</div>
          <div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap"><span class="tag" style="border-color:#4ade8040;color:#4ade80;background:#4ade800a">NORME</span><span class="tag" style="border-color:#4ade8040;color:#4ade80;background:#4ade800a">ÉCO-CONCEPTION</span></div>
          <p style="font-size:10.5px;color:rgba(200,252,215,.78);line-height:1.9;margin-bottom:8px">Le <strong>RGESN</strong> s’applique aux services numériques publics et inspire le secteur privé. Ses critères portent notamment sur la réduction des requêtes réseau, la compression des ressources, la limitation du JavaScript côté client et le choix d’un hébergement sobre.</p>
        </div>
        <div style="border:1px solid #34d39925;background:#34d39905;padding:14px 16px;position:relative;overflow:hidden;margin-bottom:12px">
          <div style="position:absolute;top:0;left:0;bottom:0;width:3px;background:linear-gradient(180deg,#34d399,#34d39922)"></div>
          <div style="font-size:6.5px;letter-spacing:4px;color:#34d399;opacity:.7;margin-bottom:4px;text-transform:uppercase">Mesure &amp; profilage énergétique · Open Source</div>
          <div style="font-family:var(--fd);font-size:13px;font-weight:800;color:#fff;letter-spacing:1px;margin-bottom:6px">Scaphandre &amp; CodeCarbon</div>
          <div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap"><span class="tag" style="border-color:#34d39940;color:#34d399;background:#34d3990a">MÉTRIQUE</span><span class="tag" style="border-color:#34d39940;color:#34d399;background:#34d3990a">PROFILAGE</span></div>
          <p style="font-size:10.5px;color:rgba(195,250,225,.78);line-height:1.9;margin-bottom:8px"><strong style="color:#6ee7b7">Scaphandre</strong> profile la consommation énergétique des processus et des threads au niveau du système. <strong style="color:#6ee7b7">CodeCarbon</strong> estime les émissions d’un script Python pendant son exécution.</p>
        </div>
        <div class="sec">POC ET IMPACT DÉVELOPPEMENT (SLAM)</div>
        <p class="desc" style="border-left:2px solid #4ade8080;padding:6px 0 6px 10px;background:rgba(74,222,128,.03);margin-bottom:20px">L’éco-conception s’applique dès la conception : choix de frameworks légers, requêtes SQL optimisées, mise en cache et réduction des allers-retours réseau.<br><strong style="color:#4ade80">POC validé :</strong> profilage de la consommation d’un processus applicatif avec Scaphandre, identification des threads les plus énergivores et proposition de corrections ciblées, dont la réduction des boucles inutiles.</p>
      </div>

      <div style="padding-top:10px;border-top:1px solid rgba(0,207,255,.15)">
        <div class="sec">SOURCES ET LIENS DE RÉFÉRENCE</div>
        <div style="font-size:9.5px;color:rgba(200,235,252,.7);line-height:1.8;padding-left:5px">
          • <a href="https://cyber.gouv.fr/enjeux-technologiques/cryptographie-post-quantique/" target="_blank" rel="noopener noreferrer" style="color:${d.hex};text-decoration:none">ANSSI : transition vers la cryptographie post-quantique</a><br>
          • <a href="https://www.nist.gov/pqcrypto" target="_blank" rel="noopener noreferrer" style="color:${d.hex};text-decoration:none">NIST : Post-Quantum Cryptography</a><br>
          • <a href="https://github.com/microsoft/BitNet" target="_blank" rel="noopener noreferrer" style="color:${d.hex};text-decoration:none">Microsoft Research : BitNet</a><br>
          • <a href="https://huggingface.co/microsoft/phi-4" target="_blank" rel="noopener noreferrer" style="color:${d.hex};text-decoration:none">Hugging Face : Phi-4</a><br>
          • <a href="https://ecoresponsable.numerique.gouv.fr/publications/referentiel-general-ecoconception/" target="_blank" rel="noopener noreferrer" style="color:#4ade80;text-decoration:none">DINUM : RGESN</a><br>
          • <a href="https://github.com/hubblo-org/scaphandre" target="_blank" rel="noopener noreferrer" style="color:#4ade80;text-decoration:none">Scaphandre : profilage énergétique</a><br>
          • <a href="https://codecarbon.io/" target="_blank" rel="noopener noreferrer" style="color:#4ade80;text-decoration:none">CodeCarbon : estimation des émissions</a>
        </div>
      </div>
      <div class="mets2"><div class="met2"><span class="mv2" style="color:${d.hex}">3</span><span class="ml2">THÈMES VEILLÉS</span></div><div class="met2"><span class="mv2" style="color:${d.hex}">100%</span><span class="ml2">FOCUS SLAM</span></div><div class="met2"><span class="mv2" style="color:${d.hex}">3 POC</span><span class="ml2">VALIDÉS</span></div></div>`
  },
  {
    id:'greenit', name:'GREEN IT', sub:'Sobriété Numérique · Éco-conception',
    color:0x4ade80, hex:'#4ade80', em:0x1b5e20,
    size:.85, r:41, sp:.04, a:Math.PI*.8, rot:.009, type:'surface', glow:.42,
    html:d=>`
      <div style="border:1px solid ${d.hex}30;background:${d.hex}08;padding:11px 14px;margin-bottom:15px;position:relative;overflow:hidden">
        <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${d.hex},transparent);opacity:.6"></div>
        <div style="font-size:7px;letter-spacing:4px;color:${d.hex};opacity:.6;margin-bottom:3px;text-transform:uppercase">Éco-conception logicielle</div>
        <div style="font-family:var(--fd);font-size:15px;font-weight:800;color:#fff;letter-spacing:2px">GREEN IT</div>
        <div style="font-size:8.5px;color:rgba(200,250,215,.55);letter-spacing:1.5px;margin-top:2px">Sobriété numérique &amp; optimisation</div>
      </div>
      <div class="sec">SOBRIÉTÉ NUMÉRIQUE</div>
      <p class="desc">Le numérique représente environ 4 % des émissions mondiales de gaz à effet de serre. Pour le développement SLAM, l’enjeu présenté est l’éco-conception : produire un code durable et sobre qui limite l’obsolescence matérielle.</p>
      <div style="border:1px solid ${d.hex}25;background:${d.hex}05;padding:14px 16px;position:relative;overflow:hidden;margin:12px 0">
        <div style="position:absolute;top:0;left:0;bottom:0;width:3px;background:linear-gradient(180deg,${d.hex},${d.hex}22)"></div>
        <div style="font-size:6.5px;letter-spacing:4px;color:${d.hex};opacity:.7;margin-bottom:4px;text-transform:uppercase">Cadre réglementaire français</div>
        <div style="font-family:var(--fd);font-size:13px;font-weight:800;color:#fff;letter-spacing:1px;margin-bottom:6px">RGESN (DINUM)</div>
        <p style="font-size:10.5px;color:rgba(200,252,215,.78);line-height:1.9;margin-bottom:8px">Le Référentiel général d’écoconception de services numériques fournit des critères pour réduire les requêtes, compresser les ressources, limiter le JavaScript client et choisir un hébergement plus sobre.</p>
      </div>
      <div style="border:1px solid #34d39925;background:#34d39905;padding:14px 16px;position:relative;overflow:hidden;margin-bottom:12px">
        <div style="position:absolute;top:0;left:0;bottom:0;width:3px;background:linear-gradient(180deg,#34d399,#34d39922)"></div>
        <div style="font-size:6.5px;letter-spacing:4px;color:#34d399;opacity:.7;margin-bottom:4px;text-transform:uppercase">Mesure &amp; profilage énergétique · Open Source</div>
        <div style="font-family:var(--fd);font-size:13px;font-weight:800;color:#fff;letter-spacing:1px;margin-bottom:6px">Scaphandre &amp; CodeCarbon</div>
        <div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap"><span class="tag" style="border-color:#34d39940;color:#34d399;background:#34d3990a">MÉTRIQUE</span><span class="tag" style="border-color:#34d39940;color:#34d399;background:#34d3990a">PROFILAGE</span></div>
        <p style="font-size:10.5px;color:rgba(195,250,225,.78);line-height:1.9;margin-bottom:8px"><strong style="color:#6ee7b7">Scaphandre</strong> profile la consommation des processus et des threads en temps réel au niveau du système. <strong style="color:#6ee7b7">CodeCarbon</strong> estime les émissions de CO₂ d’un script Python pendant son exécution. Ces outils transforment l’optimisation énergétique en mesure exploitable.</p>
      </div>
      <div class="sec">LIEN AVEC LES AUTRES THÈMES</div>
      <p class="desc" style="margin-bottom:12px">Les trois thèmes se complètent : l’IA locale peut réduire la dépendance aux centres de données, la PQC demande de considérer la charge des mécanismes cryptographiques, et le Green IT mesure et réduit l’empreinte du logiciel. La dette technique peut également entraîner du travail processeur évitable.</p>
      <div class="sec">POC ET IMPACT DÉVELOPPEMENT (SLAM)</div>
      <p class="desc" style="border-left:2px solid ${d.hex}80;padding:6px 0 6px 10px;background:${d.hex}05;margin-bottom:20px">Refactoriser les boucles, optimiser les requêtes SQL et utiliser le cache peut réduire les calculs inutiles et les échanges réseau. Le profilage aide à cibler les changements utiles.</p>
      <div class="sec">SOURCES ET LIENS DE RÉFÉRENCE</div>
      <div style="font-size:9.5px;color:rgba(200,235,252,.7);line-height:1.8;padding-left:5px">
        • <a href="https://ecoresponsable.numerique.gouv.fr/publications/referentiel-general-ecoconception/" target="_blank" rel="noopener noreferrer" style="color:${d.hex};text-decoration:none">DINUM : Référentiel général d’écoconception</a><br>
        • <a href="https://github.com/hubblo-org/scaphandre" target="_blank" rel="noopener noreferrer" style="color:${d.hex};text-decoration:none">Scaphandre : profilage énergétique</a><br>
        • <a href="https://codecarbon.io/" target="_blank" rel="noopener noreferrer" style="color:${d.hex};text-decoration:none">CodeCarbon : estimation des émissions</a>
      </div>
      <div class="mets2"><div class="met2"><span class="mv2" style="color:${d.hex}">RGESN</span><span class="ml2">RÉFÉRENTIEL</span></div><div class="met2"><span class="mv2" style="color:${d.hex}">2</span><span class="ml2">OUTILS</span></div><div class="met2"><span class="mv2" style="color:${d.hex}">SLAM</span><span class="ml2">APPLICATION</span></div></div>`
  },
  {
    id:'contact', name:'CONTACT', sub:'Contact · Auvergne–Rhône-Alpes',
    color:0xf472b6, hex:'#f472b6', em:0x6b0040,
    size:.68, r:27.5, sp:.06, a:Math.PI*1.1, rot:.011,
    html:d=>`
      <p class="pdesc">Vous souhaitez échanger sur mon parcours ou une opportunité en développement, en data ou en IA ? Écrivez-moi.</p>
      <div><div class="slb">COORDONNÉES DIRECTES</div>
      <div class="tl2" style="--ac:${d.hex}">
        <div class="ti2">
          <div class="tdate">EMAIL</div>
          <div class="tdot2" style="background:${d.hex};box-shadow:0 0 10px ${d.hex}"></div>
          <div><a class="contact-link" href="mailto:lianpitersilvente@gmail.com">lianpitersilvente@gmail.com</a></div>
        </div>
        <div class="ti2">
          <div class="tdate">MOBILE</div>
          <div class="tdot2" style="background:${d.hex};box-shadow:0 0 10px ${d.hex}"></div>
          <div><a class="contact-link" href="tel:0699940341">06 99 94 03 41</a></div>
        </div>
        <div class="ti2">
          <div class="tdate">ADRESSE</div>
          <div class="tdot2" style="background:${d.hex};box-shadow:0 0 10px ${d.hex}"></div>
          <div>
            <div class="ttl2">38660 Le Touvet</div>
            <div class="tdc2">Mobilité : Auvergne Rhône-Alpes (Lyon et environs)</div>
          </div>
        </div>
      </div></div>
      <div class="cta2">
        <a href="mailto:lianpitersilvente@gmail.com" class="btn2 btnp2" style="--pcolor:${d.hex}">✉ ÉCRIRE UN EMAIL</a>
        <a href="tel:0699940341" class="btn2 btns2">📱 APPELER</a>
      </div>`
  }
];
