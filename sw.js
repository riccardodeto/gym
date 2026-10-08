const CACHE = 'forge-gym-static-v2';
const ROOT = new URL('./', self.location.href);
const STATIC = [
  './','./index.html','./styles.css','./theme.css','./seed.js','./core.js','./app.js','./manifest.webmanifest',
  './assets/icons/icon-192.png','./assets/icons/icon-512.png','./assets/icons/apple-touch-icon.png',
  ...['treadmill','sphinx','chest-machine','pulldown','leg-press','shoulder-press','triceps-cable','biceps-cable','standing-curl','leg-extension','crunch','chest-dumbbells','lat-machine','hack-squat','lateral-raise','french-press','ez-curl','seated-curl'].map(n => './assets/exercises/'+n+'.webp')
];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC.map(s=>new URL(s,ROOT).href))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('forge-gym-static-')&&k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()]));
});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
 if(request.mode==='navigate'){
   event.respondWith(fetch(request).catch(()=>caches.match(new URL('./index.html',ROOT).href)));
   return;
 }
 event.respondWith(caches.match(request).then(match=>match||fetch(request).then(res=>{
   if(res.ok&&new URL(request.url).pathname.startsWith(ROOT.pathname)){
     const copy=res.clone();caches.open(CACHE).then(cache=>cache.put(request,copy));
   }
   return res;
 })));
});
