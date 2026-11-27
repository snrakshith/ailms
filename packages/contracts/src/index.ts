import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z
    .string()
    .trim()
    .email()
    .max(254)
    .transform((value) => value.toLowerCase()),
  password: z.string().min(12).max(128),
  referralCode: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z2-9]{6,12}$/)
    .optional()
    .or(z.literal('')),
});
export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) });
export const taskStatus = z.enum(['todo', 'in_progress', 'done']);
export const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(160),
  description: z.string().trim().max(2000).default(''),
  status: taskStatus.default('todo'),
});
export const updateTaskSchema = createTaskSchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, { message: 'At least one field is required' });
export const taskQuerySchema = z.object({
  cursor: z
    .string()
    .regex(/^[a-f0-9]{24}$/i)
    .optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: taskStatus.optional(),
});
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type TaskStatus = z.infer<typeof taskStatus>;
export type CreateTaskInput = z.input<typeof createTaskSchema>;
export type UpdateTaskInput = z.input<typeof updateTaskSchema>;
export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
};
export type User = {
  id: string;
  name: string;
  email: string;
  tenantId: string;
  role: 'owner' | 'member';
  googleLinked?: boolean;
  onboarding?: LearnerOnboarding | null;
};
export type TaskList = { data: Task[]; nextCursor: string | null };
export type ApiError = {
  type: string;
  title: string;
  status: number;
  detail: string;
  requestId?: string;
  errors?: unknown;
};

// AI Quest learning domain — shared runtime validation and API types.
export const onboardingSchema = z
  .object({
    background: z.enum(['frontend', 'backend', 'fullstack', 'other']),
    familiarity: z.enum(['new', 'exploring', 'experienced']),
    goal: z.enum(['ai-foundations', 'machine-learning', 'genai-engineering']),
    dailyMinutes: z.union([z.literal(10), z.literal(20), z.literal(30)]),
  })
  .strict();
export type LearnerOnboarding = z.infer<typeof onboardingSchema>;
export const submissionSchema = z
  .object({
    answers: z
      .record(z.string().min(1).max(80), z.string().min(1).max(80))
      .refine((v) => Object.keys(v).length <= 12, 'Too many answers'),
    idempotencyKey: z.string().uuid(),
  })
  .strict();
export type SubmissionInput = z.infer<typeof submissionSchema>;
export type LessonQuestion = {
  id: string;
  prompt: string;
  options: { id: string; label: string }[];
  explanation?: never;
};
export type LessonSection = { heading: string; body: string; code?: string; callout?: string };
export type LessonResource = {
  id: string;
  title: string;
  kind: 'code' | 'notebook';
  filename: string;
};
export type LessonSummary = {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  xp: number;
  order: number;
  completed: boolean;
  unlocked: boolean;
};
export type LearningPath = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  level: string;
  color: string;
  lessonCount: number;
  estimatedMinutes: number;
  completedLessons: number;
  progressPercent: number;
  lessons?: LessonSummary[];
  requiresPurchase?: boolean;
  purchaseUnlocked?: boolean;
};
export type LessonDetail = {
  id: string;
  pathId: string;
  title: string;
  description: string;
  durationMinutes: number;
  xp: number;
  version: number;
  objectives: string[];
  sections: LessonSection[];
  questions: LessonQuestion[];
  resources: LessonResource[];
  completed: boolean;
  nextLessonId: string | null;
  pathTitle: string;
};
export type LearningStats = {
  completedLessons: number;
  totalLessons: number;
  totalXp: number;
  streakDays: number;
  timeInvestedMinutes: number;
  masteredSkills: string[];
};
export type LearningOverview = {
  stats: LearningStats;
  recommendedPath: LearningPath;
  paths: LearningPath[];
  recentCompletions: { lessonId: string; title: string; completedAt: string; xp: number }[];
};
export type AssessmentFeedback = {
  questionId: string;
  correct: boolean;
  correctOptionId: string;
  explanation: string;
};
export type SubmissionResult = {
  attemptId: string;
  passed: boolean;
  scorePercent: number;
  correctCount: number;
  totalQuestions: number;
  feedback: AssessmentFeedback[];
  awardedXp: number;
  alreadyCompleted: boolean;
  stats: LearningStats;
};

// P1 extensible, cross-platform contracts. Input validation belongs at API boundaries.
export const reviewedContentSchema = z
  .object({
    title: z.string().trim().min(5).max(150),
    description: z.string().trim().min(10).max(700),
    objectives: z.array(z.string().trim().min(5).max(220)).min(1).max(8),
    sections: z
      .array(
        z
          .object({
            heading: z.string().trim().min(3).max(160),
            body: z.string().trim().min(30).max(5000),
            code: z.string().max(2500).optional(),
            callout: z.string().max(700).optional(),
          })
          .strict(),
      )
      .min(1)
      .max(12),
    questions: z
      .array(
        z
          .object({
            id: z.string().regex(/^q\d+$/),
            prompt: z.string().trim().min(10).max(500),
            options: z
              .array(
                z.object({ id: z.string().max(8), label: z.string().min(1).max(300) }).strict(),
              )
              .min(2)
              .max(5),
            correctOptionId: z.string().max(8),
            explanation: z.string().min(10).max(800),
          })
          .strict(),
      )
      .min(1)
      .max(12),
  })
  .strict()
  .superRefine((value, ctx) => {
    value.questions.forEach((q, index) => {
      if (!q.options.some((o) => o.id === q.correctOptionId))
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Question ${index + 1} has no correct option`,
        });
      if (new Set(q.options.map((o) => o.id)).size !== q.options.length)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Question ${index + 1} has duplicate options`,
        });
    });
    if (new Set(value.questions.map((q) => q.id)).size !== value.questions.length)
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Duplicate question identifiers' });
  });
