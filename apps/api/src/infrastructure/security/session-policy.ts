/** Session generation revokes previously issued access tokens across devices. */
export function sessionVersionMatches(tokenValue:unknown, storedValue:unknown):boolean {
 return typeof tokenValue === 'number' && Number.isSafeInteger(tokenValue) && tokenValue >= 0 &&
   tokenValue === (typeof storedValue === 'number' ? storedValue : 0);
}
