export type FeatureName='audit'|'theme'|'locales';
export const features:Record<FeatureName,boolean>={audit:true,theme:true,locales:true};
// Replace this static adapter with your signed, tenant-aware flag provider when required.
