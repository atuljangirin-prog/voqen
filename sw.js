/* VOQEN service worker: always tries the network first so a phone never mixes old and new files,
   and falls back to the cache when offline. Requests re-check with the server (no-cache) so browser caches cannot serve stale files. Bump V when you rename or restructure files. */
var V='voqen-v27',SHELL=['./','index.html','styles.css','script.js','chat.js','palette.js','art.js','crafts.js','crafts.css','theme.js','assets/voqen-logo.svg','assets/icon.svg'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(SHELL)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
 var r=e.request,u=new URL(r.url);
 if(r.method!=='GET'||u.origin!==location.origin)return;   /* never touch the form POST or third parties */
 e.respondWith(fetch(new Request(r,{cache:'no-cache'})).then(function(res){if(res&&res.ok){var c=res.clone();caches.open(V).then(function(x){x.put(r,c)})}return res}).catch(function(){
  return caches.match(r,{ignoreSearch:true}).then(function(m){return m||(r.mode==='navigate'?caches.match('index.html'):Response.error())})}));
});
