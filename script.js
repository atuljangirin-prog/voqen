(function(){
'use strict';
var $=function(id){return document.getElementById(id)},EMAIL='voqen.studio.in@gmail.com',root=document.documentElement;
var store={get:function(k){try{return localStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}},del:function(k){try{localStorage.removeItem(k)}catch(e){}}};
$('yr').textContent=new Date().getFullYear();

/* theme */
var tb=$('themeBtn');
function paint(){var d=root.dataset.theme==='dark';tb.setAttribute('aria-pressed',d);tb.setAttribute('aria-label',d?'Switch to light theme':'Switch to dark theme')}
function flip(n){root.dataset.theme=n;store.set('voqen-theme',n);paint()}
tb.addEventListener('click',function(){
 var n=root.dataset.theme==='dark'?'light':'dark';
 if(document.startViewTransition&&!root.classList.contains('lite')){
  var r=tb.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2,rad=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
  var t=document.startViewTransition(function(){flip(n)});
  t.ready.then(function(){root.animate({clipPath:['circle(0px at '+x+'px '+y+'px)','circle('+rad+'px at '+x+'px '+y+'px)']},{duration:550,easing:'ease-in-out',pseudoElement:'::view-transition-new(root)'})}).catch(function(){});
 }else flip(n);
});paint();

/* mobile menu */
var btn=$('menuBtn'),nav=$('nav');
function setMenu(o){root.classList.toggle('lock',o);nav.classList.toggle('open',o);btn.setAttribute('aria-expanded',o);btn.setAttribute('aria-label',o?'Close menu':'Open menu')}
btn.addEventListener('click',function(){setMenu(!nav.classList.contains('open'))});
nav.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false)});
document.addEventListener('click',function(e){if(nav.classList.contains('open')&&!e.target.closest('#nav,#menuBtn'))setMenu(false)});
addEventListener('resize',function(){if(innerWidth>720&&nav.classList.contains('open'))setMenu(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('open')){setMenu(false);btn.focus()}});

/* scroll progress + active section */
var bar=$('progress'),totop=$('toTop'),tick=false,litFn=null;
var maxS=1,aboutOn=false,scrollTL=!!(window.CSS&&CSS.supports&&CSS.supports('animation-timeline','scroll()'));
function measure(){maxS=Math.max(1,root.scrollHeight-root.clientHeight)}
addEventListener('resize',measure);addEventListener('load',measure);if(window.ResizeObserver)new ResizeObserver(measure).observe(document.body);measure();
function prog(){var y=root.scrollTop;
 if(!scrollTL)bar.style.transform='scaleX('+Math.min(1,y/maxS).toFixed(4)+')';
 totop.classList.toggle('show',y>700);
 if(links&&y>=maxS-4){Object.keys(links).forEach(function(k){links[k].removeAttribute('aria-current')});if(links.contact)links.contact.setAttribute('aria-current','true')}
 if(litFn&&aboutOn)litFn();tick=false}
addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(prog)}},{passive:true});prog();
if('IntersectionObserver' in window){
 var links={};document.querySelectorAll('#nav a:not(.btn)').forEach(function(a){links[a.getAttribute('href').slice(1)]=a});
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;
  Object.keys(links).forEach(function(k){links[k].removeAttribute('aria-current')});
  if(links[e.target.id])links[e.target.id].setAttribute('aria-current','true')})},{rootMargin:'-45% 0px -50% 0px'});
 ['work','crafts','services','about','contact'].forEach(function(id){io.observe($(id))});
}

