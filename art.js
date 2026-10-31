(function(){
'use strict';
var art=document.querySelector('.hero-art');if(!art)return;
var $=function(id){return document.getElementById(id)},root=document.documentElement,msg=$('artMsg'),KEY='voqen-art2';
var C=[['Ink',null,null],['Clay','#A94A33','#E07B5F'],['Moss','#3F5E4A','#7FB08F'],['Indigo','#2E3A8C','#8C9BFF'],['Ochre','#8A6320','#D9A441']];
var MONO='ui-monospace,SFMono-Regular,Menlo,Consolas,monospace';
var T=[['Serif','italic 400 1.5rem/1 var(--serif)','italic 400 1.05rem/1.05 var(--serif)','"Instrument Serif", Georgia, serif','italic 400 1em/1 var(--serif)'],
       ['Sans','600 1.3rem/1 var(--sans)','600 .88rem/1.1 var(--sans)','Inter, system-ui, sans-serif','700 1em/1 var(--sans)'],
       ['Mono','500 1.15rem/1 '+MONO,'500 .78rem/1.15 '+MONO,'ui-monospace, Menlo, monospace','500 1em/1 '+MONO]];
var ci=0,ti=0,picked=false,brand='',vx=0,vy=0,vs=1,drag=null,rs=null;
var sw=[].slice.call(document.querySelectorAll('.asw')),typeBtn=$('artType'),nameIn=$('artName'),head=$('artHead'),mono=$('artMono'),tag=$('artTag'),contr=$('artContrast'),frame=$('artFrame'),V=$('artV');
function lite(){return root.classList.contains('lite')}
function dark(){return root.dataset.theme==='dark'}
function hex(i){return C[i][dark()?2:1]}
function say(t){if(msg)msg.textContent=t}
function lum(h){var c=[1,3,5].map(function(i){var v=parseInt(h.substr(i,2),16)/255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*c[0]+.7152*c[1]+.0722*c[2]}
function ratio(a,b){var A=lum(a),B=lum(b);return (Math.max(A,B)+.05)/(Math.min(A,B)+.05)}
function save(){try{localStorage.setItem(KEY,JSON.stringify({c:ci,t:ti,u:picked,n:brand}))}catch(e){}}
function paint(announce){
 var h=hex(ci);
 if(h)art.style.setProperty('--ac',h);else art.style.removeProperty('--ac');
 art.style.setProperty('--aa',T[ti][1]);art.style.setProperty('--ah',T[ti][2]);art.style.setProperty('--am',T[ti][4]);
 sw.forEach(function(b,i){b.setAttribute('aria-pressed',i===ci)});
 typeBtn.setAttribute('aria-label','Typeface: '+T[ti][0]+'. Press to change');var tn=$('artTypeName');if(tn)tn.textContent=T[ti][0];
 var fg=h||(dark()?'#F2F0EB':'#151515'),r=ratio(fg,dark()?'#1a1a19':'#ffffff');
 if(contr){contr.textContent=(r>=7?'AAA':r>=4.5?'AA':r>=3?'AA large':'Low')+' \u00b7 '+r.toFixed(1)}
 if(announce)say('Colour '+C[ci][0]+', typeface '+T[ti][0]);
 save()}
function used(){art.classList.add('used')}
function hashIdx(s){var h=0;for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return 1+(h%(C.length-1))}
function applyName(auto){
 var n=nameIn.value.replace(/\s+/g,' ').trim();brand=n;
 if(n){var ch=Array.from(n)[0].toUpperCase();head.textContent=n+'.';mono.textContent=ch;mono.hidden=false;frame.classList.add('has-name');tag.textContent=ch+' \u00b7 Monogram';
  if(!picked){ci=hashIdx(n.toLowerCase())}}
 else{head.textContent='Your brand, here.';mono.hidden=true;frame.classList.remove('has-name');tag.textContent='V \u00b7 Wordmark';if(!picked)ci=0}
 paint(false);if(!auto&&n)say('Previewing '+n)}
nameIn.addEventListener('input',function(){used();applyName(false)});
sw.forEach(function(b,i){b.addEventListener('click',function(){ci=i;picked=true;used();paint(true)})});
typeBtn.addEventListener('click',function(){ti=(ti+1)%T.length;used();paint(true)});
function shuffle(){var c,t;do{c=Math.floor(Math.random()*C.length);t=Math.floor(Math.random()*T.length)}while(c===ci&&t===ti);ci=c;ti=t;picked=true;used();paint(true);
 if(frame.animate&&!lite())frame.animate([{scale:1},{scale:1.05},{scale:1}],{duration:420,easing:'cubic-bezier(.2,.7,.2,1)'})}
$('artShuffle').addEventListener('click',shuffle);
function css(){var v=hex(ci)||(dark()?'#F2F0EB':'#151515');return (brand?'/* '+brand+' */\n':'')+':root{\n  --accent: '+v+';\n  --font-display: '+T[ti][3]+';\n}'}
function legacy(t){var x=document.createElement('textarea');x.value=t;x.setAttribute('readonly','');x.className='sr';document.body.appendChild(x);x.select();var ok=false;try{ok=document.execCommand('copy')}catch(e){}document.body.removeChild(x);return ok}
$('artCopy').addEventListener('click',function(){
 var t=css(),b=this;function done(ok){say(ok?'Styles copied as CSS':'Could not copy');if(ok){b.classList.add('ok');setTimeout(function(){b.classList.remove('ok')},1800)}}
 if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(function(){done(true)},function(){done(legacy(t))});else done(legacy(t))});
/* move + resize the wordmark like a design tool */
function clampV(){var r=frame.getBoundingClientRect(),lx=r.width*.3,ly=r.height*.3;vx=Math.max(-lx,Math.min(lx,vx));vy=Math.max(-ly,Math.min(ly,vy));vs=Math.max(.5,Math.min(1.5,vs))}
function vapply(){clampV();V.style.setProperty('--vx',vx.toFixed(1)+'px');V.style.setProperty('--vy',vy.toFixed(1)+'px');V.style.setProperty('--vs',vs.toFixed(3))}
function reset(){vx=0;vy=0;vs=1;vapply()}
V.addEventListener('pointerdown',function(e){if(e.pointerType==='touch'||e.button!==0)return;e.preventDefault();used();try{V.setPointerCapture(e.pointerId)}catch(x){}drag={sx:e.clientX,sy:e.clientY,ox:vx,oy:vy};frame.classList.add('drag');frame.focus({preventScroll:true})});
V.addEventListener('pointermove',function(e){if(!drag)return;vx=drag.ox+e.clientX-drag.sx;vy=drag.oy+e.clientY-drag.sy;vapply()});
function dend(){drag=null;frame.classList.remove('drag')}
V.addEventListener('pointerup',dend);V.addEventListener('pointercancel',dend);V.addEventListener('lostpointercapture',dend);
frame.addEventListener('dblclick',reset);
[].forEach.call(frame.querySelectorAll('.h'),function(h){
 h.addEventListener('pointerdown',function(e){if(e.button!==0)return;e.preventDefault();e.stopPropagation();used();try{h.setPointerCapture(e.pointerId)}catch(x){}var r=V.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;rs={cx:cx,cy:cy,d0:Math.hypot(e.clientX-cx,e.clientY-cy)||1,s0:vs}});
 h.addEventListener('pointermove',function(e){if(!rs)return;vs=rs.s0*Math.hypot(e.clientX-rs.cx,e.clientY-rs.cy)/rs.d0;vapply()});
 function rend(){rs=null}h.addEventListener('pointerup',rend);h.addEventListener('pointercancel',rend);h.addEventListener('lostpointercapture',rend)});
frame.addEventListener('keydown',function(e){var k=e.key,s=8,ok=true;
 if(k==='ArrowLeft')vx-=s;else if(k==='ArrowRight')vx+=s;else if(k==='ArrowUp')vy-=s;else if(k==='ArrowDown')vy+=s;
 else if(k==='+'||k==='=')vs+=.1;else if(k==='-'||k==='_')vs-=.1;else if(k==='0'){vx=0;vy=0;vs=1}else ok=false;
 if(ok){e.preventDefault();vapply()}});
/* board shortcuts: 1-5 colours, T typeface, S shuffle */
art.addEventListener('keydown',function(e){if(e.target===nameIn||e.metaKey||e.ctrlKey||e.altKey)return;var k=e.key.toLowerCase();
 if(k>='1'&&k<='5'){ci=+k-1;picked=true;used();paint(true)}else if(k==='t'){ti=(ti+1)%T.length;used();paint(true)}else if(k==='s'&&e.target.tagName!=='INPUT')shuffle()});
/* live pointer readout */
(function(){var xy=$('artXY'),pend=false,px=0,py=0;if(!xy)return;
 art.addEventListener('pointermove',function(e){if(e.pointerType!=='mouse')return;var r=art.getBoundingClientRect();px=Math.round(e.clientX-r.left);py=Math.round(e.clientY-r.top);if(pend)return;pend=true;requestAnimationFrame(function(){pend=false;xy.textContent='X '+px+' \u00b7 Y '+py})},{passive:true})})();
/* restore */
try{var o=JSON.parse(localStorage.getItem(KEY)||'null');if(o&&C[o.c]&&T[o.t]){ci=o.c;ti=o.t;picked=!!o.u;if(typeof o.n==='string'){nameIn.value=o.n.slice(0,14)}art.classList.add('used')}}catch(e){}
applyName(true);
if(window.MutationObserver)new MutationObserver(function(){paint(false)}).observe(root,{attributes:true,attributeFilter:['data-theme']});
addEventListener('resize',function(){vapply()});
/* touch screens: the board drifts on its own (CSS-driven, runs only while visible and after the entrance) */
if(matchMedia('(hover:none),(pointer:coarse)').matches&&!lite()){
 var sv=false,ready=false;function upd(){art.classList.toggle('sway',ready&&sv&&!lite())}
 setTimeout(function(){ready=true;upd()},3400);
 if('IntersectionObserver' in window)new IntersectionObserver(function(es){sv=es[0].isIntersecting;upd()}).observe(art)
}
})();
