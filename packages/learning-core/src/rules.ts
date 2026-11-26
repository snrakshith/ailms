/** Portable policy and grading algorithms. Canonical answers MUST remain server-side. */
export type AssessmentQuestion={id:string;correctOptionId:string;explanation:string};
export type GradeFeedback={questionId:string;correct:boolean;correctOptionId:string;explanation:string};
export function gradeAnswers(questions:ReadonlyArray<AssessmentQuestion>,answers:Record<string,string>,passPercent=65){
 if(questions.length===0||passPercent<1||passPercent>100)throw new Error('Invalid assessment configuration');
 const feedback:GradeFeedback[]=questions.map(q=>({questionId:q.id,correct:answers[q.id]===q.correctOptionId,correctOptionId:q.correctOptionId,explanation:q.explanation}));
 const correctCount=feedback.filter(v=>v.correct).length;
 const scorePercent=Math.round(correctCount/questions.length*100);
 return {feedback,correctCount,totalQuestions:questions.length,scorePercent,passed:scorePercent>=passPercent};
}
export function lessonUnlocked(lessonIds:ReadonlyArray<string>,targetId:string,completed:ReadonlySet<string>):boolean{
 const index=lessonIds.indexOf(targetId);return index===0||(index>0&&completed.has(lessonIds[index-1]));
}
export type DatedCompletion={lessonId:string;completedAt:Date;xp:number};
export function calculateUtcStreak(completions:ReadonlyArray<DatedCompletion>,now=new Date()):number{
 const days=new Set(completions.map(v=>v.completedAt.toISOString().slice(0,10)));
 const day=new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate()));
 if(!days.has(day.toISOString().slice(0,10)))day.setUTCDate(day.getUTCDate()-1);
 let streak=0;while(days.has(day.toISOString().slice(0,10))){streak++;day.setUTCDate(day.getUTCDate()-1);}return streak;
}
export function completionPercentage(completedCount:number,totalCount:number):number{return totalCount===0?0:Math.round(100*completedCount/totalCount);}