/* concept project details */
var cases={
 maren:{t:'Maren Goods',c:'Brand Identity',b:'An imagined lifestyle brand for everyday objects made for slower routines.',a:'A soft lowercase serif wordmark, a warm neutral palette, and packaging that lets the name do the talking.',d:['Wordmark and logo variations','Colour and type system','Packaging concepts']},
 plot:{t:'Plot',c:'Digital Experience',b:'An imagined productivity tool that needed a landing page with one message and one action.',a:'A single-column layout, large editorial type, and an interface mockup built in CSS so the page stays fast and clear.',d:['Page structure','Responsive layout','Interface mockup']},
 halflight:{t:'Halflight',c:'Art Direction',b:'An imagined seasonal collection that needed a campaign look built around light and shadow.',a:'A split-circle motif on black, paired with wide-spaced serif type and applied consistently across formats.',d:['Visual identity','Campaign key visual','Social format concepts']}
},dlg=$('case');
document.querySelectorAll('[data-case]').forEach(function(a){a.addEventListener('click',function(e){
 if(typeof dlg.showModal!=='function')return;
 e.preventDefault();var d=cases[a.dataset.case],ul=$('case-d');
 $('case-t').textContent=d.t;$('case-c').textContent=d.c;$('case-b').textContent=d.b;$('case-a').textContent=d.a;ul.textContent='';
 d.d.forEach(function(x){var li=document.createElement('li');li.textContent=x;ul.appendChild(li)});dlg.showModal()})});
dlg.addEventListener('click',function(e){if(e.target===dlg||e.target.closest('[data-close]'))dlg.close()});

/* copy email */
$('copyMail').addEventListener('click',function(){var b=this;
 function done(ok){$('copyMsg').textContent=ok?'Email address copied':'Could not copy. Please select the address and copy it manually.';if(!ok)return;b.classList.add('ok');setTimeout(function(){b.classList.remove('ok');$('copyMsg').textContent=''},2000)}
 function legacy(){var t=document.createElement('textarea');t.value=EMAIL;t.setAttribute('readonly','');t.className='sr';document.body.appendChild(t);t.select();var ok=false;try{ok=document.execCommand('copy')}catch(e){}document.body.removeChild(t);done(ok)}
 if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(EMAIL).then(function(){done(true)},legacy);else legacy()});

/* back to top (works from the footer link, floating button and logo) */
var lgs=document.querySelector('.lg-load');
if(lgs){var lgEnd=function(){lgs.classList.remove('lg-load')};
 lgs.querySelectorAll('path')[4].addEventListener('animationend',function(e){if(e.animationName==='lgdraw')lgEnd()});setTimeout(lgEnd,4000)}
(function(){var g=document.querySelector('.giant svg');
 if(g&&lgs&&scrollTL&&!root.classList.contains('lite')){g.textContent='';g.setAttribute('class','lg lg-scroll');lgs.querySelectorAll('path').forEach(function(p){g.appendChild(p.cloneNode())})}})();
document.querySelectorAll('a[href="#top"]').forEach(function(a){a.addEventListener('click',function(e){
 e.preventDefault();scrollTo({top:0,behavior:root.classList.contains('lite')?'auto':'smooth'});
 var l=document.querySelector('.site-header .logo');if(l)l.focus({preventScroll:true})})});

