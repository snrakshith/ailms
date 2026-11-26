/** Deterministic AI-learning primitives. No Node, browser, React, or storage dependencies. */
export type ReviewRating='again'|'hard'|'good'|'easy';
export type ReviewPlan={repetitions:number;ease:number;intervalDays:number;dueAt:string};
export function planReview(prior:Pick<ReviewPlan,'repetitions'|'ease'|'intervalDays'>|null,rating:ReviewRating,now:Date):ReviewPlan{
  const score={again:1,hard:3,good:4,easy:5}[rating];
  const ease=Math.max(1.3,Math.round(((prior?.ease??2.5)+(0.1-(5-score)*(0.08+(5-score)*0.02)))*100)/100);
  const repetitions=rating==='again'?0:(prior?.repetitions??0)+1;
  const intervalDays=rating==='again'?1:repetitions===1?1:repetitions===2?6:Math.max(1,Math.round((prior?.intervalDays??6)*ease));
  const dueAt=new Date(now.getTime()+intervalDays*86400000).toISOString();
  return {repetitions,ease,intervalDays,dueAt};
}
export function cosineSimilarity(a:number[],b:number[]):number{
 if(a.length!==b.length||!a.length||a.some(v=>!Number.isFinite(v))||b.some(v=>!Number.isFinite(v)))throw new Error('Invalid vector dimensions');
 const dot=a.reduce((v,x,i)=>v+x*b[i],0);const normA=Math.hypot(...a),normB=Math.hypot(...b);
 return normA===0||normB===0?0:dot/(normA*normB);
}
export function tokenize(text:string):string[]{return (text.toLowerCase().normalize('NFKC').match(/[\p{L}\p{N}]+/gu)??[]).slice(0,1000);}
export function vectorize(texts:string[]):{vocabulary:string[];vectors:number[][]}{
 if(!texts.length||texts.length>20)throw new Error('Must compare 1 to 20 samples');
 const docs=texts.map(tokenize);const vocabulary=[...new Set(docs.flat())].sort().slice(0,600);
 const vectors=docs.map(tokens=>{const counts=new Map<string,number>();tokens.forEach(t=>counts.set(t,(counts.get(t)??0)+1));return vocabulary.map(word=>{const df=docs.filter(d=>d.includes(word)).length;return (counts.get(word)??0)*Math.log(1+(docs.length+1)/(df+1));});});
 return {vocabulary,vectors};
}
export function compareTexts(a:string,b:string):{similarity:number;tokensA:string[];tokensB:string[];common:string[]}{
 const {vectors}=vectorize([a,b]);const tokensA=tokenize(a),tokensB=tokenize(b);
 return {similarity:vectors[0].length?Math.round(cosineSimilarity(vectors[0],vectors[1])*1000)/1000:0,tokensA,tokensB,common:[...new Set(tokensA)].filter(t=>tokensB.includes(t))};
}
export function confusionMatrix(actual:boolean[],predicted:boolean[]):{tp:number;tn:number;fp:number;fn:number;accuracy:number;precision:number;recall:number;f1:number}{
 if(actual.length!==predicted.length||!actual.length)throw new Error('Labels must be equally sized and non-empty');
 let tp=0,tn=0,fp=0,fn=0;actual.forEach((a,i)=>{if(a&&predicted[i])tp++;else if(!a&&!predicted[i])tn++;else if(!a)fp++;else fn++;});
 const accuracy=(tp+tn)/actual.length,precision=tp/(tp+fp)||0,recall=tp/(tp+fn)||0;
 return {tp,tn,fp,fn,accuracy,precision,recall,f1:2*precision*recall/(precision+recall)||0};
}
export function gradientSteps(rate:number,steps:number,start=3):number[]{
 if(!Number.isFinite(rate)||rate<0||rate>2||!Number.isInteger(steps)||steps<0||steps>100)throw new Error('Invalid gradient parameters');
 const weights=[start];for(let i=0;i<steps;i++)weights.push(weights[i]-rate*2*weights[i]);return weights;
}
export type LearningSignal={lessonId:string;completed:boolean;scorePercent:number;dueAt?:string|null;attempts:number};
export function recommendNextLesson(signals:LearningSignal[],now=new Date()):string|null{
 const review=signals.filter(s=>s.completed&&s.dueAt&&new Date(s.dueAt).getTime()<=now.getTime())
   .sort((a,b)=>a.scorePercent-b.scorePercent||String(a.dueAt).localeCompare(String(b.dueAt)))[0];
 return review?.lessonId??signals.find(s=>!s.completed)?.lessonId??null;
}

/** Stable per-learner quiz ordering; IDs remain unchanged for authoritative server grading. */
export function presentQuestions<T extends {id:string;options:{id:string}[]}>(questions:T[],seed:string):T[]{
 let hash=2166136261;
 for(const char of seed){hash^=char.charCodeAt(0);hash=Math.imul(hash,16777619);}
 const random=()=>{hash^=hash<<13;hash^=hash>>>17;hash^=hash<<5;return (hash>>>0)/4294967296;};
 function shuffle<V>(items:V[]):V[]{const values=[...items];for(let i=values.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[values[i],values[j]]=[values[j],values[i]];}return values;}
 return shuffle(questions).map(q=>({...q,options:shuffle(q.options)}));
}

/** Local curriculum retrieval for fallback hints; avoids embedding a Node-specific vector DB. */
export function bestSectionIndex(sections:ReadonlyArray<{heading:string;body:string}>,question:string):number{
 if(!sections.length)return -1;
 const query=new Set(tokenize(question).filter(t=>t.length>3));
 const scores=sections.map((section,index)=>({index,score:tokenize(`${section.heading} ${section.body}`).reduce((sum,token)=>sum+(query.has(token)?1:0),0)}));
 scores.sort((a,b)=>b.score-a.score||a.index-b.index);
 return scores[0].index;
}
