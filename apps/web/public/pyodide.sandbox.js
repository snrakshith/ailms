/* This page must ONLY be loaded inside <iframe sandbox="allow-scripts">.
 * Its origin is opaque: no app cookies, local storage, or DOM access to the host.
 * A blob worker provides a separate termination boundary for untrusted examples.
 */
(() => {
  if (window.origin !== 'null') {
    document.body.textContent = 'Python sandbox requires an opaque-origin iframe.';
    return;
  }
  const SCRIPT = `
    const CDN='https://cdn.jsdelivr.net/pyodide/v0.27.7/full/';
    let pyodide;
    self.onmessage=async({data})=>{
      const {code,tests,nonce}=data;
      if(typeof code!=='string'||typeof tests!=='string'||code.length>12000||tests.length>4000){self.postMessage({nonce,ok:false,error:'Code size limit exceeded'});return;}
      try{
        if(!pyodide){importScripts(CDN+'pyodide.js');pyodide=await self.loadPyodide({indexURL:CDN});}
        let output='';
        pyodide.setStdout({batched:line=>{output=(output+line+'\\n').slice(0,4000);}});
        pyodide.setStderr({batched:line=>{output=(output+line+'\\n').slice(0,4000);}});
        const scope=pyodide.globals.get('dict')();
        try{
          await pyodide.runPythonAsync(code+'\\n'+tests,{globals:scope});
          self.postMessage({nonce,ok:true,message:'All formative tests passed',output:output.slice(0,5000)});
        }finally{scope.destroy();}
      }catch(error){self.postMessage({nonce,ok:false,error:String(error?.message??error).slice(0,2000)});}
    };
  `;
  let active = null;
  window.addEventListener('message', event => {
    if (event.source !== parent || event.data?.type !== 'aiquest:python:run') return;
    const {nonce,code,tests}=event.data;
    if(typeof nonce!=='string'||nonce.length>90)return;
    if(active){active.terminate();active=null;}
    const blob=new Blob([SCRIPT],{type:'text/javascript'});
    const url=URL.createObjectURL(blob);
    try{
      active=new Worker(url);
      active.onmessage=e=>{if(e.data?.nonce===nonce)parent.postMessage({type:'aiquest:python:result',...e.data},event.origin);};
      active.onerror=()=>parent.postMessage({type:'aiquest:python:result',nonce,ok:false,error:'Python runtime could not load'},event.origin);
      active.postMessage({code,tests,nonce});
    }catch(error){parent.postMessage({type:'aiquest:python:result',nonce,ok:false,error:String(error)},event.origin);}
    finally{URL.revokeObjectURL(url);}
  });
})();
