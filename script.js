/* ---- bloco 1 ---- */
const W={bal:1000,load(){try{const v=localStorage.getItem('mesa-bal');if(v!==null&&!isNaN(+v)&&+v>=0)this.bal=+v}catch(e){}},save(){try{localStorage.setItem('mesa-bal',this.bal)}catch(e){}if(this.sync)this.sync()}};W.load();

/* ---- bloco 2 ---- */
const S={bet:0,deck:[],d:[],h:[],i:0,ph:'bet',msg:'Faça sua aposta (mínimo 10)'};
const $=id=>document.getElementById(id),fmt=n=>n.toLocaleString('pt-BR',{maximumFractionDigits:2});
const save=()=>W.save();
function mk(){const r='A,2,3,4,5,6,7,8,9,10,J,Q,K'.split(','),s=['♠','♥','♦','♣'],d=[];
for(let k=0;k<6;k++)for(const x of r)for(const y of s)d.push({r:x,s:y});d.push({r:'JOKER',s:'🃏',v:Math.random()*6|0});
for(let i=d.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[d[i],d[j]]=[d[j],d[i]]}return d}
const draw=()=>{if(S.deck.length<52)S.deck=mk();return S.deck.pop()};
const jk=c=>c.r==='JOKER',hasJ=cs=>cs.some(jk);
const cv=c=>c.r==='JOKER'?0:c.r==='A'?11:['10','J','Q','K'].includes(c.r)?10:+c.r;
function sc(cs){let t=0,a=0;cs.forEach(c=>{t+=cv(c);if(c.r==='A')a++});while(t>21&&a){t-=10;a--}return t}
const bj=c=>c.length===2&&sc(c)===21,cur=()=>S.h[S.i];
function addBet(v){if(S.bet+v<=W.bal){S.bet+=v;render()}}
function deal(){if(S.bet<10||S.bet>W.bal)return;W.bal-=S.bet;
S.h=[{c:[draw(),draw()],bet:S.bet}];S.d=[draw(),draw()];S.i=0;S.ph='play';S.msg='';
if(hasJ(S.h[0].c)||hasJ(S.d)||bj(S.h[0].c)||bj(S.d))finish();else render()}
function next(){if(S.i<S.h.length-1){S.i++;if(sc(cur().c)===21)return next();render()}else finish()}
function hit(){cur().c.push(draw());if(hasJ(cur().c))return finish();sc(cur().c)>=21?next():render()}
function dbl(){const x=cur();W.bal-=x.bet;x.bet*=2;x.c.push(draw());hasJ(x.c)?finish():next()}
function split(){const x=cur(),y={c:[x.c.pop()],bet:x.bet,sp:1};W.bal-=x.bet;x.sp=1;
x.c.push(draw());y.c.push(draw());S.h.splice(S.i+1,0,y);if(hasJ(x.c)||hasJ(y.c))return finish();sc(x.c)===21?next():render()}
function sur(){cur().res='sur';finish()}
function finish(){S.ph='over';
const pj=S.h.some(x=>hasJ(x.c));
if(!pj&&!hasJ(S.d)&&S.h.some(x=>!x.res&&sc(x.c)<=21&&!(bj(x.c)&&!x.sp)))while(sc(S.d)<17){S.d.push(draw());if(hasJ(S.d))break}
const dj=hasJ(S.d),dt=sc(S.d),db=bj(S.d);let net=0;
S.h.forEach(x=>{const t=sc(x.c);let p=0,r,k='';
if(hasJ(x.c)){p=x.bet*2;r='CORINGA! Vitória na hora';k='w'}
else if(dj){r='Coringa do dealer!';k='l'}
else if(pj){p=x.bet;r='Devolvida'}
else if(x.res==='sur'){p=x.bet/2;r='Desistiu';k='l'}
else if(t>21){r='Estourou';k='l'}
else if(bj(x.c)&&!x.sp){if(db){p=x.bet;r='Empate'}else{p=x.bet*2.5;r='Blackjack! 3:2';k='w'}}
else if(db){r='Dealer fez Blackjack';k='l'}
else if(dt>21||t>dt){p=x.bet*2;r='Vitória';k='w'}
else if(t===dt){p=x.bet;r='Empate'}
else{r='Derrota';k='l'}
x.out=r;x.k=k;W.bal+=p;net+=p-x.bet});
S.msg=pj?'🃏 CORINGA! Vitória instantânea: +'+fmt(net)+' fichas!':dj?'🃏 O dealer tirou o CORINGA e venceu na hora!':net>0?'Você ganhou '+fmt(net)+' fichas! 🎉':net<0?'Você perdeu '+fmt(-net)+' fichas':'Empate — aposta devolvida';
save();render()}
function again(){S.ph='bet';S.h=[];S.d=[];if(S.bet>W.bal)S.bet=0;S.msg='Faça sua aposta (mínimo 10)';render()}
function rebuy(){W.bal=1000;S.bet=0;save();render()}
const Y='#f2c230',R='#c8261c',B='#1f3fa0',K='#161616',F='#f3d3b0';
const L=[[34,24],[66,24],[34,70],[66,70],[34,116],[66,116]],P={2:[[50,24],[50,116]],3:[[50,24],[50,70],[50,116]],4:[L[0],L[1],L[4],L[5]],5:[L[0],L[1],[50,70],L[4],L[5]],6:L,7:[...L,[50,47]],8:[...L,[50,47],[50,93]],9:[[34,24],[66,24],[34,57],[66,57],[50,70],[34,83],[66,83],[34,116],[66,116]],10:[[34,24],[66,24],[50,40],[34,57],[66,57],[34,83],[66,83],[50,100],[34,116],[66,116]]};
const JV=[[R,K,Y,'wand','jester'],[Y,R,K,'cards','jester'],[R,Y,K,'none','jester'],[Y,R,K,'cane','top'],[B,R,Y,'staff','jester'],[R,K,Y,'bike','crown']];
function joker(v){const[a,b,c,p,h]=JV[v];
if(p==='bike')return `<g fill="none" stroke="${K}" stroke-width="2"><circle cx="36" cy="106" r="17"/><circle cx="76" cy="106" r="17"/><path d="M36 106L52 86 76 106M52 86L48 70M42 70h12"/></g><path d="M40 46h26l4 26H38z" fill="${a}" stroke="${K}"/><circle cx="53" cy="36" r="9" fill="${F}" stroke="${K}"/><path d="M45 40q8 16 16 0z" fill="#fff" stroke="${K}" stroke-width=".7"/><path d="M44 28l2-10 4 6 3-8 3 8 4-6 2 10z" fill="${Y}" stroke="${K}"/>`;
const hat=h==='top'?`<path d="M42 30V12h26v18" fill="${K}"/><path d="M36 30h38" stroke="${K}" stroke-width="4"/><path d="M42 26h26" stroke="${R}" stroke-width="3"/>`:`<path d="M41 33Q35 14 43 9Q49 22 55 22T67 9Q75 14 69 33Z" fill="${a}" stroke="${K}"/><circle cx="43" cy="9" r="3" fill="${c}"/><circle cx="67" cy="9" r="3" fill="${c}"/>`;
const pr={wand:`<path d="M26 70L16 28" stroke="${K}" stroke-width="2"/><circle cx="16" cy="26" r="5" fill="${Y}" stroke="${K}"/>`,cards:`<g transform="rotate(-18 82 56)"><rect x="76" y="40" width="12" height="17" fill="#fff" stroke="${K}" stroke-width=".7"/><rect x="82" y="39" width="12" height="17" fill="#fff" stroke="${K}" stroke-width=".7"/><text x="84" y="52" font-size="9" fill="${R}">♥</text></g>`,cane:`<path d="M84 70V118" stroke="${K}" stroke-width="3"/>`,staff:`<path d="M24 70L20 18" stroke="${R}" stroke-width="3"/><path d="M14 16q6-10 12 0" stroke="${R}" fill="none" stroke-width="3"/>`,none:''}[p];
return `${pr}<path d="M48 88L44 114" stroke="${b}" stroke-width="8"/><path d="M62 88L68 114" stroke="${a}" stroke-width="8"/><path d="M36 114h14q4 10-6 12-8 0-8-12zM60 114h14q6 12-4 12-10-2-10-12z" fill="${c}" stroke="${K}"/><path d="M26 70L42 58M84 70L68 58" stroke="${a}" stroke-width="7" stroke-linecap="round"/><circle cx="26" cy="70" r="4" fill="${F}"/><circle cx="84" cy="70" r="4" fill="${F}"/><path d="M42 54H68L72 88H38Z" fill="${a}" stroke="${K}"/><path d="M55 54H68L72 88H55Z" fill="${b}"/><path d="M55 62l8 10-8 10-8-10z" fill="${c}"/><path d="M40 54l5-6 5 6 5-6 5 6 5-6 5 6z" fill="${c}" stroke="${K}" stroke-width=".8"/><circle cx="55" cy="40" r="10" fill="#fff" stroke="${K}"/><circle cx="51" cy="38" r="1.3"/><circle cx="59" cy="38" r="1.3"/><path d="M50 44q5 5 10 0" stroke="${R}" fill="none" stroke-width="1.6"/>${hat}`}
function court(r,col,su){const[a,b,c]={K:[R,Y,B],Q:[Y,B,R],J:[B,R,Y]}[r];
const hd={K:`<path d="M37 24l1-9 5 5 4-8 4 8 5-5 1 9z" fill="${Y}" stroke="${K}" stroke-width=".7"/><path d="M40 37q7 16 15 0z" fill="#e8e8e8" stroke="${K}" stroke-width=".6"/>`,Q:`<path d="M37 24q-2-14 10-14t10 14q-2-6-10-6t-10 6zM36 26q-4 14 2 22l3-12z" fill="${Y}" stroke="${K}" stroke-width=".7"/><path d="M40 14l2-5 3 3 2-5 2 5 3-3 2 5z" fill="${B}"/>`,J:`<path d="M37 26q0-14 12-14 8 0 12 5l-5 5q-8-2-12 4z" fill="${B}" stroke="${K}" stroke-width=".7"/><path d="M58 15q10-8 13 2" stroke="${R}" stroke-width="2.4" fill="none"/>`}[r];
const f=`<path d="M22 70L28 46Q48 38 68 46L74 70Z" fill="${a}" stroke="${K}" stroke-width=".8"/><path d="M28 46Q48 38 68 46L60 70H46Z" fill="${b}"/><path d="M28 46L40 43 34 70H22Z" fill="${c}"/><path d="M50 52l4 4-4 4-4-4zM60 58l3 3-3 3-3-3z" fill="#fff" stroke="${K}" stroke-width=".5"/><ellipse cx="47" cy="30" rx="7.5" ry="9" fill="${F}" stroke="${K}" stroke-width=".7"/><circle cx="44" cy="29" r="1"/><path d="M45 36q3 2 6 0" stroke="${R}" fill="none"/>${hd}<circle cx="68" cy="56" r="4" fill="${F}" stroke="${K}" stroke-width=".6"/><circle cx="72" cy="48" r="4" fill="${Y}" stroke="${K}" stroke-width=".6"/><circle cx="72" cy="48" r="1.5" fill="${B}"/><text x="73" y="38" font-size="20" text-anchor="middle" fill="${col}">${su}</text>`;
return `<rect x="20" y="12" width="60" height="116" fill="none" stroke="${B}" stroke-width="1.8"/><g>${f}</g><g transform="rotate(180 50 70)">${f}</g>`}
const card=c=>{const R_=c.r;
if(R_==='JOKER'){const v=c.v||0,lc=v===3?R:K,t=[...'JOKER'].map((l,i)=>`<text x="11" y="${17+12.5*i}" font-size="13" font-weight="900" text-anchor="middle" fill="${lc}">${l}</text>`).join('');return `<div class="c win"><svg viewBox="0 0 100 140"><g>${t}</g><g transform="rotate(180 50 70)">${t}</g>${joker(v)}</svg></div>`}
const col='♥♦'.includes(c.s)?R:'#111';
const ix=`<text x="11" y="20" font-size="17" font-weight="700" text-anchor="middle" fill="${col}">${R_}</text><text x="11" y="36" font-size="15" text-anchor="middle" fill="${col}">${c.s}</text>`;
let art=`<g>${ix}</g><g transform="rotate(180 50 70)">${ix}</g>`;
if('JQK'.includes(R_))art+=court(R_,col,c.s);
else if(R_==='A')art+=`<text x="50" y="70" font-size="58" text-anchor="middle" dominant-baseline="central" fill="${col}">${c.s}</text>`;
else art+=P[R_].map(([x,y])=>`<text x="${x}" y="${y}" font-size="24" text-anchor="middle" dominant-baseline="central" fill="${col}"${y>70?` transform="rotate(180 ${x} ${y})"`:''}>${c.s}</text>`).join('');
return `<div class="c"><svg viewBox="0 0 100 140">${art}</svg></div>`};
function render(){$('bal').textContent=fmt(W.bal);$('msg').textContent=S.msg;
const over=S.ph==='over',play=S.ph==='play';
$('dl').innerHTML=S.d.map((c,k)=>k===1&&!over?'<div class="c back"></div>':card(c)).join('');
$('dt').innerHTML=S.d.length?`<b>${over?sc(S.d):cv(S.d[0])===11?'11 / 1':cv(S.d[0])}</b>`:'';
$('hs').innerHTML=S.h.map((x,k)=>`<div class="hand ${play&&k===S.i?'act':''}"><div class="hd"><span>${S.h.length>1?'Mão '+(k+1):'Você'}: <b>${sc(x.c)}</b></span><span>Aposta: <b>${fmt(x.bet)}</b></span>${x.out?`<span class="tag ${x.k}">${x.out}</span>`:''}</div><div class="row">${x.c.map(card).join('')}</div></div>`).join('');
const bt=$('bt'),ct=$('ct');
if(S.ph==='bet'){
bt.innerHTML=`<div class="bet">Aposta: <b style="color:var(--gold)">${fmt(S.bet)}</b></div>`;
if(W.bal<10){ct.innerHTML='<button onclick="openDep()">Adicionar fichas</button>';return}
const cl={10:'#c0392b',25:'#1e8449',100:'#222',500:'#6c3483'};
ct.innerHTML=Object.keys(cl).map(v=>`<button class="chip" style="background:${cl[v]}" ${S.bet+ +v>W.bal?'disabled':''} onclick="addBet(${v})">${v}</button>`).join('')+
`<button class="s" onclick="S.bet=0;render()">Limpar</button><button class="s" ${W.bal<10?'disabled':''} onclick="S.bet=W.bal;render()">All-in</button><button ${S.bet<10?'disabled':''} onclick="deal()">DISTRIBUIR</button>`}
else if(play){bt.innerHTML='';const x=cur(),two=x.c.length===2;
ct.innerHTML=`<button onclick="hit()">Pedir</button><button onclick="next()">Parar</button>
<button ${two&&W.bal>=x.bet?'':'disabled'} onclick="dbl()">Dobrar</button>
<button ${two&&cv(x.c[0])===cv(x.c[1])&&W.bal>=x.bet&&S.h.length<4?'':'disabled'} onclick="split()">Dividir</button>
<button class="s" ${two&&S.h.length===1&&!x.sp?'':'disabled'} onclick="sur()">Desistir</button>`}
else{bt.innerHTML='';ct.innerHTML=W.bal<10?'<button onclick="openDep()">Adicionar fichas</button>':'<button onclick="again()">Nova rodada</button>'}}
render();
const T={
r:`<h3>Objetivo</h3><p>Fazer mais pontos que o dealer sem passar de 21. Passou de 21 = estourou e perde.</p>
<h3>Valor das cartas</h3><p>2–10 valem o número · J, Q, K valem 10 · Ás vale 1 ou 11 · naipes não importam.</p>
<h3>Rodada</h3><p>1) Aposte. 2) Você e o dealer recebem 2 cartas (a 2ª do dealer fica virada). 3) Você joga. 4) O dealer revela e compra até ter 17 ou mais.</p>
<h3>Ações</h3><p><b>Pedir</b> mais uma carta · <b>Parar</b> · <b>Dobrar</b> (aposta ×2, só 1 carta) · <b>Dividir</b> pares em 2 mãos (até 4) · <b>Desistir</b> (só na 1ª decisão, recebe metade).</p>
<table><tr><th>Resultado</th><th>Pagamento</th></tr><tr><td>Vitória</td><td>1:1</td></tr><tr><td>Blackjack natural (A + 10)</td><td>3:2</td></tr><tr><td>Empate (push)</td><td>aposta devolvida</td></tr><tr><td>🃏 Coringa seu</td><td>vitória na hora, 1:1</td></tr><tr><td>🃏 Coringa do dealer</td><td>perde na hora</td></tr><tr><td>Derrota / estouro</td><td>perde a aposta</td></tr></table>
<h3>🃏 A carta Coringa</h3><p>O baralho tem 6 baralhos + <b>1 Coringa</b> (313 cartas). Quem recebe o Coringa vence a rodada imediatamente: se vier para você, a mão com o Coringa ganha 1:1 (outras mãos divididas são devolvidas); se vier para o dealer, você perde as apostas da rodada.</p>`,
p:`<h3>Probabilidades (6 baralhos)</h3><table><tr><th>Evento</th><th>Chance aprox.</th></tr>
<tr><td>Carta ser um Ás</td><td>7,7% (24/312)</td></tr><tr><td>Carta valer 10 (10, J, Q, K)</td><td>30,8% (96/312)</td></tr>
<tr><td>Blackjack natural nas 2 primeiras</td><td>≈ 4,7%</td></tr>
<tr><td>Estourar pedindo carta com 12</td><td>≈ 31%</td></tr><tr><td>Estourar pedindo carta com 16</td><td>≈ 62%</td></tr><tr><td>Estourar pedindo carta com 17</td><td>≈ 69%</td></tr><tr><td>Estourar pedindo carta com 20</td><td>≈ 92%</td></tr>
<tr><td>Estourar pedindo carta com 11 ou menos</td><td>0%</td></tr>
<tr><td>Dealer estourar</td><td>≈ 28%</td></tr>
<tr><td>Por mão (estratégia básica): vitória / empate / derrota</td><td>≈ 42% / 8% / 49%</td></tr>
<tr><td>🃏 Coringa em uma carta sacada</td><td>1/313 ≈ 0,32%</td></tr><tr><td>🃏 Coringa em uma rodada (~5,5 cartas)</td><td>≈ 1,7% (1 em ~60 rodadas)</td></tr></table>
<p>O baralho é reembaralhado quando restam menos de 52 cartas, então às vezes o Coringa nem chega a sair.</p>`,
m:`<h3>Valor esperado (EV)</h3><p>EV = Σ (probabilidade × ganho). É o resultado médio por aposta no longo prazo. No blackjack com estratégia básica perfeita, a vantagem da casa fica em torno de <b>0,5%</b>: em média, −0,5 ficha a cada 100 apostadas. Jogando "no feeling", sobe para 2–4%.</p>
<h3>Blackjack natural</h3><p>P = 2 × (24/312) × (96/311) ≈ 4,75%. Pagar 3:2 em vez de 6:5 vale (1,5 − 1,2) × 4,75% ≈ <b>1,4 ponto percentual</b> a favor do jogador.</p>
<h3>Efeito do Coringa</h3><p>Dealer e jogador recebem quase o mesmo número de cartas, então o Coringa cai para um lado ou outro com chance parecida. Como paga 1:1 e a derrota custa 1, o EV do evento é ≈ 0: ele <b>aumenta a variância</b> (a sorte), quase sem mexer na vantagem da casa.</p>
<h3>Sorte × matemática</h3><p>Desvio-padrão por mão ≈ 1,15 aposta. Em 100 rodadas de 25 fichas: perda esperada ≈ 12,5 fichas, mas o desvio é ≈ 290. No curto prazo a sorte domina; só em milhares de rodadas a média da casa aparece (lei dos grandes números).</p>
<h3>Falácia do apostador</h3><p>Cartas não têm memória: perder 5 vezes seguidas não aumenta a chance de ganhar a próxima. Cada rodada é praticamente independente.</p>
<h3>Risco de ruína</h3><p>Apostar uma fração grande do saldo (ex.: all-in) faz a chance de zerar subir rápido. Apostas pequenas em relação ao saldo duram mais.</p>`};
function tab(k){$('mb').innerHTML=`<div class="tb">${[['r','📜 Regras'],['p','🎲 Probabilidades'],['m','🧮 Matemática']].map(([a,b])=>`<button class="${a===k?'':'s'}" onclick="tab('${a}')">${b}</button>`).join('')}<button class="s" style="margin-left:auto" onclick="closeH()">✕</button></div>`+T[k]}
function openH(){tab('r');$('md').classList.add('on')}function closeH(){$('md').classList.remove('on')}

