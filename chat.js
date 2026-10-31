(function(){
'use strict';
var $=function(id){return document.getElementById(id)},root=document.documentElement,EMAIL='voqen.studio.in@gmail.com',IG='https://www.instagram.com/voqen.studio/';
var fab=$('chatFab'),panel=$('chat'),log=$('chatLog'),form=$('chatForm'),inp=$('chatIn'),chips=$('chatChips'),hist=[],busy=false,greeted=false;
var FORM={l:'Open contact form',h:'#contact'};
var KB=[
{k:['hello','hi','hey','namaste','good morning'],a:'Hi! I can answer questions about VOQEN’s services, process and how to start a project. What would you like to know?'},
{k:['services','service','offer','what do you do','help with','provide','capabilities'],a:'We offer Brand Identity (with SEO foundations), Website Design & Development, Creative Direction, Digital Content & Visual Design, Video Editing, Graphic Design, AI & Automation (including chatbots) and Digital Marketing. You can try a demo of each in the Crafts section.',act:[{l:'See services',h:'#services'}]},
{k:['brand','branding','logo','identity','guidelines','typography','colour','color','rebrand','refresh','stationery'],a:'Brand Identity covers visual systems, brand direction, typography and cohesive identity design. In the project form you can choose logo design, a visual identity system, brand guidelines, typography & colour palette, a brand refresh, or stationery & collateral.',act:[{l:'Request brand identity',t:'Brand Identity: Visual identity system',h:'#contact'}]},
{k:['website','websites','web','develop','development','responsive','landing','webpage'],a:'Website Design & Development means responsive, accessible, modern websites built around your business objectives.',act:[{l:'Request a website',t:'Website Design & Development',h:'#contact'},{l:'See the web craft',h:'#crafts',tab:'web'}]},
{k:['video','videos','editing','edit','film','reel','footage','youtube','motion','colour grading','color grading','video editing'],a:'Yes, Video Editing is one of our crafts: pacing and rhythm, colour grading, motion titles and sound mix for brand films, reels and social video. You can scrub a demo timeline in the Crafts section.',act:[{l:'Request video editing',t:'Video Editing',h:'#contact'},{l:'Try the timeline',h:'#crafts',tab:'video'}]},
{k:['graphic design','graphic','graphics design','poster','flyer','banner','thumbnail','illustration','print'],a:'Graphic Design is one of our crafts: posters, social graphics, illustration and brand assets with a bold point of view. Try the painting artboard in the Crafts section.',act:[{l:'Request graphic design',t:'Graphic Design',h:'#contact'},{l:'Try the artboard',h:'#crafts',tab:'graphics'}]},
{k:['creative direction','art direction','storytelling','campaign','creative'],a:'Creative Direction is visual storytelling, art direction and cohesive digital presentation, so everything your brand shows the world feels connected.',act:[{l:'Request creative direction',t:'Creative Direction',h:'#contact'}]},
{k:['content','social media','graphics','posts','visual design','assets','digital content'],a:'Digital Content & Visual Design covers social media graphics, digital campaigns and visual assets.',act:[{l:'Request digital content',t:'Digital Content & Visual Design',h:'#contact'}]},
{k:['plan my project','plan','guide me','help me start','get a quote','estimate','plan a project'],flow:1,a:'Happy to help you plan it. I’ll ask a few quick questions and fill in the contact form for you. Nothing is sent until you review it and press Send. Type “cancel” anytime. What do you need?'},
{k:['price','pricing','cost','how much','quote','charge','rate','fee','budget','afford','cheap'],a:'We don’t publish fixed prices because every project is different. The contact form has budget ranges (from under ₹5,000 upward), or you can enter your own amount in ₹ or $, and we’ll reply by email.',act:[{l:'Share your budget',h:'#contact'}]},
{k:['how long','timeline','deadline','turnaround','duration','delivery time','how many days','how many weeks','fast','quickly'],a:'Timelines depend on the scope, so we don’t quote a standard turnaround. Tell us your goals and any deadline in the form and we’ll discuss what’s realistic.',act:[FORM]},
{k:['process','steps','workflow','how do you work','how it works','approach','stages'],a:'Our process has four steps. 01 Discover: understand the brand, audience, goals and requirements. 02 Define: set the creative direction, structure and visual approach. 03 Design & Build: turn the approved direction into a refined, responsive experience. 04 Deliver: test, refine and prepare for launch.'},
{k:['start','begin','hire','get started','work with you','book','inquiry','enquiry','new project','start a project'],a:'Just send a message with the contact form. Tell us what you’re building, pick a project type, and add a budget if you like. We’ll reply by email.',act:[{l:'Start a project',h:'#contact'}]},
{k:['contact','email','mail','reach','talk','call','phone','whatsapp','number'],a:'You can email us at '+EMAIL+' or use the contact form. We haven’t published a phone number.',act:[{l:'Email us',h:'mailto:'+EMAIL},FORM]},
{k:['instagram','insta','follow','handle'],a:'You can find us on Instagram at @voqen.studio.',act:[{l:'Open Instagram',h:IG,ext:1}]},
{k:['portfolio','examples','example','samples','clients','case studies','past work','selected work'],a:'The three projects on this site (Maren Goods, Plot and Halflight) are concept projects we created to show our approach. They are not real clients. Tap any card to read more.',act:[{l:'See selected work',h:'#work'}]},
{k:['where','location','office','based','city','country'],a:'We haven’t published an office location. The best way to reach us is by email or the contact form.',act:[FORM]},
{k:['team','founder','owner','people','who are you','about','studio'],a:'VOQEN Studio is a contemporary creative studio. We bring clarity, intention and creativity to digital experiences and focus on the details that make a brand recognizable, credible and worth remembering. We haven’t published team details here.'},
{k:['apps','mobile app','photography','ecommerce','shopify','wordpress'],a:'That isn’t one of our listed services (Brand Identity, Website Design & Development, Creative Direction, Digital Content & Visual Design). If you’re unsure it fits, choose “Not sure yet” in the form and describe what you need.',act:[{l:'Describe your project',t:'Not sure yet',h:'#contact'}]},
{k:['privacy','data','safe','spam','details'],a:'Details you send through the form are used only to respond to your inquiry.'},
{k:['help with ai','ai automation','automation','automate','automations','chatbot','chatbots','chat bot','assistant','workflow','workflows','machine learning'],a:'Yes, AI & Automation is one of our crafts: chatbots, AI assistants and workflows that answer questions, capture leads and hand off to your team. Try the live demo in the Crafts section.',act:[{l:'Request automation',t:'AI & Automation (chatbots)',h:'#contact'},{l:'Try the demo',h:'#crafts',tab:'ai'}]},
{k:['help with seo','do seo','seo','search engine','search engines','google ranking','ranking','rank','keywords','meta description','page title'],a:'SEO foundations are part of our Branding & Identity craft: a clear name and message, page titles and descriptions, and a search-friendly structure. We can’t promise rankings. Try the search preview in the Crafts section.',act:[{l:'Request branding & SEO',t:'Branding, Identity & SEO',h:'#contact'},{l:'Try the search preview',h:'#crafts',tab:'brand'}]},
{k:['help with marketing','digital marketing','marketing','advertising','ads','google ads','social media marketing','campaign','campaigns','leads','growth','email marketing','newsletter'],a:'Digital Marketing is one of our crafts: campaigns across search, social and email, content planning and reporting. We don’t promise specific results. Try the planner in the Crafts section.',act:[{l:'Request marketing',t:'Digital Marketing',h:'#contact'},{l:'Try the planner',h:'#crafts',tab:'market'}]},
{k:['human','person','real','robot','bot'],a:'I’m an automated assistant. For anything specific, email '+EMAIL+' and someone from the studio will reply.',act:[{l:'Email us',h:'mailto:'+EMAIL}]},
{k:['thanks','thank','thx','great','awesome','cool'],a:'You’re welcome! Anything else I can help with?'}
],FALL={a:'I’m not sure about that one. The studio can answer it directly. Email '+EMAIL+' or send a message through the form.',act:[{l:'Email us',h:'mailto:'+EMAIL},FORM]};
var QS=['What services do you offer?','How does your process work?','How much does it cost?','Plan my project'],DEF=['Plan my project','How does your process work?'],NEXT={services:['Tell me about brand identity','How much does it cost?'],brand:['How much does it cost?','Plan my project'],website:['How much does it cost?','Plan my project'],price:['Plan my project','How long does it take?'],process:['How do I start a project?','Plan my project'],start:['Plan my project','How much does it cost?']};

function lev(a,b){var m=[],i,j;for(i=0;i<=a.length;i++)m[i]=[i];for(j=1;j<=b.length;j++)m[0][j]=j;for(i=1;i<=a.length;i++)for(j=1;j<=b.length;j++)m[i][j]=Math.min(m[i-1][j]+1,m[i][j-1]+1,m[i-1][j-1]+(a[i-1]===b[j-1]?0:1)),i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1]&&(m[i][j]=Math.min(m[i][j],m[i-2][j-2]+1));return m[a.length][b.length]}
function norm(s){return s.toLowerCase().replace(/[^a-z0-9\u20b9$&\s]/g,' ').replace(/\s+/g,' ').trim()}
function answer(q){var n=norm(q),toks=n.split(' '),best=null,bs=0;
 KB.forEach(function(e){var sc=0;e.k.forEach(function(k){
  if(k.indexOf(' ')>-1){if(n.indexOf(k)>-1)sc+=k.split(' ').length}
  else if(toks.some(function(t){return t===k||(k.length>=4&&t.indexOf(k)===0)||(k.length>=5&&t.length>=5&&lev(t,k)<=1)}))sc+=1});
  if(sc>bs){bs=sc;best=e}});
 return best||FALL}

function go(a){
 if(a.tab){var tb=document.getElementById('tab-'+a.tab);if(tb)tb.click()}
 if(a.t){var s=$('type'),o=[].slice.call(s.options).filter(function(x){return x.text===a.t})[0];if(o){s.value=o.value||o.text;s.dispatchEvent(new Event('input',{bubbles:true}))}}
 closeChat(false);var t=document.querySelector(a.h||'#contact');if(t)t.scrollIntoView({behavior:root.classList.contains('lite')?'auto':'smooth'})}
function add(role,text,acts){
 var m=document.createElement('div'),p=document.createElement('p');m.className='msg '+(role==='user'?'me':'bot');p.textContent=text;m.appendChild(p);
 if(acts&&acts.length){var d=document.createElement('div');d.className='acts';
  acts.forEach(function(a){var el;
   if(a.h&&a.h.charAt(0)!=='#'){el=document.createElement('a');el.href=a.h;if(a.ext){el.target='_blank';el.rel='noopener noreferrer'}}
   else{el=document.createElement('button');el.type='button';el.addEventListener('click',function(){a.q?send(a.q):go(a)})}
   el.textContent=a.l;d.appendChild(el)});m.appendChild(d)}
 log.appendChild(m);log.scrollTop=log.scrollHeight;return m}

function send(q){
 q=q.trim();if(!q||busy)return;busy=true;add('user',q);hist.push({role:'user',content:q});inp.value='';chips.hidden=true;
 if(flow){flowStep(q);return}
 var typ=add('bot','…');typ.classList.add('typing');
 function done(a,acts){typ.remove();add('bot',a,acts);hist.push({role:'assistant',content:a});busy=false}
 function local(){var e=answer(q);setTimeout(function(){
  if(e.flow){typ.remove();hist.push({role:'assistant',content:e.a});startFlow(e.a);return}
  var nx=(NEXT[e.k&&e.k[0]]||DEF).slice(0,2).map(function(x){return{l:x,q:x}});done(e.a,(e.act||[]).concat(nx))},350)}
 var ep=((document.querySelector('meta[name="chat-endpoint"]')||{}).content||'').trim();
 if(!ep){local();return}
 var ac=new AbortController(),to=setTimeout(function(){ac.abort()},20000);
 fetch(ep,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:hist.slice(-8)}),signal:ac.signal})
  .then(function(r){if(!r.ok)throw 0;return r.json()})
  .then(function(j){clearTimeout(to);if(!j||!j.reply)throw 0;done(String(j.reply).slice(0,1500),[{l:'Start a project',h:'#contact'}])})
  .catch(function(){clearTimeout(to);local()});
}
var SV=['Brand Identity','Website Design & Development','Creative Direction','Digital Content & Visual Design','Video Editing','Graphic Design','AI & Automation (chatbots)','Digital Marketing','Not sure yet'],flow=null;
function qs(a){return a.map(function(x){return{l:x,q:x}})}
function bud(){return [].map.call($('budget').options,function(o){return o.text}).filter(function(t){return t!=='Enter my own amount'})}
function say(t,acts){setTimeout(function(){add('bot',t,acts);busy=false},250)}
function startFlow(intro){flow={s:'svc',d:{}};add('bot',intro,qs(SV));busy=false}
function fillForm(d){
 function set(id,v,ev){var el=$(id);el.value=v;el.dispatchEvent(new Event(ev||'input',{bubbles:true}))}
 set('type',d.svc==='Brand Identity'?'Brand Identity: Visual identity system':d.svc);
 if(d.amt){set('budget','Custom','change');set('currency',d.cur,'change');set('amount',d.amt)}else set('budget',d.bud||'','change');
 set('name',d.name);set('email',d.email);if(d.msg)set('message',d.msg)}
