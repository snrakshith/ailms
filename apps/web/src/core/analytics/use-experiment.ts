import {useEffect,useState} from 'react';
import {experimentVariant,onExperimentFlags,track} from './analytics';
export function useExperiment(flag:string,fallback='control'){
 const [variant,setVariant]=useState(fallback);
 useEffect(()=>{
  const refresh=()=>setVariant(experimentVariant(flag,fallback));refresh();
  const unsubscribe=onExperimentFlags(refresh);
  const listener=()=>{refresh();};window.addEventListener('aiquest:consent',listener);
  return ()=>{unsubscribe();window.removeEventListener('aiquest:consent',listener);};
 },[flag,fallback]);
 useEffect(()=>{if(variant!==fallback)track('experiment_exposed',{flag,variant});},[flag,variant,fallback]);
 return variant;
}
