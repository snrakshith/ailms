import type {LessonSection, LessonQuestion} from '@sapling/contracts';

type Question = {id:string;prompt:string;options:{id:string;label:string}[];correctOptionId:string;explanation:string};
export type CatalogLesson = {
  id:string;pathId:string;title:string;description:string;durationMinutes:number;xp:number;version:number;
  objectives:string[];sections:LessonSection[];questions:Question[];
};
export type CatalogPath = {
  id:string;title:string;subtitle:string;description:string;icon:string;level:string;color:string;lessons:CatalogLesson[];
};
function question(prompt:string, choices:[string,string,string], correct:number, explanation:string):Omit<Question,'id'> {
  return {prompt,options:choices.map((label,index)=>({id:String.fromCharCode(97+index),label})),correctOptionId:String.fromCharCode(97+correct),explanation};
}
function lesson(id:string,title:string,description:string,minutes:number,objectives:string[],sections:LessonSection[],questions:Omit<Question,'id'>[]):CatalogLesson {
  return {id,pathId:'',title,description,durationMinutes:minutes,xp:50,version:1,objectives,sections,
    questions:questions.map((q,index)=>({...q,id:`q${index+1}`}))};
}
function path(meta:Omit<CatalogPath,'lessons'>, lessons:CatalogLesson[]):CatalogPath {
  return {...meta,lessons:lessons.map(item=>({...item,pathId:meta.id}))};
}
export const catalog:CatalogPath[] = [
  path({id:'ai-foundations',title:'AI Foundations',subtitle:'Think like an AI engineer',description:'Translate what you already know about software into the language of models, data, and evaluation.',icon:'sparkles',level:'Start here',color:'mint'},[
    lesson('ai-vs-software','From rules to learning','Understand how learned systems differ from code you write explicitly.',8,
      ['Distinguish rule-based software from learned behavior','Recognize where ML is useful'],[
      {heading:'Your code writes the rules. ML learns patterns.',body:'In traditional software, you specify the algorithm that transforms input into output. In machine learning, you define a learning process and supply examples. The resulting model approximates a mapping from inputs to outputs.'},
      {heading:'The developer’s mental model',body:'Think of a trained model as a versioned dependency whose behavior comes from data and optimization, not only source code.',code:'// Traditional program\nfunction label(score) {\n  return score > 80 ? "high" : "low";\n}\n// Learned model\nconst label = model.predict(features);',callout:'Models still need regular software: validation, tests, deployment, monitoring, and rollback.'}], [
      question('Which part primarily determines a trained model’s behavior?', ['Training data and learned parameters','Only hand-written if statements','CSS and frontend state'],0,'Parameters are updated during training from examples and an optimization objective.'),
      question('A fixed tax rule such as 8% of subtotal is best implemented with…',['A large language model','A deterministic function','A neural network with many layers'],1,'Explicit deterministic business rules are often more reliable and testable.'),
      question('What remains important after a model is trained?',['No further engineering is needed','Only UI colors matter','Monitoring inputs and outcomes in production'],2,'Real-world data changes and model behavior can degrade.')]),
    lesson('data-and-features','Data is your new API','Explore examples, labels, features, and data leakage.',10,
      ['Identify input features and target labels','Spot a basic leakage scenario'],[
      {heading:'Examples are contracts',body:'An ML dataset resembles an API contract: rows are examples; columns are features; a label is the target you want the system to predict. Input quality strongly affects output quality.'},
      {heading:'Beware of future knowledge',body:'Data leakage occurs when a training feature includes information unavailable at prediction time. It can make an offline model look brilliant and a production model fail.',code:'const example = {\n  sessions_last_week: 7, // known today\n  plan_type: "pro",       // known today\n  cancelled_next_month: 0 // future label!\n};'}], [
      question('In a churn predictor, the churn outcome is typically the…',['Feature','Target label','Hyperparameter'],1,'The outcome is what the model learns to predict.'),
      question('Which feature is likely to leak future information?', ['Past login count','Current subscription tier','Refund issued after cancellation'],2,'A future refund would not be available when the prediction is made.'),
      question('Why split training and test data?', ['To measure generalization on unseen examples','To make the dataset look bigger','To remove the need for evaluation'],0,'Holdout examples approximate how the model will behave beyond the training sample.')]),
    lesson('model-lifecycle','The model lifecycle','Connect training, evaluation, inference, and monitoring.',11,
      ['Describe training versus inference','Choose a meaningful evaluation strategy'],[
      {heading:'Build, measure, operate',body:'First collect and prepare data, train a model, evaluate it on unseen examples, then deploy it for inference. Continue monitoring errors, drift, cost, and safety.'},
      {heading:'Evaluation is a product decision',body:'Accuracy is not always sufficient. For rare fraud cases, precision and recall may matter more. For generative answers, task-specific quality and human review may be necessary.',callout:'A good model is not necessarily a good product. Reliability, latency, privacy and usability also matter.'}], [
      question('What is inference?', ['Updating a model with training examples','Using a trained model to predict an output','Collecting a fresh dataset'],1,'Inference runs the already trained model on new input.'),
      question('When fraud cases are rare, why can accuracy mislead?', ['Most cases are not fraud','Accuracy is always zero','Precision and recall cannot be calculated'],0,'Predicting "not fraud" all the time can appear accurate yet fail the task.'),
      question('After deployment, what should you monitor?', ['Only code formatting','Only model file size','Error rates, drift and latency'],2,'Operational metrics reveal failures that offline metrics miss.')]),
  ]),
  path({id:'machine-learning',title:'Machine Learning',subtitle:'From data to predictions',description:'Understand predictive modeling, training loops, and trustworthy evaluation through a developer-first lens.',icon:'chart',level:'Core skills',color:'violet'},[
    lesson('supervised-learning','Supervised learning','Learn the difference between regression and classification.',9,
      ['Identify regression and classification','Understand what targets represent'],[
      {heading:'Two common problem shapes',body:'Regression predicts a continuous numeric value such as price. Classification predicts a category such as spam or not-spam. Both learn from labeled examples.'},
      {heading:'A pipeline is a repeatable program',body:'A model pipeline transforms features consistently at training and prediction time. Version inputs and preprocessing so that results are reproducible.',code:'features -> preprocessing -> model -> prediction'}], [
      question('Predicting an apartment price is…',['Regression','Classification','Clustering'],0,'The target is a continuous amount.'),
      question('Predicting whether an email is spam is…',['Regression','Classification','Sorting'],1,'The target is a discrete class.'),
      question('Why reuse the same preprocessing at inference?', ['To maximize file size','To make training slower','To preserve feature meaning and scale'],2,'Inconsistent transforms cause training-serving skew.')]),
    lesson('train-test-split','Train, validate, test','Prevent misleading results with correct data splits.',11,
      ['Explain the role of validation','Avoid tuning on the test split'],[
      {heading:'Treat the test set as a final exam',body:'Training data updates model parameters. Validation data helps choose hyperparameters. Test data estimates performance once choices are settled.'},
      {heading:'Time changes the split',body:'For time-based predictions, randomly mixing the future into the past can leak information. Use chronological splits when deployment predicts future events.',callout:'Do not repeatedly optimize your model against the held-out test set.'}], [
      question('Which split helps choose hyperparameters?', ['Training','Validation','Final test'],1,'Validation guides choices while preserving a final independent assessment.'),
      question('For future sales forecasts, which split is often appropriate?', ['Chronological','Always random','Alphabetical'],0,'Temporal splits avoid learning from future observations.'),
      question('Repeatedly selecting models by test-set performance leads to…',['Better independence','Perfect generalization','Test-set overfitting'],2,'The test set loses its independence when used for tuning.')]),
    lesson('gradient-descent','Gradient descent intuition','See why learning rates and loss functions matter.',12,
      ['Describe a loss function','Explain small versus large learning rates'],[
      {heading:'A numerical optimization loop',body:'A loss function measures how wrong a model is. Gradient descent adjusts parameters in the direction of decreasing loss. Step size is controlled by the learning rate.'},
      {heading:'Debugging intuition',body:'If training loss decreases extremely slowly, the learning rate may be too small. If loss oscillates or grows, updates might be too large, though other bugs are possible.',code:'for (let step = 0; step < maxSteps; step++) {\n  gradient = differentiate(loss, weights);\n  weights = weights - learningRate * gradient;\n}'}], [
      question('A loss function measures…',['Model error for an objective','The number of frontend routes','Database query duration only'],0,'A loss describes the objective that optimization tries to reduce.'),
      question('An excessively large learning rate can…',['Guarantee fast convergence','Overshoot or diverge','Eliminate the training dataset'],1,'Very large parameter updates can jump past useful solutions.'),
      question('Gradient descent changes…',['Only dataset names','Only test scores','Model parameters'],2,'Optimization updates the learned parameters.')]),
  ]),
  path({id:'genai-engineering',title:'Generative AI',subtitle:'Ship systems with LLMs',description:'Bridge application engineering with prompts, embeddings, RAG, evaluations and production safeguards.',icon:'bot',level:'Build & ship',color:'peach'},[
    lesson('llm-building-blocks','How LLM apps work','Understand tokens, context windows, and sampling.',10,
      ['Explain token-based generation','Recognize context limitations'],[
      {heading:'An LLM is a probabilistic component',body:'A language model generates output tokens conditioned on its input context. It is not a database, a deterministic rules engine, or a guaranteed source of truth.'},
      {heading:'Architect around constraints',body:'Context length, latency, model cost, output format and privacy become system-level requirements. Treat model outputs as untrusted input.',code:'request -> context assembly -> model -> validation -> response'}], [
      question('A model context window limits…',['How much content can be considered in a request','Number of browser tabs','Number of users in a database'],0,'Models have finite context capacity.'),
      question('LLM output should be treated as…',['Always correct JSON','Untrusted data to validate','A privileged SQL query'],1,'Validate format, constraints and permissions before using generated content.'),
      question('Why is temperature relevant?', ['It encrypts prompts','It controls network speed','It influences sampling variability'],2,'Sampling parameters influence output distribution, not factual correctness.')]),
    lesson('embeddings-rag','Embeddings and RAG','Ground responses with retrieved source material.',12,
      ['Explain semantic embeddings','Outline a retrieval-augmented generation pipeline'],[
      {heading:'Search by meaning',body:'Embeddings map text to numerical vectors. Similar vectors often represent related meaning, making them useful for retrieving relevant passages.'},
      {heading:'Retrieve, then generate',body:'A RAG system chunks and indexes source documents, retrieves relevant passages per user query, and supplies them to the model. This helps grounding but does not guarantee truth.',code:'documents -> chunks -> embeddings -> index\nquery -> retrieve -> prompt -> LLM -> cited answer',callout:'Always check tenant permissions before supplying retrieved documents to a model.'}], [
      question('Embeddings are commonly used to…',['Represent semantic similarity','Guarantee an answer is true','Store passwords'],0,'Vector similarity helps locate semantically related text.'),
      question('In RAG, retrieval usually happens…',['After showing the final answer','Before generation','Only during user registration'],1,'The model receives relevant retrieved context before generating.'),
      question('What does RAG not guarantee?', ['Access to context','Ability to search','Complete factual correctness'],2,'Retrieved material can be wrong or misinterpreted.')]),
    lesson('evaluate-genai','Evaluate before shipping','Learn golden datasets, traces, and prompt-injection defense.',13,
      ['Design simple evaluation cases','Identify prompt-injection risks'],[
      {heading:'Treat prompts like production code',body:'Keep prompt versions and reproducible test cases. Evaluate correctness, citation quality, harmful failure modes and cost with representative inputs.'},
      {heading:'Security is part of the architecture',body:'Retrieved web pages and user documents may contain malicious instructions. Never let lower-trust text change system permissions or trigger tool actions without authorization.',callout:'A robust GenAI app combines validation, least-privilege tools, monitoring, and human escalation for high-stakes cases.'}], [
      question('A golden evaluation set contains…',['Representative inputs and expected behavior','Only the latest frontend screenshots','An unlimited GPU budget'],0,'Fixed representative cases make regressions visible.'),
      question('A retrieved document saying "ignore system rules" is…',['A trusted instruction','Untrusted content','A database migration'],1,'Retrieved text must not override application instructions.'),
      question('Why record model and prompt versions?', ['To improve CSS layout','To remove latency entirely','To reproduce and compare results'],2,'Versioning supports repeatable evaluations and debugging.')]),
  ]),
];

export const allLessons = catalog.flatMap(path=>path.lessons);
export function findLesson(id:string):CatalogLesson|undefined {return allLessons.find(lesson=>lesson.id===id);}
export function findPath(id:string):CatalogPath|undefined {return catalog.find(path=>path.id===id);}
export function publicQuestions(questions:Question[]):LessonQuestion[] {
  return questions.map(({id,prompt,options})=>({id,prompt,options}));
}
