import {useState} from 'react';
import {useAuth} from '../../../core/auth/auth-context';
import {useLocale} from '../../../core/i18n/locale';
import {useTheme} from '../../../core/theme/theme';
import {useDocumentTitle} from '../../../shared/hooks/use-document-title';
import {Button} from '../../../shared/components/ui/button';
import {GoogleButton} from '../../auth/google-button';
import {analyticsConsent,setAnalyticsConsent} from '../../../core/analytics/analytics';
export function SettingsPage(){
 useDocumentTitle('Settings');const {user,linkGoogle}=useAuth();const {locale,setLocale}=useLocale();const {theme,toggle}=useTheme();
 const [message,setMessage]=useState('');
 const [analyticsChoice,setAnalyticsChoice]=useState(analyticsConsent());
 const chooseAnalytics=(allowed:boolean)=>{setAnalyticsConsent(allowed);setAnalyticsChoice(allowed?'yes':'no');};
 const connectGoogle=async(credential:string)=>{setMessage('');await linkGoogle(credential);setMessage('Your Google account is now linked.');};
 return <><div className="page-header"><div><div className="eyebrow">PREFERENCES</div><h1>Settings</h1><p>Your learner profile and display preferences.</p></div></div><div className="settings-grid"><section className="panel settings-panel"><h2>Profile</h2><dl><dt>Name</dt><dd>{user?.name}</dd><dt>Email</dt><dd>{user?.email}</dd><dt>Role</dt><dd>{user?.role}</dd><dt>Account ID</dt><dd className="mono">{user?.tenantId}</dd></dl></section><section className="panel settings-panel"><h2>Appearance & language</h2><p>Personal preferences are stored locally in this browser.</p><div className="setting-row"><span>Theme <small>{theme} mode</small></span><Button variant="secondary" onClick={toggle}>Switch theme</Button></div><div className="setting-row"><span>Language <small>English or Español</small></span><select value={locale} aria-label="Choose language" onChange={e=>setLocale(e.target.value as 'en'|'es')}><option value="en">English</option><option value="es">Español</option></select></div></section><section className="panel settings-panel"><h2>Privacy & analytics</h2><p>Product analytics and A/B testing are optional. You can change your preference at any time. Declining does not affect course access.</p><div className="setting-row"><span>Analytics consent <small>{analyticsChoice==='yes'?'Allowed':analyticsChoice==='no'?'Declined':'Not selected'}</small></span><div className="settings-actions"><Button variant="secondary" onClick={()=>chooseAnalytics(false)}>Decline</Button><Button onClick={()=>chooseAnalytics(true)}>Allow</Button></div></div></section><section className="panel settings-panel"><h2>Sign in with Google</h2><p>Link a verified Google identity to this email account so you can use either sign-in method.</p>{user?.googleLinked?<p role="status">Google sign-in is linked.</p>:<GoogleButton onCredential={connectGoogle} textError={setMessage}/>} {message&&<p role="status">{message}</p>}</section></div></>;
}
