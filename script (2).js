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
function probHTML(){
const x=cur(),n={1:24,2:24,3:24,4:24,5:24,6:24,7:24,8:24,9:24,10:96,j:1},vk=c=>c.r==='A'?1:cv(c)>=10?10:cv(c);
S.h.forEach(h=>h.c.forEach(c=>{if(!jk(c)&&n[vk(c)]>0)n[vk(c)]--}));
const up=S.d[0],uv=vk(up);if(!jk(up)&&n[uv]>0)n[uv]--;
const ks=[1,2,3,4,5,6,7,8,9,10],tot=ks.reduce((a,k)=>a+n[k],0)+n.j,pc=k=>n[k]/tot,pj=n.j/tot,dm={};
function D(t,a){const key=t+','+a;if(dm[key])return dm[key];const b=a&&t+10<=21?t+10:t;let r=[0,0,0,0,0,0,0];
if(b>=17){if(b>21)r[5]=1;else r[b-17]=1}else{r[6]=pj;ks.forEach(k=>{const q=D(t+k,a||k===1);for(let i=0;i<7;i++)r[i]+=pc(k)*q[i]})}return dm[key]=r}
let wsum=0;const dd=[0,0,0,0,0,0,0];
ks.forEach(k=>{if((uv===1&&k===10)||(uv===10&&k===1))return;const w=n[k];wsum+=w;const q=D(uv+k,uv===1||k===1);for(let i=0;i<7;i++)dd[i]+=w*q[i]});
for(let i=0;i<7;i++)dd[i]/=wsum;
const stand=pt=>{let w=dd[5],p=0,l=dd[6];for(let f=17;f<=21;f++){const q=dd[f-17];if(f<pt)w+=q;else if(f===pt)p+=q;else l+=q}return[w,p,l]};
const ev=r=>r[0]-r[2],pm={};
function best(t,a){const key=t+','+a;if(pm[key])return pm[key];const b=a&&t+10<=21?t+10:t,s=stand(b);if(b>=21)return pm[key]=s;
const h=hitT(t,a);return pm[key]=ev(h)>ev(s)?h:s}
function hitT(t,a){let r=[pj,0,0];ks.forEach(k=>{const nt=t+k;if(nt>21){r[2]+=pc(k);return}const q=best(nt,a||k===1);for(let i=0;i<3;i++)r[i]+=pc(k)*q[i]});return r}
let t=0,a=false;x.c.forEach(c=>{t+=c.r==='A'?1:cv(c);if(c.r==='A')a=true});
const pt=a&&t+10<=21?t+10:t,st=stand(pt),canHit=pt<21,hit=canHit?hitT(t,a):null;
let pb=0;if(canHit)ks.forEach(k=>{if(t+k>21)pb+=pc(k)});
const f=p=>(p*100).toFixed(1).replace('.',',')+'%',bar=r=>`<div class="pb"><i style="width:${r[0]*100}%;background:#5fd38d"></i><i style="width:${r[1]*100}%;background:#8e86a8"></i><i style="width:${r[2]*100}%;background:#e5645a"></i></div>`;
const row=r=>`<div class="pl"><span>Vitória <b>${f(r[0])}</b></span><span>Empate <b>${f(r[1])}</b></span><span>Derrota <b>${f(r[2])}</b></span></div>`;
const ok=hit&&ev(hit)>ev(st)?'h':'s';
return `<div class="pr"><div class="pt">📊 Sua chance de vitória${S.h.length>1?' (Mão '+(S.i+1)+')':''}</div><div class="pm">Parar agora${ok==='s'?' ✓':''}</div>${bar(st)}${row(st)}${hit?`<div class="pm">Pedir carta${ok==='h'?' ✓':''}</div>${bar(hit)}${row(hit)}<div class="pn">Chance de estourar na próxima carta: <b>${f(pb)}</b></div>`:''}<div class="pn">Estimativa com 6 baralhos + Coringa e as cartas visíveis. ✓ = jogada com melhor resultado médio.</div></div>`}
function render(){$('bal').textContent=fmt(W.bal);$('msg').textContent=S.msg;
const over=S.ph==='over',play=S.ph==='play';
$('dl').innerHTML=S.d.map((c,k)=>k===1&&!over?'<div class="c back"></div>':card(c)).join('');
$('dt').innerHTML=S.d.length?`<b>${over?sc(S.d):cv(S.d[0])===11?'11 / 1':cv(S.d[0])}</b>`:'';
$('hs').innerHTML=S.h.map((x,k)=>`<div class="hand ${play&&k===S.i?'act':''}"><div class="hd"><span>${S.h.length>1?'Mão '+(k+1):'Você'}: <b>${sc(x.c)}</b></span><span>Aposta: <b>${fmt(x.bet)}</b></span>${x.out?`<span class="tag ${x.k}">${x.out}</span>`:''}</div><div class="row">${x.c.map(card).join('')}</div></div>`).join('');
$('pr').innerHTML=S.ph==='play'?probHTML():'';
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
const V=['lobby','mines','bj','crash','roul','depv'];
function go(v){V.forEach(x=>q(x).hidden=x!==v);document.querySelector('.tabs').hidden=v==='depv';document.querySelectorAll('.tabs button').forEach(b=>b.setAttribute('aria-selected',b.dataset.v===v));refresh();window.scrollTo(0,0)}
function refresh(){q('bal').textContent=nf(W.bal);mUI();if(!q('bj').hidden)render();if(window.crashUI)crashUI();if(window.roulUI)roulUI()}
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
for(let i=10;i<=22;i++){const o=new Option(i+' ('+(25-i)+' bombas)',i);if(i===20)o.selected=true;nb.add(o)}
nb.onchange=()=>{const b=N-+nb.value;q('m-bn').textContent=b+' bombas escondidas · 1º clique paga '+fx(mult(1,b))+' · saque automático a partir de 100x'};
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
if(m.hits===N-m.nb)return out('Você achou todas as estrelas! ');if(mult(m.hits,m.nb)>=100)return out('Saque automático em 100x ou mais! ');
say(m.hits+(m.hits===1?' estrela':' estrelas')+'. Próximo clique: '+fx(mult(m.hits+1,m.nb))+'. Continue ou faça o cash out.');mUI()}
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
nb.onchange();build(false);go(/deposito/.test(location.search+location.hash)?'depv':'lobby');
})();

