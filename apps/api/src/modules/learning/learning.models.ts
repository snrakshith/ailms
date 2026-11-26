import mongoose, {Schema} from 'mongoose';

const lessonCompletionSchema=new Schema({
  userId:{type:String,required:true,index:true},
  lessonId:{type:String,required:true},
  lessonVersion:{type:Number,required:true},
  xp:{type:Number,required:true,min:0},
  completedAt:{type:Date,required:true,default:Date.now},
},{versionKey:false});
lessonCompletionSchema.index({userId:1,lessonId:1},{unique:true});
lessonCompletionSchema.index({userId:1,completedAt:-1});

const lessonAttemptSchema=new Schema({
  userId:{type:String,required:true,index:true},
  lessonId:{type:String,required:true},
  lessonVersion:{type:Number,required:true},
  idempotencyKey:{type:String,required:true},
  answers:{type:Map,of:String,required:true},
  scorePercent:{type:Number,required:true},
  correctCount:{type:Number,required:true},
  totalQuestions:{type:Number,required:true},
  passed:{type:Boolean,required:true},
  feedback:[{questionId:String,correct:Boolean,correctOptionId:String,explanation:String}],
  attemptedAt:{type:Date,required:true,default:Date.now},
},{versionKey:false});
lessonAttemptSchema.index({userId:1,idempotencyKey:1},{unique:true});
lessonAttemptSchema.index({userId:1,lessonId:1,attemptedAt:-1});

export const LessonCompletionModel=mongoose.model('LessonCompletion',lessonCompletionSchema);
export const LessonAttemptModel=mongoose.model('LessonAttempt',lessonAttemptSchema);