/* contact form */
var form=$('form'),status=$('status'),submit=$('submit'),clr=$('clearDraft'),busy=false,last=0,KEY='voqen-draft',F=['name','email','type','budget','currency','amount','message'];
function budgetText(){var b=$('budget').value;if(b!=='Custom')return b;var a=$('amount').value.trim();return a?$('currency').value+a+' (custom amount)':'Custom amount'}
function tog(){$('customBudget').hidden=$('budget').value!=='Custom'}
$('budget').addEventListener('change',tog);
form.noValidate=true;
var rules={
 name:function(v){return v.trim()?'':'Enter your full name.'},
 email:function(v){return !v.trim()?'Enter your email address.':/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())?'':'Enter a valid email, like name@example.com.'},
 message:function(v){return v.trim().length>=10?'':'Tell us a little about your project (at least 10 characters).'}
};
function show(id,msg){var f=$(id);$(id+'-e').textContent=msg;if(msg){f.setAttribute('aria-invalid','true');f.setAttribute('aria-describedby',id+'-e')}else{f.removeAttribute('aria-invalid');f.removeAttribute('aria-describedby')}return !msg}
function validate(){
 var ok=true,first=null;
 ['name','email','message'].forEach(function(id){if(!show(id,rules[id]($(id).value))){ok=false;first=first||$(id)}});
 if($('budget').value==='Custom'){var av=parseFloat($('amount').value);if(!show('amount',av>0?'':'Enter your budget as a number greater than 0.')){ok=false;first=first||$('amount')}}else show('amount','');
 if(!show('consent',$('consent').checked?'':'Please tick the box so we can reply to you.')){ok=false;first=first||$('consent')}
 if(first)first.focus();return ok;
}
['name','email','message'].forEach(function(id){$(id).addEventListener('blur',function(){show(id,rules[id]($(id).value))})});
function say(t,cls){status.textContent=t;status.className=cls||''}
function fail(t){
 say(t,'bad');var a=document.createElement('a');
 a.href='mailto:'+EMAIL+'?subject='+encodeURIComponent('New Project Inquiry — VOQEN Studio')+'&body='+encodeURIComponent('Name: '+$('name').value+'\nEmail: '+$('email').value+'\nProject type: '+$('type').value+'\nBudget: '+budgetText()+'\n\n'+$('message').value);
 a.textContent='Send by email instead';status.appendChild(a);
}
function count(){$('count').textContent=$('message').value.length+' / 2000'}
function save(){var o={};F.forEach(function(id){o[id]=$(id).value});store.set(KEY,JSON.stringify(o));clr.hidden=false}
(function(){var r=store.get(KEY);if(!r)return;try{var o=JSON.parse(r);F.forEach(function(id){if(typeof o[id]==='string')$(id).value=o[id]});clr.hidden=false;count();tog()}catch(e){}})();
form.addEventListener('input',function(e){if(e.target.id==='consent'||e.target.name==='_honey')return;save();count()});
clr.addEventListener('click',function(){store.del(KEY);form.reset();tog();clr.hidden=true;count();say('')});

form.addEventListener('submit',function(e){
 e.preventDefault();
 if(busy||!validate()||form.elements._honey.value)return;
 if(Date.now()-last<20000){say('Your message was just sent. Please wait a moment before sending another.','bad');return}
 if(Date.now()-t0<2000){say('One moment, then press Send again.','bad');return}
 if(navigator.onLine===false){fail('You appear to be offline. Reconnect and try again. Your details are still in the form.');return}
 busy=true;submit.disabled=true;submit.textContent='Sending…';say('Sending your message…');
 var data=new FormData(form);data.delete('_honey');data.set('budget',budgetText());data.set('project_type',$('type').value||'Not specified');data.delete('custom_currency');data.delete('custom_amount');
 fetch('https://formsubmit.co/ajax/'+EMAIL,{method:'POST',headers:{'Accept':'application/json'},body:data})
 .then(function(r){return r.json().catch(function(){return {}}).then(function(j){return {ok:r.ok,j:j}})})
 .then(function(res){
   if(res.ok&&String(res.j.success)==='true'){last=Date.now();store.del(KEY);form.reset();tog();clr.hidden=true;count();say('Thank you. Your message was delivered and we will reply by email soon.','ok')}
   else fail(res.j&&res.j.message?'Message not sent: '+res.j.message:'Message not sent. Your details are still in the form.');
 })
 .catch(function(){fail('We could not reach the form service. Check your connection and try again. Your details are still in the form.')})
 .then(function(){busy=false;submit.disabled=false;submit.textContent='Send message'});
});

