(function(){
'use strict';
var $=function(i){return document.getElementById(i)},dlg=$('cmd'),inp=$('cmdIn'),list=$('cmdList'),btn=$('cmdBtn'),root=document.documentElement,sel=0,shown=[];
if(!dlg||typeof dlg.showModal!=='function'){if(btn)btn.hidden=true;return}
function beh(){return root.classList.contains('lite')?'auto':'smooth'}
function go(s){return function(){var t=document.querySelector(s);if(t)t.scrollIntoView({behavior:beh()})}}
function click(id){return function(){var e=$(id);if(e)e.click()}}
function craft(n){return function(){var t=document.getElementById('tab-'+n);if(t)t.click();go('#crafts')()}}
var C=[
{t:'Go to Work',k:'portfolio projects selected',g:'Go to',f:go('#work')},
{t:'Video Editing craft',k:'film reel edit timeline',g:'Go to',f:craft('video')},
{t:'Website Development craft',k:'web code responsive',g:'Go to',f:craft('web')},
{t:'Graphic Design craft',k:'poster illustration paint',g:'Go to',f:craft('graphics')},
{t:'Branding & SEO craft',k:'brand identity seo search',g:'Go to',f:craft('brand')},
{t:'AI & Automation craft',k:'chatbot bot automate workflow',g:'Go to',f:craft('ai')},
{t:'Digital Marketing craft',k:'ads campaign growth email social',g:'Go to',f:craft('market')},
{t:'Go to Services',k:'brand website creative',g:'Go to',f:go('#services')},
{t:'Go to About',k:'studio',g:'Go to',f:go('#about')},
{t:'Go to Process',k:'steps workflow discover define',g:'Go to',f:go('#proc-h')},
{t:'Go to Questions',k:'faq help',g:'Go to',f:go('#faq')},
{t:'Start a project',k:'contact hire form message',g:'Action',f:go('#contact')},
{t:'Ask the assistant',k:'chat help question',g:'Action',f:click('chatFab')},
{t:'Toggle light or dark theme',k:'dark mode light night',g:'Action',f:click('themeBtn')},
{t:'Copy email address',k:'mail gmail',g:'Action',f:click('copyMail')},
{t:'Open Instagram',k:'social @voqen.studio',g:'Link',f:function(){window.open('https://www.instagram.com/voqen.studio/','_blank','noopener')}},
{t:'Back to top',k:'scroll up',g:'Action',f:function(){scrollTo({top:0,behavior:beh()})}}];
if(navigator.share)C.push({t:'Share this site',k:'send link',g:'Action',f:function(){navigator.share({title:document.title,url:location.href.split('#')[0]}).catch(function(){})}});
function mark(){
 [].forEach.call(list.children,function(li,i){li.setAttribute('aria-selected',i===sel)});
 var el=shown.length?$('cmd'+sel):null;
 if(el){inp.setAttribute('aria-activedescendant',el.id);if(el.scrollIntoView)el.scrollIntoView({block:'nearest'})}else inp.removeAttribute('aria-activedescendant')}
function run(i){var c=shown[i];if(!c)return;dlg.close();setTimeout(c.f,60)}
function render(){
 var q=inp.value.toLowerCase().trim();
 shown=C.filter(function(c){return !q||(c.t+' '+c.k).toLowerCase().indexOf(q)>-1});if(sel>=shown.length)sel=0;list.textContent='';
 shown.forEach(function(c,i){var li=document.createElement('li'),a=document.createElement('span'),g=document.createElement('span');
  li.id='cmd'+i;li.setAttribute('role','option');a.textContent=c.t;g.className='muted';g.textContent=c.g;li.appendChild(a);li.appendChild(g);
  li.addEventListener('click',function(){run(i)});li.addEventListener('pointermove',function(){if(sel!==i){sel=i;mark()}});list.appendChild(li)});
 if(!shown.length){var e=document.createElement('li');e.className='muted';e.textContent='No matches. Try “contact” or “theme”.';list.appendChild(e)}
 mark()}
function openP(){inp.value='';sel=0;render();dlg.showModal();inp.focus()}
inp.addEventListener('input',function(){sel=0;render()});
inp.addEventListener('keydown',function(e){
 if(e.key==='ArrowDown'&&shown.length){e.preventDefault();sel=(sel+1)%shown.length;mark()}
 else if(e.key==='ArrowUp'&&shown.length){e.preventDefault();sel=(sel-1+shown.length)%shown.length;mark()}
 else if(e.key==='Enter'){e.preventDefault();run(sel)}});
dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
document.addEventListener('keydown',function(e){if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();dlg.open?dlg.close():openP()}});
if(btn)btn.addEventListener('click',openP);
})();
