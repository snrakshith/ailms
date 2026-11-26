import {onCLS,onINP,onLCP} from 'web-vitals';
import * as Sentry from '@sentry/react';
import {config} from '../../config/env';
export function initializeObservability(){
 if(config.sentryDsn)Sentry.init({dsn:config.sentryDsn,environment:import.meta.env.MODE,release:config.release,tracesSampleRate:0.1});
 const report=(metric:{name:string;value:number;rating:string})=>{
  if(import.meta.env.DEV)console.info('[web-vital]',metric.name,metric.value,metric.rating);
  // Configure a Sentry project or custom RUM collector to persist metrics.
 };
 onCLS(report);onINP(report);onLCP(report);
 window.addEventListener('unhandledrejection',(event)=>{if(config.sentryDsn)Sentry.captureException(event.reason);});
}
