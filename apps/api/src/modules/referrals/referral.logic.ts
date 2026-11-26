/** Cryptographically random bytes are supplied by the caller; no browser-specific dependency. */
const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export function makeReferralCode(bytes:Uint8Array):string{return [...bytes].map(b=>alphabet[b%alphabet.length]).join('');}