export type ReviewedContent = z.infer<typeof reviewedContentSchema>;
export const reviewRatingSchema = z
  .object({ rating: z.enum(['again', 'hard', 'good', 'easy']), idempotencyKey: z.string().uuid() })
  .strict();
export const hintRequestSchema = z
  .object({
    lessonId: z.string().trim().min(1).max(100),
    question: z.string().trim().min(1).max(700),
    stage: z.number().int().min(1).max(3).default(1),
  })
  .strict();
export const projectSchema = z
  .object({
    title: z.string().trim().min(5).max(130),
    summary: z.string().trim().min(30).max(2000),
    repositoryUrl: z
      .string()
      .url()
      .max(600)
      .refine((v) => v.startsWith('https://'), 'HTTPS URL required')
      .optional()
      .or(z.literal('')),
    demoUrl: z
      .string()
      .url()
      .max(600)
      .refine((v) => v.startsWith('https://'), 'HTTPS URL required')
      .optional()
      .or(z.literal('')),
    track: z.enum(['machine-learning', 'genai-engineering', 'ai-foundations']),
    skills: z.array(z.string().trim().min(2).max(50)).min(1).max(15),
    reflection: z.string().trim().min(30).max(3000),
  })
  .strict();
export type ProjectInput = z.infer<typeof projectSchema>;
export const projectStatusSchema = z.enum(['draft', 'submitted', 'published']);
export const playgroundCompareSchema = z
  .object({ a: z.string().min(1).max(3000), b: z.string().min(1).max(3000) })
  .strict();
export const deleteAccountSchema = z
  .object({
    password: z.string().min(1).optional(),
    googleCredential: z.string().min(100).max(12000).optional(),
    confirmation: z.literal('DELETE MY ACCOUNT'),
  })
  .strict()
  .refine(
    (value) => Boolean(value.password || value.googleCredential),
    'Password or freshly verified Google credential is required',
  );

export type ReviewDue = {
  lessonId: string;
  title: string;
  dueAt: string;
  intervalDays: number;
  repetitions: number;
  lastScore: number;
  attempts: number;
};
export type ReviewInsights = {
  dueCount: number;
  reviewedCount: number;
  totalCompleted: number;
  nextRecommendedReview: string | null;
  upcoming: ReviewDue[];
};
export type LabChallenge = {
  id: string;
  title: string;
  description: string;
  level: string;
  track: string;
  starter: string;
  tests: string;
};
export type TutorHintResponse = { answer: string; provider: string; remaining: number };
export type CapstoneProject = ProjectInput & {
  id: string;
  slug: string;
  status: z.infer<typeof projectStatusSchema>;
  publishedAt?: string;
  updatedAt?: string;
};
export type TextComparison = {
  similarity: number;
  tokensA: string[];
  tokensB: string[];
  common: string[];
  engine: string;
  disclaimer: string;
};
export type ModelComparison = {
  results: {
    model: string;
    text?: string;
    error?: string;
    latencyMs: number;
    totalTokens?: number | null;
  }[];
  remaining: number;
  disclaimer: string;
};
export type StaffPermission = { canAuthor: boolean; canReview: boolean };

// Billing is server-owned. The client only sends product ID and a purchase idempotency key.
export const checkoutSchema = z
  .object({
    productId: z.literal('genai-track-pass'),
    customerPhone: z.string().regex(/^[6-9]\d{9}$/),
    idempotencyKey: z.string().uuid(),
  })
  .strict();
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type CheckoutSession = {
  orderId: string;
  paymentSessionId: string;
  environment: 'sandbox' | 'production';
};
export type PaymentState = 'creating' | 'pending' | 'paid' | 'expired' | 'failed';
export type PaymentOrder = {
  orderId: string;
  productId: string;
  amountPaise: number;
  currency: 'INR';
  status: PaymentState;
  createdAt?: string;
};
export type BillingOverview = {
  enabled: boolean;
  environment: 'sandbox' | 'production';
  product: {
    id: 'genai-track-pass';
    title: string;
    description: string;
    amountPaise: number;
    currency: 'INR';
    kind: 'one_time';
    owned: boolean;
  };
  orders: PaymentOrder[];
};

export type ReferralOverview = {
  code: string;
  inviteUrl: string;
  signups: number;
  qualified: number;
};
export type InvoiceAvailability = { orderId: string; status: 'paid'; downloadPath: string };
