import posthog from 'posthog-js';
import mixpanel from 'mixpanel-browser';
import {config} from '../../config/env';
export type AnalyticsEvent='page_view'|'signed_in'|'registered'|'lesson_completed'|'checkout_started'|'referral_link_copied'|'experiment_exposed';
type Props=Record<string,string|number|boolean|null>;
const CONSENT_KEY='aiquest:analytics-consent:v1';
let initialized=false;
export function analyticsConsent(){try{return localStorage.getItem(CONSENT_KEY) as 'yes'|'no'|null;}catch{return null;}}
export function initAnalytics(){
 if(initialized||analyticsConsent()!=='yes')return;
 initialized=true;
 if(config.posthogKey)posthog.init(config.posthogKey,{api_host:config.posthogHost,autocapture:false,capture_pageview:false,disable_session_recording:true,person_profiles:'identified_only'});
 if(config.mixpanelToken)mixpanel.init(config.mixpanelToken,{track_pageview:false,persistence:'localStorage',autocapture:false,record_sessions_percent:0});
}
export function setAnalyticsConsent(allowed:boolean){
 try{localStorage.setItem(CONSENT_KEY,allowed?'yes':'no');}catch{/* storage unavailable */}
 if(allowed){initAnalytics();if(initialized){if(config.posthogKey)posthog.opt_in_capturing();if(config.mixpanelToken)mixpanel.opt_in_tracking();}}else {if(initialized){if(config.posthogKey){posthog.reset();posthog.opt_out_capturing();}if(config.mixpanelToken){mixpanel.reset();mixpanel.opt_out_tracking();}}initialized=false;}
 window.dispatchEvent(new Event('aiquest:consent'));
}
export function track(event:AnalyticsEvent,properties:Props={}){
 if(!initialized)return;
 // Explicit, low-cardinality events only. Never pass email, exercise answers, prompts, or payment identifiers.
 if(config.posthogKey)posthog.capture(event,properties);
 if(config.mixpanelToken)mixpanel.track(event,properties);
}
export function identifyLearner(userId:string|null){
 if(!initialized)return;
 if(userId){if(config.posthogKey)posthog.identify(userId);if(config.mixpanelToken)mixpanel.identify(userId);}
 else{if(config.posthogKey)posthog.reset();if(config.mixpanelToken)mixpanel.reset();}
}
export function experimentVariant(flag:string,fallback='control'){
 if(!initialized||!config.posthogKey)return fallback;
 const variant=posthog.getFeatureFlag(flag);
 return typeof variant==='string'?variant:fallback;
}
export function onExperimentFlags(callback:()=>void){if(!initialized||!config.posthogKey)return ()=>{};return posthog.onFeatureFlags(callback);}