/* ---- bloco 4 ---- */
const mxe=id=>document.getElementById(id);
const mxf=(n,d)=>n.toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});
const mxm=m=>mxf(Math.max(m,1),2)+'x',mxpc=p=>mxf(p*100,p<.01?3:1)+'%';
function mxRows(s){const r=[];let c=1;for(let k=1;k<=s;k++){const p=(s-k+1)/(26-k);c*=p;r.push([k,p,c,.97/c])}return r}
function mxP(s){const b=25-s,r=mxRows(s),h=r.find(x=>x[2]<.5);let C=1;for(let i=1;i<=b;i++)C=C*(25-b+i)/i;
mxe('mxt').innerHTML=`<p>Com <b>${s}</b> ${s===1?'estrela':'estrelas'} e <b>${b}</b> ${b===1?'bomba':'bombas'}, a chance de perder já no 1º clique é <b>${mxpc(b/25)}</b>. A chance acumulada de sobreviver fica abaixo de 50% a partir do clique <b>${h[0]}</b> (${mxpc(h[2])}). Limpar todas as estrelas é 1 chance em <b>${Math.round(C).toLocaleString('pt-BR')}</b>.</p><div class="mxs"><table><tr><th>Clique</th><th>Chance neste clique</th><th>Chance acumulada</th><th>Multiplicador</th></tr>${r.map(x=>`<tr><td>${x[0]}</td><td>${mxpc(x[1])}</td><td>${mxpc(x[2])}</td><td>${mxm(x[3])}</td></tr>`).join('')}</table></div>`}
const MXR=`<h3>Objetivo</h3><p>Revelar o maior número de estrelas e fazer o cash out antes de clicar em uma bomba. Você decide quando parar.</p>
<h3>O tabuleiro</h3><p>Grade 5x5 com 25 quadrados ocultos. Cada um esconde uma ⭐ estrela ou uma 💣 bomba. Aqui você escolhe quantas estrelas ficam no tabuleiro (de 10 a 22, ou seja, de 3 a 15 bombas, para manter os multiplicadores equilibrados); os quadrados restantes são bombas. O saque é automático ao chegar em 100x ou mais, sem alterar a vantagem da casa.</p>
<h3>Rodada</h3><p>1) Defina a aposta (mínimo 10 fichas). 2) Escolha as estrelas. 3) Toque em <b>Começar rodada</b>. 4) Clique nos quadrados, um por vez. 5) Faça o <b>Cash out</b> quando quiser.</p>
<table><tr><th>Situação</th><th>Resultado</th></tr><tr><td>Achou uma estrela</td><td>O multiplicador sobe</td></tr><tr><td>Cash out</td><td>Você recebe aposta × multiplicador</td></tr><tr><td>Clicou em uma bomba</td><td>A rodada acaba e a aposta é perdida</td></tr><tr><td>Achou todas as estrelas</td><td>Cash out automático no multiplicador máximo</td></tr></table>
<h3>Sorteio</h3><p>As bombas são sorteadas quando a rodada começa. Todos os quadrados têm a mesma chance, então o canto vale o mesmo que o centro.</p>`;
function mxPT(){const cur=+mxe('m-nb').value||20;return `<h3>Chance e multiplicador no 1º clique</h3><div class="mxs"><table><tr><th>Bombas</th><th>Estrelas</th><th>Chance no 1º clique</th><th>Multiplicador</th></tr>${[3,5,8,10,12,15].map(b=>`<tr><td>${b}</td><td>${25-b}</td><td>${mxpc((25-b)/25)}</td><td>${mxm(.97*25/(25-b))}</td></tr>`).join('')}</table></div><p class="mxn">Multiplicadores desta demo, com margem da casa de 3% (RTP de 97%). Jogos de provedores reais, como a Spribe, usam valores parecidos, com pequenas diferenças.</p><h3>Rodada passo a passo</h3><label>Estrelas no tabuleiro <select id="mxs" onchange="mxP(+this.value)">${Array.from({length:13},(_,i)=>`<option${i+10===cur?' selected':''}>${i+10}</option>`).join('')}</select></label><div id="mxt"></div>`}
function mxMT(){const a=mxRows(22);return `<h3>Chance de acertar o próximo clique</h3><p>Chance = estrelas restantes ÷ quadrados restantes. Com 22 estrelas, o 1º clique tem 22/25 = ${mxpc(22/25)}; se acertou, o 2º tem 21/24 = ${mxpc(21/24)}, e assim por diante.</p>
<h3>Chance acumulada</h3><p>Para sobreviver a k cliques, multiplique a chance de cada clique: P = (s/25) × ((s−1)/24) × ((s−2)/23) × … Cada acerto deixa a próxima chance menor.</p>
<h3>Multiplicador</h3><p>Multiplicador justo = 1 ÷ P. Multiplicador pago = RTP ÷ P, com RTP de 97% nesta demo. Exemplo com 22 estrelas (3 bombas): 1º clique = 0,97 ÷ ${mxf(a[0][2],4)} = <b>${mxm(a[0][3])}</b>; 5º clique: chance acumulada de ${mxpc(a[4][2])} e multiplicador de <b>${mxm(a[4][3])}</b>.</p>
<h3>Valor esperado (EV)</h3><p>EV = P × (RTP ÷ P) − 1 = −3%. Em média, −3 fichas a cada 100 apostadas, <b>não importa em que clique você saca</b>. O momento do saque muda a sorte, não a média.</p>
<h3>Sacar cedo × sacar tarde</h3><p>Sacar no 1º clique (3 bombas) ganha ${mxpc(a[0][2])} das vezes, pagando pouco. Sacar no 5º ganha só ${mxpc(a[4][2])} das vezes, mas paga ${mxm(a[4][3])}. Mesma média, variância bem diferente.</p>
<h3>Mais bombas</h3><p>Mais bombas significam multiplicadores maiores e chance de sobreviver menor. Com 15 bombas (10 estrelas), o 1º clique paga ${mxm(.97*25/10)} com 40% de chance.</p>
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

/* ---- bloco 7 ---- */
(()=>{
const g=id=>document.getElementById(id),K=.065,nf=n=>n.toLocaleString('pt-BR',{maximumFractionDigits:2}),mf=m=>m.toFixed(2).replace('.',',')+'x',rd=n=>Math.round(n*100)/100,pc=p=>(p*100).toFixed(2).replace('.',',')+'%';
const cv=g('crcv'),cx=cv.getContext('2d'),stars=Array.from({length:70},()=>[Math.random(),Math.random(),Math.random()*1.6+.4]);
const gen=()=>{const u=Math.random()||1e-9;return Math.min(Math.max(Math.floor(97/u)/100,1),10000)};
let ph='wait',st=performance.now()+5000,cp=gen(),m=1,bet=null,nxt=null,hist=[],auto=false,lim=false,rem=0,tab='m',note='',last=performance.now();
function place(){const a=rd(+g('crb').value),au=+g('cra').value||0;
if(!(a>=10)){note='A aposta mínima é 10 fichas.';return false}
if(a>W.bal){note='Saldo insuficiente. Adicione fichas ou diminua a aposta.';return false}
if(au&&au<1.01){note='A retirada automática precisa ser de pelo menos 1,01x.';return false}
W.bal=rd(W.bal-a);W.save();nxt={amt:a,au};note='Aposta de '+nf(a)+' fichas feita para a próxima rodada.';fabRefresh();return true}
function cancel(){if(!nxt)return;W.bal=rd(W.bal+nxt.amt);W.save();nxt=null;note='Aposta cancelada e devolvida.';fabRefresh()}
function cash(x){if(!bet||bet.done||ph!=='run')return;const mm=Math.floor(Math.min(x,m)*100)/100,p=rd(bet.amt*mm);W.bal=rd(W.bal+p);W.save();bet.done=true;bet.res=mm;
note='Cash out em '+mf(mm)+': '+(p>=bet.amt?'+':'')+nf(rd(p-bet.amt))+' fichas.';fabRefresh()}
function autoQ(){if(!auto||nxt)return;if(lim&&rem<=0){auto=false;note='Auto concluído.';return}
if(!place()){auto=false;note+=' Auto parado.';return}if(lim)rem--}
function tick(){const now=performance.now();if(now-last>1500)st+=now-last-50;last=now;
if(ph==='wait'&&now>=st){ph='run';st=now;m=1;if(nxt){bet={amt:nxt.amt,au:nxt.au,done:false,res:0};nxt=null;note=''}}
else if(ph==='run'){m=Math.exp(K*(now-st)/1000);
if(bet&&!bet.done&&bet.au&&bet.au<=Math.min(m,cp))cash(bet.au);
if(m>=cp){m=cp;ph='crash';st=now;hist.unshift(cp);if(hist.length>12)hist.pop();
if(bet&&!bet.done){bet.done=true;bet.res=0;note='Crashou em '+mf(cp)+'. Você perdeu '+nf(bet.amt)+' fichas.'}ui()}else btn()}
else if(ph==='crash'&&now-st>2500){ph='wait';st=now+4500;cp=gen();m=1;bet=null;autoQ();ui()}}
function btn(){const b=g('crgo');let t,c='crgo';
if(tab==='a')t=auto?'Parar auto'+(lim?' ('+rem+')':''):'Iniciar auto';
else if(nxt){t='Cancelar aposta ('+nf(nxt.amt)+')';c+=' cancel'}
else if(bet&&!bet.done&&ph==='run'){t='Cash out · '+nf(rd(bet.amt*Math.floor(m*100)/100))+' fichas';c+=' cash'}
else t='Apostar (próxima rodada)';
if(tab==='a'&&auto)c+=' cancel';b.textContent=t;b.className=c}
function ui(){btn();g('crmsg').textContent=note;
g('crh').innerHTML=hist.map(x=>`<span class="${x>=10?'y':x>=2?'g':''}">${mf(x)}</span>`).join('')||'<span>Sem histórico</span>';
const nm=(window.fabProfile&&fabProfile.data().name)||'Você',a=bet||nxt;
g('crpn').textContent=a?1:0;g('crpa').textContent=a?nf(a.amt):'0';
g('crpl').innerHTML=a?`<div class="crpr"><span>${nm.replace(/[<>&]/g,'')}</span><span style="color:${bet&&bet.done?(bet.res?'#5fd38d':'#e5645a'):'var(--soft)'}">${bet&&bet.done?(bet.res?mf(bet.res):'crash'):nxt?'próxima':'jogando'}</span><span>🪙 ${nf(a.amt)}</span></div>`:'<div class="crpr"><span style="color:var(--soft)">Nenhuma aposta nesta rodada</span></div>'}
g('crgo').onclick=()=>{
if(tab==='a'){if(auto){auto=false;cancel();note='Auto parado.'}else{auto=true;lim=(+g('crn').value||0)>0;rem=lim?Math.floor(+g('crn').value):0;note='';autoQ()}}
else if(nxt)cancel();else if(bet&&!bet.done&&ph==='run')cash(m);else place();ui()};
document.querySelectorAll('[data-cb]').forEach(b=>b.onclick=()=>{const i=g('crb'),v=+i.value||0,mx=Math.max(10,Math.floor(W.bal));i.value=b.dataset.cb==='half'?Math.max(10,rd(v/2)):b.dataset.cb==='dbl'?Math.min(rd(v*2),mx):mx});
document.querySelectorAll('[data-ca]').forEach(b=>b.onclick=()=>{const i=g('cra'),v=+i.value||2;i.value=(b.dataset.ca==='half'?Math.max(1.01,v/2):+b.dataset.ca).toFixed(2)});
function setTab(t){tab=t;g('crtm').classList.toggle('on',t==='m');g('crta').classList.toggle('on',t==='a');g('crnw').hidden=t!=='a';btn()}
g('crtm').onclick=()=>setTab('m');g('crta').onclick=()=>setTab('a');
function draw(){const d=devicePixelRatio||1,w=cv.clientWidth,h=cv.clientHeight;if(!w)return;
if(cv.width!==Math.round(w*d)||cv.height!==Math.round(h*d)){cv.width=Math.round(w*d);cv.height=Math.round(h*d)}
cx.setTransform(d,0,0,d,0,0);cx.clearRect(0,0,w,h);
stars.forEach(([x,y,r])=>{cx.fillStyle='rgba(180,160,255,.35)';cx.beginPath();cx.arc(x*w,y*h,r,0,6.3);cx.fill()});
const pl=36,pr=58,pt=24,pb=28,t=ph==='wait'?0:Math.log(m)/K,tmax=Math.max(12,t*1.12),ymax=Math.max(2.6,m*1.18);
const X=s=>pl+s/tmax*(w-pl-pr),Y=v=>h-pb-(v-1)/(ymax-1)*(h-pt-pb);
cx.font='12px Figtree,sans-serif';cx.textAlign='left';cx.fillStyle='#9a90bd';cx.strokeStyle='rgba(255,255,255,.07)';cx.lineWidth=1;
const sp=[.2,.5,1,2,5,10,20,50,100,200,500,1000,2000,5000].find(s=>(ymax-1)/s<=8)||10000;
for(let v=1+sp;v<ymax;v+=sp){cx.beginPath();cx.moveTo(pl,Y(v));cx.lineTo(w-pr,Y(v));cx.stroke();cx.fillText(v.toFixed(sp<1?1:0).replace('.',',')+'x',w-pr+8,Y(v)+4)}
const xs=[1,2,5,10,20,50,100].find(s=>tmax/s<=7)||200;cx.textAlign='center';for(let s=xs;s<tmax;s+=xs)cx.fillText(s+'s',X(s),h-8);
if(ph!=='wait'){cx.strokeStyle=ph==='crash'?'#e5645a':'#f5c242';cx.lineWidth=3.5;cx.lineJoin='round';cx.beginPath();
for(let i=0;i<=80;i++){const s=t*i/80,px=X(s),py=Y(Math.exp(K*s));i?cx.lineTo(px,py):cx.moveTo(px,py)}cx.stroke()}
cx.font='34px serif';cx.textAlign='center';cx.fillText(ph==='crash'?'💥':'🚀',X(t)-4,Y(ph==='wait'?1:m)+8);
cx.textAlign='left';
if(ph==='wait'){cx.fillStyle='#fff';cx.font='700 26px Figtree,sans-serif';cx.fillText('Próxima rodada em '+Math.max(0,Math.ceil((st-performance.now())/1000))+'s',pl+10,h*.42)}
else{cx.fillStyle=ph==='crash'?'#e5645a':'#f5c242';cx.font='800 '+Math.min(64,w/8)+'px "Bricolage Grotesque",sans-serif';cx.fillText(mf(m),pl+10,h*.42);
if(ph==='crash'){cx.font='600 18px Figtree,sans-serif';cx.fillText('Crashou!',pl+12,h*.42+28)}}}
(function loop(){if(!g('crash').hidden)draw();requestAnimationFrame(loop)})();
setInterval(tick,50);
const bar=k=>`<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px">${[['r','📜 Regras'],['p','🎲 Probabilidades'],['m','🧮 Matemática']].map(([a,b])=>`<button type="button" class="sbtn${a===k?'':' alt'}" onclick="cxTab('${a}')">${b}</button>`).join('')}<button type="button" class="sbtn alt" style="margin-left:auto" onclick="cxClose()" aria-label="Fechar">✕</button></div>`;
const CT={
r:()=>`<h4>Como funciona</h4><p>Um multiplicador começa em 1,00x e sobe enquanto o foguete voa. A rodada termina de repente (o "crash") em um ponto aleatório. Se você fizer o <b>cash out</b> antes, recebe a aposta × o multiplicador daquele instante. Se o crash vier antes, a aposta é perdida.</p><h4>Passo a passo</h4><p>1) Defina a aposta (mínimo 10 fichas). 2) Opcional: defina a <b>retirada automática</b>, que faz o cash out sozinho ao chegar no valor. 3) Toque em <b>Apostar</b>: ela vale para a próxima rodada. 4) Durante o voo, toque em <b>Cash out</b> para garantir o ganho.</p><h4>Aba Auto</h4><p>Repete a aposta e a retirada automática a cada rodada, pelo número de rodadas escolhido (0 = até você parar ou faltar saldo).</p><h4>Sorteio</h4><p>Nesta demo o ponto do crash é sorteado pelo navegador, sem sistema "Provably Fair". Jogos com esse sistema permitem verificar como o resultado foi gerado, mas isso não permite prever a próxima rodada.</p>`,
p:()=>`<h4>Chance de o multiplicador alcançar x</h4><table><tr><th>Multiplicador</th><th>Chance aproximada</th></tr>${[1.5,2,3,5,10,100].map(x=>`<tr><td>${mf(x)}</td><td>${pc(.97/x)}</td></tr>`).join('')}</table><h4>Calcule você mesmo</h4><label>Multiplicador <input id="cxi" type="number" min="1.01" step="0.01" value="2" oninput="cxc()" style="width:110px"></label><p id="cxo"></p><h4>Outros números</h4><p>Chance de crashar já em 1,00x: <b>cerca de 4%</b>. A metade das rodadas passa de cerca de <b>1,94x</b> (a mediana). Quanto maior o alvo, menor a chance: chegar a 10x acontece em ~1 de cada 10 rodadas.</p><p class="cn">São probabilidades teóricas, não garantias sobre uma sequência de rodadas.</p>`,
m:()=>`<h4>Fórmula</h4><p>Com retorno teórico de 97%: <b>P(X ≥ x) = 0,97 ÷ x</b>. O ponto do crash pode ser gerado por C = 0,97 ÷ U, com U sorteado entre 0 e 1. Se C &lt; 1, a rodada crasha em 1,00x (chance de 3%).</p><h4>Valor esperado (EV)</h4><p>Se você sacar sempre em x: ganha x com chance 0,97÷x, então EV = x × 0,97÷x − 1 = <b>−3%</b>. Qualquer alvo tem a mesma média; muda só a variância (alvo baixo = vitórias frequentes e pequenas; alvo alto = vitórias raras e grandes).</p><h4>Vantagem da casa</h4><p>É a parcela da expectativa que favorece o operador no longo prazo: aqui, 3 fichas a cada 100 apostadas, em média. Em poucas rodadas, os resultados variam muito.</p><h4>Independência</h4><p>Vários resultados baixos seguidos não indicam um alto "atrasado". Cada rodada é independente: o histórico não prevê a próxima.</p><h4>Tempo de voo</h4><p>O multiplicador cresce de forma exponencial: m(t) = e<sup>0,065·t</sup>. Chegar a 2x leva cerca de 10,7 s, e a 10x cerca de 35,4 s.</p>`};
window.cxc=()=>{const v=Math.max(1.01,+g('cxi').value||2);g('cxo').innerHTML=`Chance de chegar a <b>${mf(v)}</b>: <b>${pc(Math.min(1,.97/v))}</b>. A cada 100 rodadas, cerca de ${(97/v).toFixed(1).replace('.',',')} chegam lá.`};
window.cxTab=k=>{g('crmb').innerHTML=bar(k)+CT[k]();if(k==='p')cxc()};
window.cxOpen=()=>{cxTab('r');g('crmd').classList.add('on')};window.cxClose=()=>g('crmd').classList.remove('on');
g('crmd').onclick=e=>{if(e.target===g('crmd'))cxClose()};addEventListener('keydown',e=>{if(e.key==='Escape')cxClose()});
window.crashUI=ui;ui();
})();