/* scroll reveal (skipped for reduced motion) */
if('IntersectionObserver' in window&&!root.classList.contains('lite')){
 var rio=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var t=e.target;rio.unobserve(t);t.classList.add('in');setTimeout(function(){t.classList.remove('rv','in');t.style.removeProperty('--d')},1300)})},{threshold:.1,rootMargin:'0px 0px -5% 0px'});
 document.querySelectorAll('.head,.card,.services li,.steps li,.faq details,.contact-copy,form,.giant,.about>*').forEach(function(el){
  el.style.setProperty('--d',Math.min(Array.prototype.indexOf.call(el.parentNode.children,el),4)*.08+'s');el.classList.add('rv');rio.observe(el)});
}
/* hero pointer parallax (mouse/pen only) */
var art=document.querySelector('.hero-art');
if(art&&matchMedia('(hover:hover) and (pointer:fine)').matches&&!root.classList.contains('lite')){
 var hq=0;document.querySelector('.hero').addEventListener('pointermove',function(e){if(hq)return;hq=requestAnimationFrame(function(){hq=0});var r=this.getBoundingClientRect();
  art.style.setProperty('--mx',((e.clientX-r.left)/r.width-.5).toFixed(3));art.style.setProperty('--my',((e.clientY-r.top)/r.height-.5).toFixed(3))});
}
/* impressive layer: scroll-lit statement, card glow, magnetic buttons, cursor */
var reduced=root.classList.contains('lite'),fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
var ah=$('about-h');
if(ah&&!reduced){
 var wd=ah.textContent.trim().split(/\s+/);ah.textContent='';
 wd.forEach(function(w,i){var s=document.createElement('span');s.className='sw';s.textContent=w;ah.appendChild(s);if(i<wd.length-1)ah.appendChild(document.createTextNode(' '))});
 var sw=ah.querySelectorAll('.sw');
 var last=-1,lit=function(){var r=ah.getBoundingClientRect(),p=Math.max(0,Math.min(1,(innerHeight*.85-r.top)/(innerHeight*.45))),n=Math.round(p*sw.length);if(n===last)return;last=n;sw.forEach(function(s,i){s.classList.toggle('on',i<n)})};
 litFn=lit;addEventListener('resize',lit);lit();
 if('IntersectionObserver' in window)new IntersectionObserver(function(es){aboutOn=es[0].isIntersecting;lit()},{rootMargin:'50% 0px'}).observe(ah);else aboutOn=true;
}
document.querySelectorAll('.card').forEach(function(c){var t=c.querySelector('.thumb');
 c.addEventListener('pointerdown',function(e){if(e.pointerType!=='touch')return;var r=t.getBoundingClientRect();t.style.setProperty('--px',(e.clientX-r.left)+'px');t.style.setProperty('--py',(e.clientY-r.top)+'px');c.style.setProperty('--rx',(((e.clientX-r.left)/r.width-.5)*7).toFixed(2)+'deg');c.style.setProperty('--ry',(-((e.clientY-r.top)/r.height-.5)*7).toFixed(2)+'deg');c.classList.add('tap');clearTimeout(c._tp);c._tp=setTimeout(function(){c.classList.remove('tap')},700)});
 c.addEventListener('pointerleave',function(){c.style.removeProperty('--rx');c.style.removeProperty('--ry')});var cq=0;c.addEventListener('pointermove',function(e){if(cq)return;cq=requestAnimationFrame(function(){cq=0});var r=t.getBoundingClientRect();t.style.setProperty('--px',(e.clientX-r.left)+'px');c.style.setProperty('--rx',(((e.clientX-r.left)/r.width-.5)*7).toFixed(2)+'deg');c.style.setProperty('--ry',(-((e.clientY-r.top)/r.height-.5)*7).toFixed(2)+'deg');t.style.setProperty('--py',(e.clientY-r.top)+'px')})});
if(fine&&!reduced){
 document.querySelectorAll('.hero .btn,#submit,.nav-cta').forEach(function(b){b.classList.add('mag');
  b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.translate=((e.clientX-r.left-r.width/2)*.22)+'px '+((e.clientY-r.top-r.height/2)*.3)+'px'});
  b.addEventListener('pointerleave',function(){b.style.translate=''})});

}

