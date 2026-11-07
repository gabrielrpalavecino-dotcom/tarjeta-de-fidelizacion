
// Service worker: siempre intenta la red primero (para que las actualizaciones se vean al instante)
// y usa la copia guardada solo si no hay conexión. No toca nada que no sea de esta misma página (Supabase queda fuera).
const V='krusty-f1';
const SHELL=['./','index.html','tarjeta.html','themes.js','config.js','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>Promise.all(SHELL.map(u=>c.add(u).catch(()=>{})))))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(fetch(r,{cache:'no-cache'}).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res})
    .catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==='navigate'?caches.match(u.pathname.endsWith('tarjeta.html')?'tarjeta.html':'index.html'):null)||Response.error())));
});