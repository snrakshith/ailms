import {Router} from 'express';
import {playgroundCompareSchema} from '@sapling/contracts';
import {compareTexts,confusionMatrix} from '@aiquest/learning-core';
import {validateBody} from '../../core/contracts/validate.js';
import {requireAuth} from '../../infrastructure/security/session.js';
export const codingChallenges=[
 {id:'python-mean',title:'Implement a mean function',level:'Beginner',track:'AI Foundations',description:'Implement mean(values) and return the arithmetic mean of a list of numbers.',starter:'def mean(values):\n    # TODO: return the arithmetic mean\n    pass\n',tests:'assert mean([1, 2, 3]) == 2\nassert mean([10]) == 10\nassert mean([-2, 2]) == 0'},
 {id:'python-sigmoid',title:'Build a sigmoid activation',level:'Intermediate',track:'Deep Learning',description:'Implement sigmoid(x) using Python and the math module.',starter:'import math\n\ndef sigmoid(x):\n    # TODO: implement sigmoid\n    pass\n',tests:'assert abs(sigmoid(0) - 0.5) < 0.0001\nassert sigmoid(2) > 0.8\nassert sigmoid(-2) < 0.2'},
 {id:'python-cosine',title:'Compute cosine similarity',level:'Intermediate',track:'Generative AI',description:'Implement cosine(a,b). Return 0 for a zero vector.',starter:'import math\n\ndef cosine(a, b):\n    # TODO: dot product divided by magnitude product\n    pass\n',tests:'assert abs(cosine([1,0],[1,0]) - 1) < 0.0001\nassert abs(cosine([1,0],[0,1])) < 0.0001\nassert cosine([0,0],[1,2]) == 0'},
];
export function createLabsRouter(){const router=Router();router.use(requireAuth);
 router.get('/challenges',(_req,res)=>res.json({data:codingChallenges}));
 router.post('/compare',validateBody(playgroundCompareSchema),(req,res)=>res.json({data:{...compareTexts(req.body.a,req.body.b),engine:'local-tf-vectorizer',disclaimer:'Educational lexical vectors, not a neural embedding model.'}}));
 router.post('/confusion',(_req,res)=>{
  const {actual,predicted}=req.body as {actual?:unknown;predicted?:unknown};
  if(!Array.isArray(actual)||!Array.isArray(predicted)||actual.length>200||!actual.every(v=>typeof v==='boolean')||!predicted.every(v=>typeof v==='boolean')){res.status(422).json({error:'Boolean arrays required (max 200)'});return;}
  try{res.json({data:confusionMatrix(actual,predicted)});}catch{res.status(422).json({error:'Non-empty, equal-length boolean arrays required'});}
 });
 return router;
}
