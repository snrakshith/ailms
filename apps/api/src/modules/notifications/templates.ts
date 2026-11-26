export type TemplateName='welcome'|'lesson-complete'|'purchase-confirmation'|'referral-qualified';
const escapeHtml=(text:string)=>text.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]??c));
export function renderEmail(template:TemplateName,inputs:Record<string,string>,origin:string){
 const name=inputs.name??'learner';const lesson=inputs.lesson??'your lesson';
 const options={
  welcome:{subject:'Welcome to AI Quest',body:`Hi ${name}, welcome! Start with AI Foundations and build a new skill one practical lesson at a time.`,href:'/app',action:'Start learning'},
  'lesson-complete':{subject:'A lesson mastered on AI Quest',body:`Nice work, ${name}! You completed ${lesson}. Keep practicing to strengthen your AI skills.`,href:'/progress',action:'See your progress'},
  'purchase-confirmation':{subject:'Your AI Quest learning pass is ready',body:`Hi ${name}, your payment for the GenAI learning pass has been verified. Access your learning path and download your receipt from Billing.`,href:'/billing',action:'View your purchase'},
  'referral-qualified':{subject:'A referral completed their first lesson',body:`Hi ${name}, someone you invited has completed their first AI Quest lesson. Thanks for helping a developer learn AI!`,href:'/referrals',action:'See referrals'},
 } as const;
 const t=options[template];const url=new URL(t.href,origin).href;
 const text=`${t.body}

${url}

AI Quest · Transactional notification`;
 const html=`<!doctype html><html><body style="margin:0;background:#f6f7f4;font-family:Arial,sans-serif;color:#14251f"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center" style="padding:40px 16px"><table role="presentation" width="540" style="max-width:100%;background:#fff;border:1px solid #e0e7e1;border-radius:14px"><tr><td style="padding:36px"><p style="font-size:14px;font-weight:700;letter-spacing:2px">AI QUEST</p><h1 style="font-size:25px;line-height:1.3">${escapeHtml(t.subject)}</h1><p style="line-height:1.7">${escapeHtml(t.body)}</p><p style="margin:30px 0"><a href="${escapeHtml(url)}" style="background:#19392f;color:white;padding:13px 19px;text-decoration:none;border-radius:8px">${t.action}</a></p><p style="color:#617168;font-size:12px">This is a transactional message about your AI Quest account.</p></td></tr></table></td></tr></table></body></html>`;
 return {subject:t.subject,text,html};
}