/* ---- bloco 3 ---- */
(()=>{
const q=id=>document.getElementById(id),nf=n=>n.toLocaleString('pt-BR',{maximumFractionDigits:2}),rd=n=>Math.round(n*100)/100,N=25;
const V=['lobby','mines','bj','depv'];
function go(v){V.forEach(x=>q(x).hidden=x!==v);document.querySelector('.tabs').hidden=v==='depv';document.querySelectorAll('.tabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.v===v));refresh();window.scrollTo(0,0)}
function refresh(){q('bal').textContent=nf(W.bal);mUI();if(!q('bj').hidden)render()}
document.querySelectorAll('[data-v],[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.v||b.dataset.go));
q('home').onclick=e=>{e.preventDefault();go('lobby')};
const dep=q('dep'),close=()=>dep.classList.remove('on');
q('add').onclick=()=>go('depv');window.openDep=()=>go('depv');
const DU=location.href.split('#')[0].split('?')[0]+'?deposito=1';q('dlink').href=DU;
try{const qr=qrcode(0,'M');qr.addData(DU);qr.make();q('qr').innerHTML='<img alt="QR code do depósito" src="'+qr.createDataURL(4,0)+'">'}catch(e){q('qr').hidden=true}
q('dgo').onclick=()=>{close();go('depv')};
q('dx').onclick=close;dep.onclick=e=>{if(e.target===dep)close()};
addEventListener('keydown',e=>{if(e.key==='Escape')close()});
/* Mines */
const nb=q('m-nb'),bd=q('m-board');
for(let i=1;i<=24;i++){const o=new Option(i,i);if(i===22)o.selected=true;nb.add(o)}
nb.onchange=()=>{const b=N-+nb.value;q('m-bn').textContent=b+(b===1?' bomba escondida':' bombas escondidas')};
let m={on:false,bombs:new Set(),hits:0,bet:0,nb:3};
const mult=(k,b)=>{let x=.97;for(let i=0;i<k;i++)x*=(N-i)/(N-b-i);return Math.max(x,1)};
const fx=n=>n.toFixed(2).replace('.',',')+'x',say=t=>q('m-msg').textContent=t;
function mUI(){q('m-start').disabled=m.on;nb.disabled=m.on;q('m-bet').disabled=m.on;q('m-cash').disabled=!(m.on&&m.hits>0);
const mu=m.hits?mult(m.hits,m.nb):1;q('m-mult').textContent=fx(mu);q('m-win').textContent=nf(m.on&&m.hits?rd(m.bet*mu):0)}
function build(on){bd.innerHTML='';for(let i=0;i<N;i++){const t=document.createElement('button');t.className='tile';t.type='button';t.disabled=!on;t.setAttribute('aria-label','Quadrado '+(i+1));t.onclick=()=>pick(i,t);bd.appendChild(t)}}
function rev(k){[...bd.children].forEach((t,i)=>{if(!t.classList.contains('star')&&!t.classList.contains('bomb')){const b=m.bombs.has(i);t.textContent=b?'💣':'⭐';t.classList.add(b?'bomb':'star');if(i!==k)t.classList.add('ghost')}t.disabled=true})}
function out(pre){const mu=mult(m.hits,m.nb),p=rd(m.bet*mu);W.bal=rd(W.bal+p);W.save();m.on=false;rev(-1);say(pre+'Cash out em '+fx(mu)+': +'+nf(p)+' fichas.');refresh()}
function pick(i,t){if(!m.on)return;
if(m.bombs.has(i)){m.on=false;rev(i);say('Era uma bomba! Você perdeu '+nf(m.bet)+' fichas.');refresh();return}
m.hits++;t.textContent='⭐';t.classList.add('star');t.disabled=true;
if(m.hits===N-m.nb)return out('Você achou todas as estrelas! ');
say(m.hits+(m.hits===1?' estrela':' estrelas')+'. Continue ou faça o cash out.');mUI()}
q('m-cash').onclick=()=>{if(m.on&&m.hits)out('')};
q('m-start').onclick=()=>{const b=rd(+q('m-bet').value);
if(!(b>=10))return say('A aposta mínima é 10 fichas.');
if(b>W.bal)return say('Saldo insuficiente. Adicione fichas ou diminua a aposta.');
W.bal=rd(W.bal-b);W.save();m={on:true,bombs:new Set(),hits:0,bet:b,nb:N-+nb.value};
while(m.bombs.size<m.nb)m.bombs.add(Math.random()*N|0);
build(true);say('Clique em um quadrado.');refresh()};
document.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{const i=q('m-bet'),v=+i.value||0,mx=Math.max(10,Math.floor(W.bal));
i.value=b.dataset.q==='half'?Math.max(10,rd(v/2)):b.dataset.q==='dbl'?Math.min(rd(v*2),mx):mx});
window.fabRefresh=refresh;let tt=null;window.fabToast=t=>{const e=q('toast');e.textContent=t;e.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>e.classList.remove('on'),5000)};
const dm=t=>q('dmsg').textContent=t,dshow=()=>{q('dtot').textContent=nf(Math.round(+q('damt').value||0))};q('damt').oninput=dshow;
[50,100,500,1000].forEach(v=>{const b=document.createElement('button');b.type='button';b.className='sbtn alt';b.textContent='+'+nf(v);b.onclick=()=>{q('damt').value=Math.min(Math.round(+q('damt').value||0)+v,1e12);dshow()};q('dg').appendChild(b)});
{const c=document.createElement('button');c.type='button';c.className='sbtn alt';c.textContent='Limpar valor';c.style.gridColumn='1/-1';c.onclick=()=>{q('damt').value='';dshow()};q('dg').appendChild(c)}
q('dgo2').onclick=async()=>{const a=Math.round(+q('damt').value);
if(!(a>=10&&a<=1e12))return dm('Some ou digite pelo menos 10 fichas.');
if(!window.fabDeposit)return dm('Entre na sua conta do claude.ai para depositar.');
try{await window.fabDeposit(a);q('damt').value='';dshow();dm('Depósito de '+nf(a)+' fichas enviado! Elas já estão no seu saldo.')}catch(e){dm('Não foi possível depositar agora. Tente de novo.')}};
build(false);go(/deposito/.test(location.search+location.hash)?'depv':'lobby');
})();

/* ---- bloco 4 ---- */
const mxe=id=>document.getElementById(id);
const mxf=(n,d)=>n.toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});
const mxm=m=>mxf(Math.max(m,1),2)+'x',mxpc=p=>mxf(p*100,p<.01?3:1)+'%';
function mxRows(s){const r=[];let c=1;for(let k=1;k<=s;k++){const p=(s-k+1)/(26-k);c*=p;r.push([k,p,c,.97/c])}return r}
function mxP(s){const b=25-s,r=mxRows(s),h=r.find(x=>x[2]<.5);let C=1;for(let i=1;i<=b;i++)C=C*(25-b+i)/i;
mxe('mxt').innerHTML=`<p>Com <b>${s}</b> ${s===1?'estrela':'estrelas'} e <b>${b}</b> ${b===1?'bomba':'bombas'}, a chance de perder já no 1º clique é <b>${mxpc(b/25)}</b>. A chance acumulada de sobreviver fica abaixo de 50% a partir do clique <b>${h[0]}</b> (${mxpc(h[2])}). Limpar todas as estrelas é 1 chance em <b>${Math.round(C).toLocaleString('pt-BR')}</b>.</p><div class="mxs"><table><tr><th>Clique</th><th>Chance neste clique</th><th>Chance acumulada</th><th>Multiplicador</th></tr>${r.map(x=>`<tr><td>${x[0]}</td><td>${mxpc(x[1])}</td><td>${mxpc(x[2])}</td><td>${mxm(x[3])}</td></tr>`).join('')}</table></div>`}
const MXR=`<h3>Objetivo</h3><p>Revelar o maior número de estrelas e fazer o cash out antes de clicar em uma bomba. Você decide quando parar.</p>
<h3>O tabuleiro</h3><p>Grade 5x5 com 25 quadrados ocultos. Cada um esconde uma ⭐ estrela ou uma 💣 bomba. Aqui você escolhe quantas estrelas ficam no tabuleiro (de 1 a 24); os quadrados restantes são bombas.</p>
<h3>Rodada</h3><p>1) Defina a aposta (mínimo 10 fichas). 2) Escolha as estrelas. 3) Toque em <b>Começar rodada</b>. 4) Clique nos quadrados, um por vez. 5) Faça o <b>Cash out</b> quando quiser.</p>
<table><tr><th>Situação</th><th>Resultado</th></tr><tr><td>Achou uma estrela</td><td>O multiplicador sobe</td></tr><tr><td>Cash out</td><td>Você recebe aposta × multiplicador</td></tr><tr><td>Clicou em uma bomba</td><td>A rodada acaba e a aposta é perdida</td></tr><tr><td>Achou todas as estrelas</td><td>Cash out automático no multiplicador máximo</td></tr></table>
<h3>Sorteio</h3><p>As bombas são sorteadas quando a rodada começa. Todos os quadrados têm a mesma chance, então o canto vale o mesmo que o centro.</p>`;
function mxPT(){const cur=+mxe('m-nb').value||22;return `<h3>Chance e multiplicador no 1º clique</h3><div class="mxs"><table><tr><th>Bombas</th><th>Estrelas</th><th>Chance no 1º clique</th><th>Multiplicador</th></tr>${[1,3,5,10,15,20,24].map(b=>`<tr><td>${b}</td><td>${25-b}</td><td>${mxpc((25-b)/25)}</td><td>${mxm(.97*25/(25-b))}</td></tr>`).join('')}</table></div><p class="mxn">Multiplicadores desta demo, com margem da casa de 3% (RTP de 97%). Jogos de provedores reais, como a Spribe, usam valores parecidos, com pequenas diferenças.</p><h3>Rodada passo a passo</h3><label>Estrelas no tabuleiro <select id="mxs" onchange="mxP(+this.value)">${Array.from({length:24},(_,i)=>`<option${i+1===cur?' selected':''}>${i+1}</option>`).join('')}</select></label><div id="mxt"></div>`}
function mxMT(){const a=mxRows(22);return `<h3>Chance de acertar o próximo clique</h3><p>Chance = estrelas restantes ÷ quadrados restantes. Com 22 estrelas, o 1º clique tem 22/25 = ${mxpc(22/25)}; se acertou, o 2º tem 21/24 = ${mxpc(21/24)}, e assim por diante.</p>
<h3>Chance acumulada</h3><p>Para sobreviver a k cliques, multiplique a chance de cada clique: P = (s/25) × ((s−1)/24) × ((s−2)/23) × … Cada acerto deixa a próxima chance menor.</p>
<h3>Multiplicador</h3><p>Multiplicador justo = 1 ÷ P. Multiplicador pago = RTP ÷ P, com RTP de 97% nesta demo. Exemplo com 22 estrelas (3 bombas): 1º clique = 0,97 ÷ ${mxf(a[0][2],4)} = <b>${mxm(a[0][3])}</b>; 5º clique: chance acumulada de ${mxpc(a[4][2])} e multiplicador de <b>${mxm(a[4][3])}</b>.</p>
<h3>Valor esperado (EV)</h3><p>EV = P × (RTP ÷ P) − 1 = −3%. Em média, −3 fichas a cada 100 apostadas, <b>não importa em que clique você saca</b>. O momento do saque muda a sorte, não a média.</p>
<h3>Sacar cedo × sacar tarde</h3><p>Sacar no 1º clique (3 bombas) ganha ${mxpc(a[0][2])} das vezes, pagando pouco. Sacar no 5º ganha só ${mxpc(a[4][2])} das vezes, mas paga ${mxm(a[4][3])}. Mesma média, variância bem diferente.</p>
<h3>Mais bombas</h3><p>Mais bombas significam multiplicadores maiores e chance de sobreviver menor. Com 24 bombas, acertar o único quadrado de estrela paga ${mxm(.97*25)}, mas com apenas 4% de chance.</p>
<h3>Falácia do apostador</h3><p>Perder várias rodadas seguidas não deixa a próxima mais perto de ganhar. As bombas são sorteadas de novo a cada rodada e não há "padrão" para descobrir.</p>
<h3>Risco de ruína</h3><p>Apostar uma fração grande do saldo faz a chance de zerar subir rápido. Apostas pequenas em relação ao saldo duram mais.</p>`}
function mxTab(k){const c={r:()=>MXR,p:mxPT,m:mxMT}[k]();
mxe('mmb').innerHTML=`<div class="mxb">${[['r','📜 Regras'],['p','🎲 Probabilidades'],['m','🧮 Matemática']].map(([a,b])=>`<button type="button" class="btn ${a===k?'':'alt'}" onclick="mxTab('${a}')">${b}</button>`).join('')}<button type="button" class="btn alt" style="margin-left:auto" onclick="mxClose()" aria-label="Fechar">✕</button></div>`+c;
if(k==='p')mxP(+mxe('mxs').value)}
function mxOpen(){mxTab('r');mxe('mmd').classList.add('on')}
function mxClose(){mxe('mmd').classList.remove('on')}
addEventListener('keydown',e=>{if(e.key==='Escape')mxClose()});

