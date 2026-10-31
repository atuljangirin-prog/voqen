(function(){var d=document.documentElement,t=null,fx=null,why='';
try{t=localStorage.getItem('voqen-theme');fx=localStorage.getItem('voqen-fx')}catch(e){}
var q=location.search.match(/[?&]fx=(on|off|auto)/);
if(q){fx=q[1]==='auto'?null:q[1];try{if(fx)localStorage.setItem('voqen-fx',fx);else localStorage.removeItem('voqen-fx')}catch(e){}}
if(t!=='dark'&&t!=='light')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
d.dataset.theme=t;d.classList.add('js');
var n=navigator.connection||{};
if(fx==='off')why='off';
else if(fx!=='on'){if(matchMedia('(prefers-reduced-motion: reduce)').matches)why='reduced';else if(n.saveData)why='savedata';else if(/2g/.test(n.effectiveType||''))why='2g'}
if(why){d.classList.add('lite');d.setAttribute('data-lite',why)}
if(fx==='on')d.classList.add('fx')})();
