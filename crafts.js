(function(){
'use strict';
var $=function(i){return document.getElementById(i)},root=document.documentElement,sec=$('crafts');if(!sec)return;
function lite(){return root.classList.contains('lite')}
function beh(){return lite()?'auto':'smooth'}
/* effects notice + footer switch */
(function(){var isLite=root.classList.contains('lite'),why=root.getAttribute('data-lite'),fxn=$('cFx'),ft=$('fxToggle');
 function set(v){try{localStorage.setItem('voqen-fx',v)}catch(e){}location.reload()}
 if(fxn&&isLite&&why!=='off'){$('cFxMsg').textContent={reduced:'Effects are paused because your device asks for reduced motion.',savedata:'Effects are paused because data saving is on.','2g':'Effects are paused on slow connections.'}[why]||'Effects are paused.';fxn.hidden=false;$('cFxBtn').addEventListener('click',function(){set('on')})}
 if(ft){ft.textContent=isLite?'Play effects':'Calm mode';ft.addEventListener('click',function(){set(isLite?'on':'off')})}})();
var fine=matchMedia('(hover:hover) and (pointer:fine)').matches,coarse=matchMedia('(hover:none),(pointer:coarse)').matches;
function cap(el,e){try{el.setPointerCapture(e.pointerId)}catch(x){}}

/* ================= VIDEO: scrubbable edit suite ================= */
var Vd=(function(){
 var tl=$('vTl'),lanes=$('vLanes'),ph=$('vPh'),tc=$('vTc'),mon=$('vMon'),lab=$('vLab'),btn=$('vPlay'),ruler=$('vRuler'),wave=$('vWave'),
  scn=[].slice.call(mon.querySelectorAll('.v-scn')),tch=0,DUR=12,FPS=24,p=.04,playing=true,hover=false,drag=false,run=false,raf=0,last=0,i,seed=7;
 for(i=0;i<=6;i++){var k=document.createElement('i');k.textContent='00:'+(i*2<10?'0':'')+i*2;ruler.appendChild(k)}
 function rnd(){seed=(seed*16807)%2147483647;return seed/2147483647}
 for(i=0;i<72;i++){var b=document.createElement('i');b.style.height=(16+Math.round(Math.abs(Math.sin(i*.45)+rnd()*.9)*34))+'%';wave.appendChild(b)}
 function pad(n){return n<10?'0'+n:''+n}
 var lw=1,lf=-1,ls=-1,lp=-1;
 function mw(){lw=lanes.getBoundingClientRect().width||1}
 function show(){
  var f=Math.floor(p*DUR*FPS);if(f===lf)return;lf=f;
  var s=Math.floor(f/FPS),ff=f%FPS,si=Math.min(3,Math.floor(p*4));
  tc.textContent='00:'+pad(Math.floor(s/60))+':'+pad(s%60)+':'+pad(ff);ph.style.transform='translate3d('+(p*lw).toFixed(1)+'px,0,0)';
  if(si!==ls){ls=si;scn.forEach(function(e,n){e.classList.toggle('on',n===si)});lab.textContent='SC 0'+(si+1)+' \u00b7 '+scn[si].getAttribute('data-n')}
  var pv=Math.round(p*100);if(pv!==lp){lp=pv;tl.setAttribute('aria-valuenow',pv);tl.setAttribute('aria-valuetext',tc.textContent)}}
 function loop(t){if(!run)return;var dt=Math.min(.1,(t-last)/1000);last=t;if(playing&&!hover&&!drag){p+=dt/DUR;if(p>=1)p=0}show();raf=requestAnimationFrame(loop)}
 function setP(x){p=Math.max(0,Math.min(1,x));if(!run)show()}
 function pos(e){var r=lanes.getBoundingClientRect();setP((e.clientX-r.left)/r.width)}
 tl.addEventListener('pointerenter',function(e){if(e.pointerType==='mouse'){hover=true;pos(e)}});
 tl.addEventListener('pointermove',function(e){if(e.pointerType==='mouse'||drag)pos(e)});
 tl.addEventListener('pointerleave',function(e){if(e.pointerType==='mouse')hover=false});
 tl.addEventListener('pointerdown',function(e){if(e.pointerType==='mouse')return;drag=true;cap(tl,e);pos(e)});
 function up(){drag=false}tl.addEventListener('pointerup',up);tl.addEventListener('pointercancel',up);
 tl.addEventListener('keydown',function(e){var s=e.shiftKey?.1:.02;
  if(e.key==='ArrowRight')setP(p+s);else if(e.key==='ArrowLeft')setP(p-s);else if(e.key==='Home')setP(0);else if(e.key==='End')setP(1);else return;e.preventDefault()});
 btn.addEventListener('click',function(){playing=!playing;btn.textContent=playing?'Pause':'Play'});
 var mq=0,mx=50,my=50;
 var fxEl=mon.querySelector('.v-fx'),fxT=0;
 function fx(x,y){fxEl.style.setProperty('--fxx',((x-50)/1.4).toFixed(1)+'%');fxEl.style.setProperty('--fxy',((y-50)/1.4).toFixed(1)+'%')}
 function mpos(e){if(e.pointerType!=='mouse'){fxEl.classList.remove('auto');clearTimeout(fxT);fxT=setTimeout(function(){if(coarse&&run&&!lite())fxEl.classList.add('auto')},2600)}var r=mon.getBoundingClientRect();mx=(e.clientX-r.left)/r.width*100;my=(e.clientY-r.top)/r.height*100;if(mq)return;mq=requestAnimationFrame(function(){mq=0;fx(mx,my)})}
 mon.addEventListener('pointermove',mpos);mon.addEventListener('pointerdown',mpos);
 if(coarse){var hn=$('vHint');if(hn)hn.textContent='Drag across the timeline to scrub. Touch the screen to light it.'}
 if(lite()){playing=false;p=.55;btn.textContent='Play'}
 show();
 addEventListener('resize',function(){mw();lf=-1;show()});
 return{start:function(){mw();lf=-1;if(coarse&&!lite())fxEl.classList.add('auto');if(run)return;if(lite()){show();return}run=true;last=performance.now();raf=requestAnimationFrame(loop)},stop:function(){run=false;cancelAnimationFrame(raf);fxEl.classList.remove('auto')}};
})();

/* ================= WEB: typing editor, responsive preview, inspector ================= */
var Wd=(function(){
 var code=$('wCode'),vp=$('wVp'),brw=$('wBrw'),dev=$('wDev'),insp=$('wInsp'),host=$('webd'),els=[].slice.call(vp.querySelectorAll('[data-s]')),
  LINES=['<nav class="nav">Studio</nav>','<h1>Build once.</h1>','<p>Fast, accessible, responsive.</p>','<a class="btn">Get started</a>','.grid { display: grid; gap: 1rem }'],
  timer=0,run=false,li=0,ci=0,typed=[];
 var RE=/(&lt;\/?[a-z0-9]+)|(\s)(class)(?==)|("[^"]*")|(\.[a-z-]+)(?=\s*\{)|([a-z-]+)(?=\s*:)/gi;
 function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
 function hl(s){return esc(s).replace(RE,function(m,t,sp,a,st,sel,pr){if(t)return '<b class="t">'+t+'</b>';if(a)return sp+'<b class="a">'+a+'</b>';if(st)return '<b class="s">'+st+'</b>';if(sel)return '<b class="k">'+sel+'</b>';if(pr)return '<b class="p">'+pr+'</b>';return m})}
 function render(){code.innerHTML=hl(typed.join('\n'))}
 function full(){typed=LINES.slice();els.forEach(function(e){e.classList.add('in')});render()}
 function step(){
  if(!run)return;var L=LINES[li];ci++;typed[li]=L.slice(0,ci);render();
  if(ci>=L.length){els[li].classList.add('in');li++;ci=0;if(li>=LINES.length){timer=setTimeout(reset,5200);return}timer=setTimeout(step,340);return}
  timer=setTimeout(step,26)}
 function reset(){if(!run)return;li=0;ci=0;typed=[];els.forEach(function(e){e.classList.remove('in')});render();timer=setTimeout(step,500)}
 /* device switcher */
 host.addEventListener('click',function(e){var b=e.target.closest('[data-d]');if(!b)return;brw.setAttribute('data-dev',b.getAttribute('data-d'));
  [].forEach.call(host.querySelectorAll('[data-d]'),function(x){x.setAttribute('aria-pressed',x===b)})});
 /* dev-tools style inspector (mouse hover, touch tap, and an automatic tour on touch screens) */
 var pe=null,pend=false,wt=0,tour=0,ti=0,sw=0;
 function hide(){insp.style.display='none'}
 function inspect(t){if(!t||!vp.contains(t))return hide();
  var top=t.closest('[data-s]');if(top&&!top.classList.contains('in')&&!lite())return hide();
  var r=t.getBoundingClientRect(),v=vp.getBoundingClientRect();
  insp.style.left=(r.left-v.left)+'px';insp.style.top=(r.top-v.top)+'px';insp.style.width=r.width+'px';insp.style.height=r.height+'px';insp.style.display='block';
  insp.firstChild.textContent=t.getAttribute('data-t')+' \u00b7 '+Math.round(r.width)+'\u00d7'+Math.round(r.height)}
 vp.addEventListener('pointermove',function(e){if(e.pointerType!=='mouse')return;pe=e;if(pend)return;pend=true;requestAnimationFrame(function(){pend=false;inspect(pe.target.closest&&pe.target.closest('[data-t]'))})});
 vp.addEventListener('pointerleave',function(e){if(e.pointerType==='mouse')hide()});
 vp.addEventListener('pointerdown',function(e){if(e.pointerType==='mouse')return;wt=performance.now();inspect(e.target.closest&&e.target.closest('[data-t]'))});
 function tourTick(){if(performance.now()-wt<6000||lite())return;var all=[].slice.call(vp.querySelectorAll('[data-t]')).filter(function(x){var tp=x.closest('[data-s]');return !tp||tp.classList.contains('in')});if(!all.length)return hide();ti=(ti+1)%all.length;inspect(all[ti])}
 /* 3D tilt toward the mouse */
 var tp=null,tq=false;
 host.addEventListener('pointermove',function(e){if(lite())return;if(e.pointerType!=='mouse'){wt=performance.now();dev.classList.remove('sway')}tp=e;if(tq)return;tq=true;requestAnimationFrame(function(){tq=false;
  var r=host.getBoundingClientRect(),x=(tp.clientX-r.left)/r.width-.5,y=(tp.clientY-r.top)/r.height-.5;
  dev.style.setProperty('--ry',(x*9).toFixed(2)+'deg');dev.style.setProperty('--rx',(-y*7).toFixed(2)+'deg')})});
 host.addEventListener('pointerleave',function(){dev.style.setProperty('--ry','0deg');dev.style.setProperty('--rx','0deg')});
 host.addEventListener('pointerdown',function(e){if(e.pointerType==='mouse')return;wt=performance.now();dev.classList.remove('sway');clearTimeout(sw);sw=setTimeout(function(){if(run&&coarse&&!lite())dev.classList.add('sway')},2500)});
 host.addEventListener('pointerup',function(e){if(e.pointerType!=='mouse'){dev.style.setProperty('--ry','0deg');dev.style.setProperty('--rx','0deg');setTimeout(function(){if(run&&coarse&&!lite())dev.classList.add('sway')},2500)}});
 return{start:function(){if(run)return;run=true;if(lite()){full();return}if(coarse){dev.classList.add('sway');tour=setInterval(tourTick,1500)}if(li===0&&ci===0&&!typed.length)reset();else timer=setTimeout(step,200)},
        stop:function(){run=false;clearTimeout(timer);clearInterval(tour);dev.classList.remove('sway');hide()}};
})();

/* ================= GRAPHICS: paint, parallax, layers ================= */
var Gd=(function(){
 var art=$('gArt'),cv=$('gCv'),ctx=cv.getContext('2d'),host=$('gDemo'),W=0,H=0,enabled=false,looping=false,until=0,pts=[],lx=0,ly=0,has=false,bi=-1,mix=0,gq=0,gp=null,
  painting=false,lastUser=0,ld=0,ghostOn=coarse,gxp=null,gyp=null,cols=['#E4572E','#F0B429','#F4ECDD','#151515'],brush=[].slice.call(host.querySelectorAll('.g-col'));
 function size(){var r=art.getBoundingClientRect(),d=Math.min(coarse?1.5:2,window.devicePixelRatio||1);W=r.width;H=r.height;cv.width=Math.round(W*d);cv.height=Math.round(H*d);ctx.setTransform(d,0,0,d,0,0)}
 if(window.ResizeObserver)new ResizeObserver(size).observe(art);else addEventListener('resize',size);size();
 function dot(x,y,r,c){ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,6.2832);ctx.fill()}
function ghost(t){var x=W*(.5+.34*Math.sin(t/1000)),y=H*(.5+.3*Math.sin(t/760+1));if(gxp!==null){var dx=x-gxp,dy=y-gyp,d=Math.hypot(dx,dy),n=Math.max(1,Math.ceil(d/6));for(var i=1;i<=n;i++)pts.push({x:gxp+dx*i/n,y:gyp+dy*i/n,r:9,c:color()})}gxp=x;gyp=y;until=t+1700}
 function frame(t){
  if(!looping)return;if(t-ld<30){requestAnimationFrame(frame);return}ld=t;var idle=ghostOn&&!lite()&&t-lastUser>3200;art.classList.toggle('g-idle',idle);if(idle)ghost(t);else gxp=null;ctx.globalCompositeOperation='destination-out';ctx.fillStyle='rgba(0,0,0,.07)';ctx.fillRect(0,0,W,H);ctx.globalCompositeOperation='source-over';
  for(var i=0;i<pts.length;i++)dot(pts[i].x,pts[i].y,pts[i].r,pts[i].c);pts.length=0;
  if(t>until){looping=false;ctx.clearRect(0,0,W,H);return}requestAnimationFrame(frame)}
 function kick(){until=performance.now()+1700;if(!looping&&enabled){looping=true;requestAnimationFrame(frame)}}
 function color(){return bi>=0?cols[bi]:cols[(mix++>>3)%3]}
 art.addEventListener('pointermove',function(e){
  if(!enabled||lite())return;if(e.pointerType==='touch'&&!painting)return;lastUser=performance.now();gp=e;
  var r=art.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
  if(has){var dx=x-lx,dy=y-ly,d=Math.hypot(dx,dy),n=Math.max(1,Math.ceil(d/6)),rad=Math.max(3,Math.min(15,16-d*.35));for(var i=1;i<=n;i++)pts.push({x:lx+dx*i/n,y:ly+dy*i/n,r:rad,c:color()})}
  lx=x;ly=y;has=true;kick();
  if(!gq)gq=requestAnimationFrame(function(){gq=0;var rr=art.getBoundingClientRect();art.style.setProperty('--gx',(((gp.clientX-rr.left)/rr.width-.5)*2).toFixed(3));art.style.setProperty('--gy',(((gp.clientY-rr.top)/rr.height-.5)*2).toFixed(3))})});
 art.addEventListener('pointerup',function(){has=false});
 art.addEventListener('pointerleave',function(){has=false;art.style.setProperty('--gx','0');art.style.setProperty('--gy','0')});
 art.addEventListener('pointerdown',function(e){if(!enabled||lite())return;lastUser=performance.now();var r=art.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
  for(var i=0;i<16;i++){var a=i/16*6.2832,d=10+Math.random()*34;pts.push({x:x+Math.cos(a)*d,y:y+Math.sin(a)*d,r:3+Math.random()*9,c:color()})}kick()});
 /* brush colour */
 brush.forEach(function(b){b.addEventListener('click',function(){var i=+b.getAttribute('data-c'),on=bi!==i;bi=on?i:-1;brush.forEach(function(x){x.setAttribute('aria-pressed',on&&x===b)})})});
 $('gPaint').addEventListener('click',function(){painting=!painting;this.setAttribute('aria-pressed',painting);art.classList.toggle('painting',painting)});
 $('gClear').addEventListener('click',function(){pts.length=0;ctx.clearRect(0,0,W,H)});
 /* layers */
 [].forEach.call(host.querySelectorAll('.g-layers [data-layer]'),function(b){var n=b.getAttribute('data-layer');
  b.addEventListener('click',function(){var on=b.getAttribute('aria-pressed')==='true';b.setAttribute('aria-pressed',!on);[].forEach.call(art.querySelectorAll('[data-layer="'+n+'"]'),function(s){s.classList.toggle('off',on)})});
  function hl(){art.setAttribute('data-hl',n)}function un(){art.removeAttribute('data-hl')}
  b.addEventListener('pointerenter',hl);b.addEventListener('pointerleave',un);b.addEventListener('focus',hl);b.addEventListener('blur',un)});
 return{start:function(){enabled=true;size();if(ghostOn&&!lite())kick()},stop:function(){enabled=false;looping=false;has=false;gxp=null;art.classList.remove('g-idle');ctx.clearRect(0,0,W,H)}};
})();

/* ================= BRANDING & SEO: brand card + search preview ================= */
var Bd=(function(){
 var nIn=$('bName'),dIn=$('bDesc'),card=$('bCard'),mono=$('bMono'),nOut=$('bNameOut'),tOut=$('bTagOut'),url=$('bUrl'),ti=$('bTitle'),me=$('bMeta'),chk=$('bChk'),sc=$('bScore'),scT=$('bScoreT'),run=false,q=0,pe=null,bt=0;
 function slug(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')||'yourbrand'}
 function hue(s){var h=0;for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h%360}
 function cut(s,n){return s.length>n?s.slice(0,n-1).replace(/\s+$/,'')+'\u2026':s}
 function upd(){
  var n=nIn.value.replace(/\s+/g,' ').trim(),d=dIn.value.replace(/\s+/g,' ').trim(),h=hue(n||'brand');
  card.style.setProperty('--b1','hsl('+h+' 48% 26%)');card.style.setProperty('--b2','hsl('+h+' 58% 58%)');card.style.setProperty('--b3','hsl('+h+' 38% 91%)');
  mono.textContent=n?Array.from(n)[0].toUpperCase():'?';nOut.textContent=n||'Your brand';tOut.textContent=d||'Add a line about what you do.';
  var lead=d.split(/[.!?]/)[0].replace(/\s+/g,' ').trim(),full=n?(lead?n+' | '+lead:n):'',tl=full.length;
  url.textContent=slug(n)+'.com \u203a about';ti.textContent=cut(full||'Your page title',60);me.textContent=cut(d||'Add a short description of your page so people know what to expect.',155);
  var checks=[[tl>=30&&tl<=60,'Title length '+tl+' (aim for 30\u201360)'],[d.length>=70&&d.length<=155,'Description length '+d.length+' (aim for 70\u2013155)'],[!!n,'Brand name leads the title'],[d.split(' ').filter(Boolean).length>=5,'Description says what you do (5+ words)']],ok=0;
  chk.textContent='';checks.forEach(function(c){var li=document.createElement('li');if(c[0]){ok++;li.className='ok'}li.textContent=(c[0]?'Pass \u00b7 ':'Improve \u00b7 ')+c[1];chk.appendChild(li)});
  sc.style.setProperty('--pct',ok*25);scT.textContent=ok*25+'%'}
 nIn.addEventListener('input',upd);dIn.addEventListener('input',upd);upd();
 function move(e){pe=e;if(q)return;q=requestAnimationFrame(function(){q=0;var r=card.getBoundingClientRect(),x=(pe.clientX-r.left)/r.width,y=(pe.clientY-r.top)/r.height;
  card.style.setProperty('--bry',((x-.5)*14).toFixed(2)+'deg');card.style.setProperty('--brx',(-(y-.5)*10).toFixed(2)+'deg');
  card.style.setProperty('--sx',(x*100).toFixed(1)+'%');card.style.setProperty('--sy',(y*100).toFixed(1)+'%');card.style.setProperty('--gx',(x*100).toFixed(1)+'%');card.style.setProperty('--gy',(y*100).toFixed(1)+'%')})}
 function rest(){card.style.setProperty('--bry','0deg');card.style.setProperty('--brx','0deg')}
 card.addEventListener('pointermove',function(e){if(lite())return;card.classList.remove('auto');move(e);if(e.pointerType!=='mouse'){clearTimeout(bt);bt=setTimeout(function(){rest();if(run&&coarse&&!lite())card.classList.add('auto')},2600)}});
 card.addEventListener('pointerleave',function(e){if(e.pointerType==='mouse')rest()});
 return{start:function(){run=true;if(coarse&&!lite())card.classList.add('auto')},stop:function(){run=false;card.classList.remove('auto');clearTimeout(bt)}};
})();

/* ================= AI & AUTOMATION: chatbot + automation flow ================= */
var Ad=(function(){
 var log=$('aLog'),demo=$('aDemo'),chips=[].slice.call($('aChips').querySelectorAll('button')),nodes=[].slice.call($('aFlow').querySelectorAll('.a-node')),fxEl=demo.querySelector('.a-fx'),
  QA=[['What are your hours?','We\u2019re open Monday to Friday, 9 to 6. Want me to book a time?'],['Book a call','Sure. Pick a day and I\u2019ll hold a 20-minute slot, then confirm by email.'],['Send me a quote','Happy to. Tell me what you need and your budget, and I\u2019ll pass it to the team.']],
  run=false,busy=false,timers=[],auto=0,lastUser=0,qi=0,fxT=0,mq=0,pe=null;
 function t(fn,ms){var id=setTimeout(fn,ms);timers.push(id);return id}
 function clearT(){timers.forEach(clearTimeout);timers.length=0}
 function bubble(cls,txt){var b=document.createElement('div');b.className='a-m '+cls;b.textContent=txt;log.appendChild(b);log.scrollTop=log.scrollHeight;while(log.children.length>8)log.removeChild(log.firstChild);return b}
 function step(n){nodes.forEach(function(x,i){x.classList.toggle('on',i===n);x.classList.toggle('done',i<n);x.parentNode.classList.toggle('lit',i<=n&&n<5||(n>=5&&i>0))})}
 function ask(i,force){
  if(busy&&!force)return;if(force){clearT();step(-1);[].forEach.call(log.querySelectorAll('.typing'),function(x){x.remove()})}busy=true;var qa=QA[i%QA.length];bubble('me',qa[0]);
  if(lite()){bubble('bot',qa[1]);step(5);busy=false;return}
  var ty=bubble('bot typing','\u2026');step(0);t(function(){step(1)},450);t(function(){step(2);ty.remove();bubble('bot',qa[1])},1100);t(function(){step(3)},1650);t(function(){step(4)},2150);t(function(){step(5);busy=false},2800);t(function(){step(-1)},5200)}
 chips.forEach(function(c,i){c.addEventListener('click',function(){lastUser=Date.now();ask(i,true)})});
 nodes.forEach(function(nd,i){nd.addEventListener('click',function(){lastUser=Date.now();clearT();busy=true;var k=i;(function go(){step(k);if(k<4){k++;t(go,380)}else t(function(){step(5);busy=false;t(function(){step(-1)},2200)},500)})()})});
 function fx(x,y){fxEl.style.setProperty('--axx',((x-50)/1.6).toFixed(1)+'%');fxEl.style.setProperty('--ayy',((y-50)/1.6).toFixed(1)+'%')}
 function mpos(e){if(lite())return;if(e.pointerType!=='mouse'){fxEl.classList.remove('auto');clearTimeout(fxT);fxT=setTimeout(function(){if(coarse&&run&&!lite())fxEl.classList.add('auto')},2600)}pe=e;if(mq)return;mq=requestAnimationFrame(function(){mq=0;var r=demo.getBoundingClientRect();fx((pe.clientX-r.left)/r.width*100,(pe.clientY-r.top)/r.height*100)})}
 demo.addEventListener('pointermove',mpos);demo.addEventListener('pointerdown',mpos);
 return{start:function(){
   if(run)return;run=true;if(coarse&&!lite())fxEl.classList.add('auto');
   if(lite()){if(!log.children.length)ask(0);return}
   if(!log.children.length)t(function(){ask(0)},900);
   auto=setInterval(function(){if(!run||busy||lite()||Date.now()-lastUser<7000)return;ask(qi++)},5200)},
  stop:function(){run=false;clearInterval(auto);clearT();busy=false;step(-1);fxEl.classList.remove('auto')}};
})();

/* ================= DIGITAL MARKETING: planner + scrubbable chart ================= */
var Md=(function(){
 var bud=$('mBud'),out=$('mBudOut'),chans=[].slice.call($('mDemo').querySelectorAll('[data-ch]')),chart=$('mChart'),barsEl=$('mBars'),tip=$('mTip'),cross=$('mCross'),
  K={search:[10,.03,.04],social:[25,.008,.03],email:[5,.05,.08]},bars=[],weekly=[],cur=[0,0,0,0],run=false,raf=0,pe=null,pq=0,i;
 var ids=['mReach','mClicks','mLeads','mCust'],els=ids.map($),fbs=[0,1,2,3].map(function(n){return $('mFb'+n)});
 for(i=0;i<12;i++){var b=document.createElement('i');barsEl.appendChild(b);bars.push(b)}
 function fmt(n){return Math.round(n).toLocaleString('en-IN')}
 function model(){var b=+bud.value,act=chans.filter(function(c){return c.getAttribute('aria-pressed')==='true'}).map(function(c){return c.getAttribute('data-ch')});if(!act.length)act=['search'];
  var share=b/act.length,reach=0,clicks=0,leads=0;act.forEach(function(k){var m=K[k],r=share*m[0],c=r*m[1];reach+=r;clicks+=c;leads+=c*m[2]});return[reach,clicks,leads,leads*.2]}
 function paint(vals){els.forEach(function(e,n){e.textContent=fmt(vals[n])})}
 function update(){
  var b=+bud.value;out.textContent='\u20b9'+b.toLocaleString('en-IN');var v=model();
  weekly=[];for(i=0;i<12;i++)weekly.push(Math.max(1,v[2]/4*(.6+.8*i/11)*(1+.1*Math.sin(i*1.9))));var mx=Math.max.apply(null,weekly);
  bars.forEach(function(el,n){el.style.setProperty('--h',Math.max(4,weekly[n]/mx*100).toFixed(1)+'%')});
  fbs.forEach(function(el,n){var w=n===0?100:Math.max(8,Math.log10(v[n]+1)/Math.log10(v[0]+1)*100);el.style.setProperty('--w',w.toFixed(0)+'%')});
  chart.setAttribute('aria-label','Sample weekly leads: about '+fmt(weekly[0])+' in week 1 rising to about '+fmt(weekly[11])+' in week 12');
  if(lite()||!run){cur=v.slice();paint(cur);return}
  var from=cur.slice(),t0=performance.now();cancelAnimationFrame(raf);(function f(t){var k=Math.min(1,(t-t0)/500),e=1-Math.pow(1-k,3);cur=v.map(function(x,n){return from[n]+(x-from[n])*e});paint(cur);if(k<1)raf=requestAnimationFrame(f)})(t0)}
 bud.addEventListener('input',update);
 chans.forEach(function(c){c.addEventListener('click',function(){c.setAttribute('aria-pressed',c.getAttribute('aria-pressed')!=='true');update()})});
 function show(e){pe=e;if(pq)return;pq=requestAnimationFrame(function(){pq=0;var r=chart.getBoundingClientRect(),x=Math.max(0,Math.min(r.width-1,pe.clientX-r.left)),n=Math.min(11,Math.floor(x/r.width*12));
  chart.classList.add('live');cross.classList.remove('auto');cross.style.setProperty('--cx',x.toFixed(1)+'px');
  tip.textContent='Week '+(n+1)+' \u00b7 about '+fmt(weekly[n])+' leads';var tw=tip.offsetWidth;tip.style.setProperty('--tx',Math.max(0,Math.min(r.width-tw,x-tw/2)).toFixed(1)+'px');
  bars.forEach(function(el,k){el.classList.toggle('hot',k===n)})})}
 function hideTip(){chart.classList.remove('live');bars.forEach(function(el){el.classList.remove('hot')});if(coarse&&run&&!lite()){cross.style.setProperty('--cw',chart.getBoundingClientRect().width+'px');cross.classList.add('auto')}}
 chart.addEventListener('pointermove',function(e){if(lite())return;if(e.pointerType==='mouse'||e.buttons||e.pointerType==='touch')show(e)});
 chart.addEventListener('pointerdown',function(e){if(lite())return;show(e)});
 chart.addEventListener('pointerleave',hideTip);chart.addEventListener('pointerup',function(e){if(e.pointerType!=='mouse')setTimeout(hideTip,900)});chart.addEventListener('pointercancel',hideTip);
 update();
 return{start:function(){run=true;if(!lite()){bars.forEach(function(el){el.style.setProperty('--h','4%')});cur=[0,0,0,0];requestAnimationFrame(function(){requestAnimationFrame(update)})}else update();hideTip()},stop:function(){run=false;cancelAnimationFrame(raf);cross.classList.remove('auto')}};
})();

/* ================= tabs ================= */
var demos={video:Vd,web:Wd,graphics:Gd,brand:Bd,ai:Ad,market:Md},tabs=[].slice.call(sec.querySelectorAll('[role=tab]')),panels=[].slice.call(sec.querySelectorAll('[role=tabpanel]')),ind=sec.querySelector('.c-ind'),vis=false,cur='video';
function moveInd(){var t=tabs.filter(function(x){return x.getAttribute('aria-selected')==='true'})[0];if(t&&ind){ind.style.setProperty('--il',t.offsetLeft+'px');ind.style.setProperty('--iw',t.offsetWidth+'px')}}
function sync(){Object.keys(demos).forEach(function(k){if(vis&&k===cur)demos[k].start();else demos[k].stop()})}
function select(name,focus,push){
 if(!demos[name])return;cur=name;
 tabs.forEach(function(t){var on=t.getAttribute('data-craft')===name;t.setAttribute('aria-selected',on);t.tabIndex=on?0:-1;if(on&&focus)t.focus()});
 panels.forEach(function(p){p.hidden=p.id!=='panel-'+name});sec.setAttribute('data-craft',name);moveInd();sync();
 var tb=sec.querySelector('.c-tabs'),at=tabs.filter(function(x){return x.getAttribute('aria-selected')==='true'})[0];if(tb&&at&&tb.scrollWidth>tb.clientWidth+2&&getComputedStyle(tb).display!=='grid')tb.scrollTo({left:at.offsetLeft-(tb.clientWidth-at.offsetWidth)/2,behavior:beh()});
 if(push){try{history.replaceState(null,'','#'+name)}catch(e){}}}
tabs.forEach(function(t){t.addEventListener('click',function(){select(t.getAttribute('data-craft'),false,true)})});
sec.querySelector('.c-tabs').addEventListener('keydown',function(e){
 var i=tabs.indexOf(document.activeElement);if(i<0)return;var n=i;
 if(e.key==='ArrowRight')n=(i+1)%tabs.length;else if(e.key==='ArrowLeft')n=(i-1+tabs.length)%tabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else return;
 e.preventDefault();select(tabs[n].getAttribute('data-craft'),true,true)});
addEventListener('resize',moveInd);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(moveInd);
if('IntersectionObserver' in window)new IntersectionObserver(function(es){vis=es[0].isIntersecting;sync()},{rootMargin:'120px 0px'}).observe(sec);else{vis=true;sync()}
document.addEventListener('visibilitychange',function(){if(document.hidden)Object.keys(demos).forEach(function(k){demos[k].stop()});else sync()});
function fromHash(){var h=location.hash.slice(1);if(demos[h]){select(h,false,false);sec.scrollIntoView({behavior:beh()})}}
addEventListener('hashchange',fromHash);if(demos[location.hash.slice(1)])setTimeout(fromHash,60);
/* CTAs pre-fill the project type */
[].forEach.call(sec.querySelectorAll('.c-btn'),function(a){a.addEventListener('click',function(){
 var s=$('type'),want=a.getAttribute('data-type'),o=[].filter.call(s.options,function(x){return x.text===want})[0];
 if(o){s.value=o.value||o.text;s.dispatchEvent(new Event('input',{bubbles:true}))}})});
select('video',false,false);
})();