/* ---- bloco 5 ---- */
(()=>{
const g=id=>document.getElementById(id);
const AV=[['👑','#8b3dff'],['🃏','#5b34a8'],['💎','#2563eb'],['🦁','#d97706'],['🐺','#475569'],['🦊','#ea580c'],['🐯','#ca8a04'],['🐼','#334155'],['🐲','#16a34a'],['🚀','#db2777'],['⭐','#9333ea'],['💣','#e11d48'],['♠️','#312e81'],['🎲','#0284c7'],['🦄','#c026d3'],['🐱','#ec4899']];
let P={name:'',av:0,img:''},d=null;
const ok=s=>s&&typeof s==='object'?{name:String(s.name||'').replace(/\s+/g,' ').trim().slice(0,20),av:Math.max(0,Math.min(AV.length-1,Math.round(+s.av)||0)),img:typeof s.img==='string'&&/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+\/=]+$/.test(s.img)&&s.img.length<150000?s.img:''}:null;
try{const s=ok(JSON.parse(localStorage.getItem('fab-profile')||'null'));if(s)P=s}catch(e){}
function paint(el,p){if(p.img){el.style.background='url("'+p.img+'") center/cover';el.textContent=''}else{el.style.background='linear-gradient(135deg,'+AV[p.av][1]+',#1d0a43)';el.textContent=AV[p.av][0]}}
function show(){paint(g('pfav'),P);g('pfn').textContent=P.name||'Criar perfil';g('pf').setAttribute('aria-label',P.name?'Editar perfil de '+P.name:'Criar perfil')}
const grid=g('avg');
AV.forEach((a,i)=>{const b=document.createElement('button');b.type='button';b.className='avb';b.textContent=a[0];b.style.background='linear-gradient(135deg,'+a[1]+',#1d0a43)';b.setAttribute('aria-label','Avatar '+(i+1));b.onclick=()=>{d.av=i;d.img='';upd()};grid.appendChild(b)});
function upd(){paint(g('pfp'),d);[...grid.children].forEach((b,i)=>b.setAttribute('aria-pressed',String(!d.img&&i===d.av)))}
function openP(){d={...P};g('pfi').value=P.name;g('pfe').textContent='';upd();g('pfm').classList.add('on');g('pfi').focus()}
const closeP=()=>g('pfm').classList.remove('on');
function save(){try{localStorage.setItem('fab-profile',JSON.stringify(P))}catch(e){}if(window.fabProfile.sync)window.fabProfile.sync(P)}
g('pf').onclick=openP;g('pfc').onclick=closeP;g('pfm').onclick=e=>{if(e.target===g('pfm'))closeP()};
addEventListener('keydown',e=>{if(e.key==='Escape')closeP()});
g('pfup').onclick=()=>g('pff').click();
g('pff').onchange=e=>{const f=e.target.files[0];e.target.value='';if(!f)return;
if(!f.type.startsWith('image/')){g('pfe').textContent='Escolha um arquivo de imagem.';return}
const im=new Image(),u=URL.createObjectURL(f);
im.onload=()=>{const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),s=Math.min(im.width,im.height);x.drawImage(im,(im.width-s)/2,(im.height-s)/2,s,s,0,0,128,128);URL.revokeObjectURL(u);d.img=c.toDataURL('image/jpeg',.82);g('pfe').textContent='';upd()};
im.onerror=()=>{URL.revokeObjectURL(u);g('pfe').textContent='Não foi possível ler essa imagem.'};im.src=u};
g('pfs').onclick=()=>{const n=g('pfi').value.replace(/\s+/g,' ').trim().slice(0,20);
if(!n){g('pfe').textContent='Digite um nome para o perfil.';return}
P=ok({...d,name:n});save();show();closeP();fabToast('Perfil salvo!')};
g('pfi').onkeydown=e=>{if(e.key==='Enter')g('pfs').click()};
window.fabProfile={paint,data:()=>P,created:()=>!!P.name,load(s){const n=ok(s);if(n&&n.name){P=n;try{localStorage.setItem('fab-profile',JSON.stringify(P))}catch(e){}show()}}};
show();
})();

/* ---- bloco 6 ---- */
(()=>{const n=t=>['dacc','acn'].forEach(i=>{const e=document.getElementById(i);if(e)e.textContent=t});
n('Fichas virtuais, sem dinheiro real. O saldo fica salvo neste aparelho.');
window.fabDeposit=async a=>{W.bal=Math.round((W.bal+a)*100)/100;W.save();fabRefresh();fabToast('+'+a.toLocaleString('pt-BR')+' fichas depositadas!')};})();