function flowStep(q){
 var l=q.toLowerCase().trim(),d=flow.d;
 if(/^(cancel|stop|exit|quit)$/.test(l)){flow=null;say('No problem, I’ve cancelled that. Ask me anything else.');return}
 if(flow.s==='svc'){var m=SV.filter(function(x){return l.indexOf(x.toLowerCase().split(' ')[0])>-1})[0];
  if(!m){say('Please pick one of these so I can point you to the right service.',qs(SV));return}
  d.svc=m;flow.s='bud';say('Got it: '+m+'. Do you have a budget in mind? Pick a range, or type an amount like 30000 (₹) or $500.',qs(bud()));return}
 if(flow.s==='bud'){var o=bud().filter(function(x){return x.toLowerCase()===l})[0],n=l.match(/^([₹$]|rs\.?\s*)?\s*(\d[\d,]*(?:\.\d+)?)$/);
  if(o)d.bud=o==='Prefer not to say'?'':o;
  else if(n){d.amt=n[2].replace(/,/g,'');d.cur=n[1]==='$'?'$':'₹'}
  else if(/skip|prefer|no budget|not sure/.test(l))d.bud='';
  else{say('Please choose a range, or type an amount like 30000 or $500.',qs(bud()));return}
  flow.s='name';say('Thanks. What’s your name?');return}
 if(flow.s==='name'){if(q.trim().length<2){say('Could you tell me your name?');return}d.name=q.trim().slice(0,80);flow.s='email';say('Nice to meet you, '+d.name.split(' ')[0]+'. What email address can we reply to?');return}
 if(flow.s==='email'){if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(q.trim())){say('That doesn’t look like a valid email. Could you check it?');return}d.email=q.trim();flow.s='msg';say('Last one: describe your project in a sentence, or type “skip”.');return}
 d.msg=/^skip$/i.test(l)?'':q.trim().slice(0,1500);fillForm(d);flow=null;
 say('All set. I’ve filled in the contact form with your details. Please review it, tick the consent box and press Send. Nothing has been sent yet.',[{l:'Review & send',h:'#contact'}])}
