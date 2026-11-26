// Disabled by default because private SaaS dashboards need explicit offline-data policy.
// Set VITE_ENABLE_PWA=true at build time to register the static-only offline fallback.
export function registerOfflineShell(){
 if(import.meta.env.PROD && import.meta.env.VITE_ENABLE_PWA==='true' && 'serviceWorker' in navigator){
  window.addEventListener('load',()=>{void navigator.serviceWorker.register('/sw.js').catch(error=>console.warn('SW registration failed',error));});
 }
}