/* smart form helpers */
var t0=Date.now(),DOM=['gmail.com','yahoo.com','yahoo.co.in','outlook.com','hotmail.com','live.com','icloud.com','rediffmail.com','proton.me','protonmail.com'];
function lev(a,b){var m=[],i,j;for(i=0;i<=a.length;i++){m[i]=[i]}for(j=1;j<=b.length;j++)m[0][j]=j;for(i=1;i<=a.length;i++)for(j=1;j<=b.length;j++)m[i][j]=Math.min(m[i-1][j]+1,m[i][j-1]+1,m[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return m[a.length][b.length]}
function suggest(v){var m=v.trim().toLowerCase().match(/^([^\s@]+)@([^\s@]+)$/);if(!m||DOM.indexOf(m[2])>-1)return null;var best=null,bd=3;DOM.forEach(function(d){var x=lev(m[2],d);if(x<bd){bd=x;best=d}});return bd<=2&&m[2].length>=6?m[1]+'@'+best:null}
$('email').addEventListener('blur',function(){var h=$('email-h'),s=suggest(this.value);h.textContent='';if(!s)return;
 h.appendChild(document.createTextNode('Did you mean '));var b=document.createElement('button');b.type='button';b.className='link';b.textContent=s;
 b.addEventListener('click',function(){$('email').value=s;h.textContent='';show('email','');save()});h.appendChild(b);h.appendChild(document.createTextNode('?'))});
function preview(){var n=parseFloat($('amount').value),inr=$('currency').value==='\u20b9';
 $('amount-p').textContent=n>0?'Shown as '+new Intl.NumberFormat(inr?'en-IN':'en-US',{style:'currency',currency:inr?'INR':'USD',maximumFractionDigits:2}).format(n):''}
$('amount').addEventListener('input',preview);$('currency').addEventListener('change',preview);
$('message').addEventListener('keydown',function(e){if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();if(form.requestSubmit)form.requestSubmit();else submit.click()}});
if(!clr.hidden&&($('name').value||$('message').value))say('We restored your saved draft.');
/* suggest a project type from the message when none is chosen */
var TM=[['Website Design & Development',['website','web site','landing page','webpage','web app','online store','ecommerce','e-commerce']],['Brand Identity: Visual identity system',['logo','brand','branding','identity','rebrand','packaging']],['Creative Direction',['campaign','art direction','creative direction','moodboard','photoshoot']],['Digital Content & Visual Design',['social media','instagram','posts','poster','flyer','banner','graphics']]],tmr;
function guess(){var h=$('type-h'),m=$('message').value.toLowerCase(),hit=null;h.textContent='';if($('type').value)return;
 TM.some(function(x){return x[1].some(function(k){return m.indexOf(k)>-1})&&(hit=x[0])});if(!hit)return;
 h.appendChild(document.createTextNode('Sounds like '+hit.split(':')[0]+'. Use '));var b=document.createElement('button');b.type='button';b.className='link';b.textContent='\u201c'+hit+'\u201d';
 b.addEventListener('click',function(){$('type').value=hit;h.textContent='';save()});h.appendChild(b);h.appendChild(document.createTextNode('?'))}
$('message').addEventListener('input',function(){clearTimeout(tmr);tmr=setTimeout(guess,500)});$('type').addEventListener('change',function(){$('type-h').textContent=''});
/* desktop-only cursor ring. Position uses transform only; size, fill and press-shrink live on an inner circle,
   so clicking can never shift the ring. State is refreshed on move, scroll and click. On touch screens the ring appears under the finger and ripples on tap. */
if(!reduced){
 var cring=document.createElement('div'),cin=document.createElement('i'),clab=document.createElement('span'),cx=0,cy=0,rx=0,ry=0,con=false,cgo=false,ctgt=null,csc=false,ctouch=false;
 clab.textContent='View';cin.className='cur-in';cring.className='cur-ring';cin.appendChild(clab);cring.appendChild(cin);cring.setAttribute('aria-hidden','true');document.body.appendChild(cring);
 function cdraw(){cring.style.transform='translate3d('+rx.toFixed(1)+'px,'+ry.toFixed(1)+'px,0)'}
 function ctick(){rx+=(cx-rx)*.3;ry+=(cy-ry)*.3;if(Math.abs(cx-rx)<.1&&Math.abs(cy-ry)<.1){rx=cx;ry=cy;cgo=false}else requestAnimationFrame(ctick);cdraw()}
 function ckick(){if(!cgo){cgo=true;requestAnimationFrame(ctick)}}
 function cstate(t){if(!t||!t.closest)return;var tx=t.closest('input:not([type=checkbox]):not([type=radio]):not([type=range]),textarea'),c=t.closest('.card,[data-cur]'),l=t.closest('a,button,summary,select,label,[role=button]');
  if(c)clab.textContent=c.getAttribute('data-cur')||'View';root.classList.toggle('cur-txt',!!tx);cring.classList.toggle('big',!!c);cring.classList.toggle('link',!c&&!!l)}
 function crefresh(){if(!con)return;var el=document.elementFromPoint(cx,cy);if(el){ctgt=el;cstate(el)}}
 addEventListener('pointermove',function(e){if(e.pointerType==='touch'&&!ctouch)return;cx=e.clientX;cy=e.clientY;
  if(!con){con=true;rx=cx;ry=cy;cdraw()}root.classList.add('cur-on');
  if(e.target!==ctgt){ctgt=e.target;cstate(ctgt)}ckick()},{passive:true});
 addEventListener('scroll',function(){if(csc||!con)return;csc=true;setTimeout(function(){csc=false;crefresh()},90)},{passive:true});
 addEventListener('pointerdown',function(e){
  if(e.pointerType==='touch'){ctouch=true;cx=e.clientX;cy=e.clientY;rx=cx;ry=cy;cdraw();con=true;root.classList.add('cur-on');cstate(e.target)}else ctouch=false;
  if(e.button!==0)return;cring.classList.add('press');
  if(document.querySelectorAll('.cur-burst').length<4){var b=document.createElement('i');b.className='cur-burst';b.style.setProperty('--t','translate3d('+e.clientX+'px,'+e.clientY+'px,0)');document.body.appendChild(b);b.addEventListener('animationend',function(){b.remove()})}},{passive:true});
 function crelease(){cring.classList.remove('press')}
 addEventListener('pointerup',function(e){crelease();if(e.pointerType==='touch'){ctouch=false;setTimeout(function(){if(!ctouch){root.classList.remove('cur-on');con=false}},260)}else setTimeout(crefresh,80)},{passive:true});
 addEventListener('pointercancel',function(e){crelease();if(e.pointerType==='touch'){ctouch=false;root.classList.remove('cur-on');con=false}});addEventListener('blur',crelease);
 root.addEventListener('mouseleave',function(){root.classList.remove('cur-on');crelease()});
 root.addEventListener('mouseenter',function(){if(con)root.classList.add('cur-on')});
 document.addEventListener('mouseout',function(e){if(!e.relatedTarget){root.classList.remove('cur-on');crelease()}});
 document.addEventListener('dragstart',function(){root.classList.remove('cur-on');crelease()});
 document.addEventListener('dragend',function(){if(con)root.classList.add('cur-on')});
 document.addEventListener('visibilitychange',function(){if(document.hidden){root.classList.remove('cur-on');crelease()}});
 var cdl=document.querySelectorAll('dialog');function cchk(){root.classList.toggle('cur-off',[].some.call(cdl,function(d){return d.open}));setTimeout(crefresh,60)}
 if(window.MutationObserver)[].forEach.call(cdl,function(d){new MutationObserver(cchk).observe(d,{attributes:true,attributeFilter:['open']})});
}
/* services ticker: always long enough to fill any screen width, constant speed */
(function(){var tr=document.querySelector('.track'),g=tr&&tr.querySelector('.grp');if(!g||root.classList.contains('lite'))return;
 function fit(){var gw=g.getBoundingClientRect().width;if(gw<1)return;
  while(tr.children.length/2*gw<innerWidth*1.1&&tr.children.length<40){tr.appendChild(g.cloneNode(true));tr.appendChild(g.cloneNode(true))}
  tr.style.animationDuration=(tr.children.length/2*gw/55)+'s'}
 fit();addEventListener('resize',fit);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit)})();
/* offline support (only on https or localhost) */
if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost'||location.hostname==='127.0.0.1')){var hadC=!!navigator.serviceWorker.controller,rl=false;navigator.serviceWorker.addEventListener('controllerchange',function(){if(hadC&&!rl){rl=true;location.reload()}});addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){})})}
count();
})();