function greet(){greeted=true;add('bot','Hi, I’m the VOQEN assistant. Ask me about our services, process or budget, or let me plan your project and fill in the form for you.');
 chips.textContent='';chips.hidden=false;QS.forEach(function(q){var b=document.createElement('button');b.type='button';b.textContent=q;b.addEventListener('click',function(){send(q)});chips.appendChild(b)})}
function openChat(){
 panel.hidden=false;var nd0=$('chatNudge');if(nd0)nd0.hidden=true;fab.setAttribute('aria-expanded','true');root.classList.add('chat-open');
 if(!greeted)greet();
 inp.focus()}
function closeChat(ret){panel.hidden=true;fab.setAttribute('aria-expanded','false');root.classList.remove('chat-open');if(ret!==false)fab.focus()}
fab.addEventListener('click',function(){panel.hidden?openChat():closeChat()});
$('chatX').addEventListener('click',function(){closeChat()});
form.addEventListener('submit',function(e){e.preventDefault();send(inp.value)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!panel.hidden)closeChat()});
$('chatNew').addEventListener('click',function(){log.textContent='';hist=[];flow=null;busy=false;greet();inp.focus()});
var nd=$('chatNudge');
if(nd&&!root.classList.contains('lite')){var seen=false;try{seen=sessionStorage.getItem('voqen-nudge')}catch(e){}
 if(!seen)setTimeout(function(){if(!panel.hidden)return;nd.hidden=false;try{sessionStorage.setItem('voqen-nudge','1')}catch(e){}setTimeout(function(){nd.hidden=true},9000)},20000);
 nd.addEventListener('click',function(){nd.hidden=true;openChat()})}
})();