/* ---- bloco 8 ---- */
(()=>{
const g=id=>document.getElementById(id),nf=n=>n.toLocaleString('pt-BR',{maximumFractionDigits:2}),rd=n=>Math.round(n*100)/100,pc=p=>(p*100).toFixed(2).replace('.',',')+'%';
const RED=new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);
const ORD={us:[0,28,9,26,30,11,7,20,32,17,5,22,34,15,3,24,36,13,1,'00',27,10,25,29,12,8,19,31,18,6,21,33,16,4,23,35,14,2],eu:[0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26]};
const colr=n=>n===0||n==='00'?'g':RED.has(n)?'r':'b',CN={g:'verde',r:'vermelho',b:'preto'};
const wins=(k,n)=>{if(k[0]==='n')return k==='n:'+n;if(n===0||n==='00')return false;
switch(k){case'red':return RED.has(n);case'black':return !RED.has(n);case'odd':return n%2===1;case'even':return n%2===0;case'low':return n<=18;case'high':return n>=19;
case'd1':return n<=12;case'd2':return n>12&&n<=24;case'd3':return n>24;case'c1':return n%3===1;case'c2':return n%3===2;case'c3':return n%3===0}return false};
const pay=k=>k[0]==='n'?35:k[0]==='d'||k[0]==='c'?2:1;
const cv=g('rlcv'),cx=cv.getContext('2d');
let V='us',ord=ORD.us,rot=0,spin=null,bets={},stack=[],last=null,chip=10,hist=[],res=null,note='';
const tot=()=>Object.values(bets).reduce((a,b)=>a+b,0);
function build(){const T=g('rtb');T.innerHTML='';
const add=(key,label,cls,c1,c2,r1,r2)=>{const b=document.createElement('button');b.type='button';b.className='rc '+cls;b.dataset.k=key;b.style.gridColumn=c1+'/'+c2;b.style.gridRow=r1+'/'+r2;b.setAttribute('aria-label','Apostar em '+label);b.innerHTML='<span>'+label+'</span><b class="rb"></b>';T.appendChild(b)};
if(V==='us'){add('n:0','0','g',1,2,1,4);add('n:00','00','g',1,2,4,7)}else add('n:0','0','g',1,2,1,7);
for(let n=1;n<=36;n++){const c=2+Math.floor((n-1)/3),r=n%3===0?1:n%3===2?3:5;add('n:'+n,n,colr(n),c,c+1,r,r+2)}
[['c3',1],['c2',3],['c1',5]].forEach(([k,r])=>add(k,'2:1','',14,15,r,r+2));
[['d1','1ª dúzia'],['d2','2ª dúzia'],['d3','3ª dúzia']].forEach(([k,l],i)=>add(k,l,'',2+i*4,6+i*4,7,8));
[['low','1-18'],['even','Par'],['red','Vermelho'],['black','Preto'],['odd','Ímpar'],['high','19-36']].forEach(([k,l],i)=>add(k,l,k==='red'?'r':k==='black'?'b':'',2+i*2,4+i*2,8,9))}
function put(k,a){if(spin)return;if(a>W.bal){note='Saldo insuficiente. Adicione fichas ou use uma ficha menor.';ui();return}
W.bal=rd(W.bal-a);W.save();bets[k]=(bets[k]||0)+a;stack.push([k,a]);note='';fabRefresh()}
function undo(){if(spin||!stack.length)return;const[k,a]=stack.pop();bets[k]-=a;if(!bets[k])delete bets[k];W.bal=rd(W.bal+a);W.save();note='';fabRefresh()}
function clear(){if(spin||!tot())return;W.bal=rd(W.bal+tot());W.save();bets={};stack=[];note='';fabRefresh()}
function repeat(){if(spin||tot()||!last)return;const t=Object.values(last).reduce((a,b)=>a+b,0);if(t>W.bal){note='Saldo insuficiente para repetir a última aposta.';ui();return}
W.bal=rd(W.bal-t);W.save();bets={...last};stack=Object.entries(last);note='';fabRefresh()}
function go(){if(spin)return;if(!tot()){note='Faça uma aposta clicando nos números ou nas opções da mesa.';ui();return}
const N=ord.length,k=Math.floor(Math.random()*N),st=2*Math.PI/N,end0=-k*st,two=2*Math.PI;
const r1=Math.ceil((rot+6*two-end0)/two)*two+end0;spin={t0:performance.now(),dur:5200,r0:rot,r1,k,n:ord[k]};note='Girando...';ui()}
function settle(){const n=spin.n;let net=0,ret=0;const b=bets;
for(const k in b){if(wins(k,n)){ret+=b[k]*(pay(k)+1)}net-=b[k]}net+=ret;
W.bal=rd(W.bal+ret);W.save();last={...b};bets={};stack=[];rot=spin.r1%(2*Math.PI);hist.unshift(n);if(hist.length>14)hist.pop();res=n;spin=null;
const typ=typeof n==='number'&&n>0?', '+(n%2?'ímpar':'par'):'';
note='Saiu '+n+' ('+CN[colr(n)]+typ+'). '+(net>0?'Você ganhou +'+nf(rd(net))+' fichas! 🎉':net<0?'Você perdeu '+nf(rd(-net))+' fichas.':'Resultado empatado.');
fabRefresh()}
setInterval(()=>{if(spin&&performance.now()-spin.t0>=spin.dur)settle()},50);
function ui(){const T=tot(),on=!!spin;
document.querySelectorAll('#rtb .rc').forEach(c=>{const a=bets[c.dataset.k],bd=c.querySelector('.rb');bd.textContent=a?nf(a):'';bd.classList.toggle('on',!!a);c.classList.toggle('win',!on&&res!==null&&c.dataset.k==='n:'+res)});
g('rlgo').disabled=on;g('rlgo').textContent=on?'Girando...':T?'Girar a roleta · '+nf(T)+' fichas':'Girar a roleta';
g('rlv').disabled=on;g('rlmsg').textContent=note;
g('rlh').innerHTML=hist.map(x=>`<span class="${colr(x)}">${x}</span>`).join('')||'<span>Sem histórico</span>';
let s='Clique na mesa para apostar. Cada ficha custa '+chip+'.';
if(T){const N=ord.length;let pr=0,eq=0,sum=0;ord.forEach(n=>{let net=0;for(const k in bets)net+=wins(k,n)?bets[k]*pay(k):-bets[k];if(net>0)pr++;else if(net===0)eq++;sum+=net});
s='Total apostado: <b>'+nf(T)+'</b><br>Casas que dão lucro: <b>'+pr+' de '+N+'</b> ('+pc(pr/N)+')'+(eq?'<br>Casas que empatam: '+eq:'')+'<br>Perda média esperada: <b>'+nf(rd(-sum/N))+' fichas</b> ('+pc(-sum/N/T)+' do apostado)'}
g('rls').innerHTML=s;
document.querySelectorAll('.rlc').forEach(b=>b.classList.toggle('on',+b.dataset.v===chip))}
g('rtb').onclick=e=>{const c=e.target.closest('.rc');if(c)put(c.dataset.k,chip)};
[10,25,100,500].forEach(v=>{const b=document.createElement('button');b.type='button';b.className='rlc c'+v;b.dataset.v=v;b.textContent=v;b.setAttribute('aria-label','Ficha de '+v);b.onclick=()=>{chip=v;ui()};g('rlch').appendChild(b)});
g('rlu').onclick=undo;g('rlcl').onclick=clear;g('rlre').onclick=repeat;g('rlgo').onclick=go;
g('rlv').onchange=function(){if(spin||tot()){this.value=V;note='Limpe as apostas antes de trocar o tipo de roleta.';ui();return}
V=this.value;ord=ORD[V];hist=[];res=null;rot=0;note='';build();ui()};
function draw(){const w=cv.clientWidth,d=devicePixelRatio||1;if(!w)return;if(cv.width!==Math.round(w*d)){cv.width=cv.height=Math.round(w*d)}
cx.setTransform(d,0,0,d,0,0);cx.clearRect(0,0,w,w);const c=w/2,R=w/2-3,N=ord.length,st=2*Math.PI/N;let e=1;
if(spin){const p=Math.min(1,(performance.now()-spin.t0)/spin.dur);e=1-Math.pow(1-p,3);rot=spin.r0+(spin.r1-spin.r0)*e}
const arc=(r,a0,a1)=>cx.arc(c,c,r,a0,a1);
cx.fillStyle='#d9a93a';cx.beginPath();arc(R,0,7);cx.fill();cx.fillStyle='#6b3d17';cx.beginPath();arc(R*.975,0,7);cx.fill();
for(let i=0;i<N;i++){const a0=rot+i*st-Math.PI/2-st/2,a1=a0+st,k=colr(ord[i]);
cx.fillStyle=k==='g'?'#12804f':k==='r'?'#c8261c':'#1b1b1b';cx.beginPath();arc(R*.95,a0,a1);arc(R*.72,a1,a0,true);cx.closePath();cx.fill();
cx.strokeStyle='#d9a93a';cx.lineWidth=1;cx.stroke();
cx.fillStyle=k==='g'?'#0d6b41':k==='r'?'#a31d15':'#2a2a2a';cx.beginPath();arc(R*.72,a0,a1);arc(R*.58,a1,a0,true);cx.closePath();cx.fill();cx.stroke();
cx.save();cx.translate(c,c);cx.rotate(a0+st/2);cx.fillStyle='#fff';cx.font='700 '+Math.max(9,w*.04)+'px Figtree,sans-serif';cx.textAlign='center';cx.textBaseline='middle';
cx.translate(R*.835,0);cx.rotate(Math.PI/2);cx.fillText(String(ord[i]),0,0);cx.restore()}
cx.fillStyle='#8a5a2b';cx.beginPath();arc(R*.58,0,7);cx.fill();cx.strokeStyle='#d9a93a';cx.lineWidth=2;cx.stroke();
cx.fillStyle='#d9a93a';cx.beginPath();arc(R*.09,0,7);cx.fill();
if(res!==null&&!spin){const k=colr(res);cx.fillStyle=k==='g'?'#12804f':k==='r'?'#c8261c':'#1b1b1b';cx.beginPath();arc(R*.3,0,7);cx.fill();cx.strokeStyle='#d9a93a';cx.lineWidth=3;cx.stroke();
cx.fillStyle='#fff';cx.font='800 '+w*.1+'px "Bricolage Grotesque",sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.fillText(String(res),c,c+2)}
const bs=spin?-(1-e)*(2*Math.PI*8):0,br=R*(.66+.22*Math.pow(1-e,2)),ba=-Math.PI/2+bs;
if(spin||res!==null){cx.fillStyle='#fff';cx.beginPath();cx.arc(c+Math.cos(ba)*br,c+Math.sin(ba)*br,Math.max(4,R*.035),0,7);cx.fill()}
cx.fillStyle='#f5c242';cx.beginPath();cx.moveTo(c-9,2);cx.lineTo(c+9,2);cx.lineTo(c,20);cx.closePath();cx.fill()}
(function loop(){if(!g('roul').hidden)draw();requestAnimationFrame(loop)})();
const bar=k=>`<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:6px">${[['r','📜 Regras'],['p','🎲 Probabilidades'],['m','🧮 Matemática']].map(([a,b])=>`<button type="button" class="sbtn${a===k?'':' alt'}" onclick="rxTab('${a}')">${b}</button>`).join('')}<button type="button" class="sbtn alt" style="margin-left:auto" onclick="rxClose()" aria-label="Fechar">✕</button></div>`;
const RT={
r:()=>`<h4>A rodada</h4><p>A cada rodada, a bola cai em uma das casas e o resultado define quais apostas vencem. As casas de 1 a 36 se dividem em 18 vermelhas e 18 pretas, pares e ímpares, 1 a 18 e 19 a 36. O <b>zero (verde)</b> não pertence a nenhuma dessas categorias: nele, essas apostas perdem.</p><p>Europeia: 37 casas (0 a 36). Americana: 38 casas (0, 00 e 1 a 36), como na roda da tela.</p><h4>Apostas e pagamentos (lucro)</h4><table><tr><th>Aposta</th><th>Números</th><th>Paga</th></tr><tr><td>Número específico</td><td>1</td><td>35 para 1</td></tr><tr><td>Dois números adjacentes</td><td>2</td><td>17 para 1</td></tr><tr><td>Três números</td><td>3</td><td>11 para 1</td></tr><tr><td>Quatro números</td><td>4</td><td>8 para 1</td></tr><tr><td>Seis números</td><td>6</td><td>5 para 1</td></tr><tr><td>Dúzia ou coluna</td><td>12</td><td>2 para 1</td></tr><tr><td>Vermelho/preto, par/ímpar, 1-18/19-36</td><td>18</td><td>1 para 1</td></tr></table><p class="cn">O lucro não conta a devolução da ficha apostada. Nesta versão você pode apostar em número (inclusive 0 e 00), dúzia, coluna, cor, par/ímpar e 1-18 / 19-36. A aposta mínima é 10 fichas por ficha colocada.</p><h4>Como jogar</h4><p>Escolha a ficha, clique na mesa para apostar (clique de novo para somar) e toque em <b>Girar a roleta</b>. Use Desfazer, Limpar ou Repetir para ajustar.</p>`,
p:()=>`<h4>Chance de cada resultado</h4><table><tr><th>Resultado</th><th>Europeia (37)</th><th>Americana (38)</th></tr><tr><td>Um número específico</td><td>${pc(1/37)}</td><td>${pc(1/38)}</td></tr>${['Vermelho','Preto','Par','Ímpar','1 a 18 ou 19 a 36'].map(x=>`<tr><td>${x}</td><td>${pc(18/37)}</td><td>${pc(18/38)}</td></tr>`).join('')}<tr><td>Dúzia ou coluna</td><td>${pc(12/37)}</td><td>${pc(12/38)}</td></tr><tr><td>Zero (0 e 00)</td><td>${pc(1/37)} (só o 0)</td><td>${pc(2/38)} (0 e 00)</td></tr></table><p class="cn">Vermelho e preto não têm 50%: o zero (e o 00 na americana) reduz essas chances.</p><h4>Calculadora</h4><label>Quantos números a aposta cobre? <input id="rxk" type="number" min="1" max="36" step="1" value="18" oninput="rxc()" style="width:80px"></label><p id="rxo"></p><label>Vermelho quantas vezes seguidas? <input id="rxn" type="number" min="1" max="30" step="1" value="5" oninput="rxc()" style="width:80px"></label><p id="rxs"></p>`,
m:()=>`<h4>Probabilidade</h4><p>P(A) = resultados favoráveis ÷ resultados possíveis. Um número na europeia: 1/37 ≈ 2,70%. Vermelho: 18/37 ≈ 48,65%.</p><h4>Valor esperado</h4><p>E = P(ganho)·G + P(perda)·L. Vermelho/preto na europeia: 18/37·(+1) + 19/37·(−1) = <b>−1/37 ≈ −2,70%</b>. Na americana: 18/38·(+1) + 20/38·(−1) = <b>−2/38 ≈ −5,26%</b>.</p><h4>Por que cobrir mais números não elimina a vantagem?</h4><p>Cobrir k números muda a chance (k/N) e o pagamento (36/k − 1), mas o valor esperado continua o mesmo: <b>36/N − 1</b> por ficha, qualquer que seja a aposta. Ganhar com mais frequência não é o mesmo que ter lucro em uma sequência de rodadas.</p><h4>Sequências e independência</h4><p>Cada rodada é independente: a chance de vermelho continua 18/37 (europeia) ou 18/38 (americana) não importa o que saiu antes. Vermelho 5 vezes seguidas: (18/37)⁵ ≈ ${pc(Math.pow(18/37,5))} na europeia e (18/38)⁵ ≈ ${pc(Math.pow(18/38,5))} na americana. Uma sequência rara pode acontecer, e isso não indica que a cor oposta esteja "atrasada".</p><h4>Resumo</h4><p><b>Probabilidade</b> mede a chance. <b>Valor esperado</b> é o resultado médio teórico. <b>Independência</b>: rodadas não têm memória. <b>Vantagem da casa</b>: a estrutura de pagamentos favorece o cassino no longo prazo. Nenhum sistema garante o resultado de uma rodada aleatória.</p>`};
window.rxc=()=>{const k=Math.min(36,Math.max(1,Math.round(+g('rxk').value)||1)),n=Math.min(30,Math.max(1,Math.round(+g('rxn').value)||1));
g('rxo').innerHTML=`Cobrindo <b>${k}</b>: chance ${pc(k/37)} (europeia) · ${pc(k/38)} (americana). Paga ${nf(rd(36/k-1))} para 1. Valor esperado: ${pc(36/37-1)} (europeia) · ${pc(36/38-1)} (americana).`;
g('rxs').innerHTML=`Vermelho ${n}x seguidas: ${pc(Math.pow(18/37,n))} (europeia) · ${pc(Math.pow(18/38,n))} (americana).`};
window.rxTab=k=>{g('rlmb').innerHTML=bar(k)+RT[k]();if(k==='p')rxc()};
window.rxOpen=()=>{rxTab('r');g('rlmd').classList.add('on')};window.rxClose=()=>g('rlmd').classList.remove('on');
g('rlmd').onclick=e=>{if(e.target===g('rlmd'))rxClose()};addEventListener('keydown',e=>{if(e.key==='Escape')rxClose()});
window.roulUI=ui;build();ui();
})();