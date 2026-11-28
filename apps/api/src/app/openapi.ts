export const openapi = {
  openapi: '3.1.0',
  info: {
    title: 'AI Quest Learning API',
    version: '1.0.0',
    description:
      'Developer-first AI learning API with server-graded lessons, identity, mastery and progress.',
  },
  servers: [{ url: '/api/v1' }],
  components: {
    securitySchemes: { cookieAuth: { type: 'apiKey', in: 'cookie', name: 'session' } },
  },
  paths: {
    '/auth/csrf': {
      get: {
        summary: 'Issue signed CSRF token',
        responses: { '200': { description: 'CSRF token' } },
      },
    },
    '/auth/register': {
      post: { summary: 'Register tenant owner', responses: { '201': { description: 'Created' } } },
    },
    '/auth/login': {
      post: { summary: 'Sign in', responses: { '200': { description: 'Authenticated' } } },
    },
    '/auth/google': {
      post: {
        summary: 'Verify a Google Identity Services ID token and start a web cookie session',
        responses: {
          '200': { description: 'Authenticated' },
          '409': { description: 'Explicit account linking required' },
        },
      },
    },
    '/auth/google/link': {
      post: {
        summary: 'Link a verified Google ID to the current password account',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Linked' } },
      },
    },
    '/auth/logout': {
      post: { summary: 'Sign out', responses: { '204': { description: 'No content' } } },
    },
    '/auth/me': {
      get: {
        summary: 'Current session',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Current user' } },
      },
    },
    '/tasks': {
      get: {
        summary: 'List tenant tasks',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Paginated task list' } },
      },
      post: {
        summary: 'Create task',
        security: [{ cookieAuth: [] }],
        responses: { '201': { description: 'Created' } },
      },
    },
    '/tasks/{id}': {
      patch: {
        summary: 'Update task',
        security: [{ cookieAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Updated' } },
      },
      delete: {
        summary: 'Delete task',
        security: [{ cookieAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: { '204': { description: 'Deleted' } },
      },
    },
    '/auth/onboarding': {
      put: {
        summary: 'Save learner goals and background',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Updated learner profile' } },
      },
    },
    '/learning/overview': {
      get: {
        summary: 'Learning dashboard and progress',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Overview' } },
      },
    },
    '/learning/paths': {
      get: {
        summary: 'List paths with learner progress',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Paths' } },
      },
    },
    '/learning/paths/{id}': {
      get: {
        summary: 'Get ordered lessons and locks',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Path' } },
      },
    },
    '/learning/lessons/{id}': {
      get: {
        summary: 'Get safe lesson content without answer key',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Lesson' } },
      },
    },
    '/learning/lessons/{id}/submit': {
      post: {
        summary: 'Grade answers and atomically unlock completion and XP',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Scored submission' } },
      },
    },
    '/billing/me': {
      get: {
        summary: 'Owned learning pass, server price and private recent order history',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Billing overview' } },
      },
    },
    '/billing/orders': {
      post: {
        summary: 'Create idempotent Cashfree checkout session; server calculates price',
        security: [{ cookieAuth: [] }],
        responses: {
          '201': { description: 'Cashfree session' },
          '409': { description: 'Already owned or duplicate closed order' },
        },
      },
    },
    '/billing/orders/{id}': {
      get: {
        summary: 'Read only your own payment order',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Order status' } },
      },
    },
    '/billing/orders/{id}/verify': {
      post: {
        summary: 'Reconcile your order with the Cashfree server before granting access',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Provider-verified status' } },
      },
    },
    '/billing/webhook': {
      post: {
        summary: 'Cashfree signed raw-body payment success webhook; no browser auth',
        responses: {
          '200': { description: 'Webhook accepted' },
          '401': { description: 'Invalid signature' },
        },
      },
    },
    '/learning/progress': {
      get: {
        summary: 'Aggregated mastery metrics',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Progress' } },
      },
    },
    '/native-auth/login': {
      post: {
        summary: 'Native mobile sign-in: access and rotating refresh token',
        responses: { '200': { description: 'Session' } },
      },
    },
    '/native-auth/google': {
      post: {
        summary: 'Verify Google identity and issue mobile access/refresh tokens',
        responses: { '200': { description: 'Session' } },
      },
    },
    '/native-auth/refresh': {
      post: {
        summary: 'Exchange one-time refresh token for a new native session',
        responses: { '200': { description: 'Rotated session' } },
      },
    },
    '/content/me': {
      get: {
        summary: 'Editorial permissions',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Permissions' } },
      },
    },
    '/content/lessons': {
      get: {
        summary: 'Editorial lesson list (allowlisted staff only)',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Content catalog' } },
      },
    },
    '/content/lessons/{id}/draft': {
      post: {
        summary: 'Save a validated versioned draft',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Draft saved' } },
      },
    },
    '/content/lessons/{id}/review': {
      post: {
        summary: 'Submit author draft for independent review',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Submitted' } },
      },
    },
    '/content/lessons/{id}/publish': {
      post: {
        summary: 'Independent reviewer publishes immutable release',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Published' } },
      },
    },
    '/reviews/due': {
      get: {
        summary: 'List due spaced-repetition reviews',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Due reviews' } },
      },
    },
    '/reviews/{lessonId}': {
      post: {
        summary: 'Record recall rating idempotently',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Review schedule' } },
      },
    },
    '/reviews/insights': {
      get: {
        summary: 'Review/retention analytics',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Insights' } },
      },
    },
    '/labs/challenges': {
      get: {
        summary: 'List formative Python exercises',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Challenges' } },
      },
    },
    '/labs/compare': {
      post: {
        summary: 'Compare local lexical vectors',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Cosine similarity' } },
      },
    },
    '/labs/confusion': {
      post: {
        summary: 'Compute confusion metrics from boolean labels',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Metrics' } },
      },
    },
    '/model-playground/models': {
      get: {
        summary: 'Configured hosted comparison models',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Availability' } },
      },
    },
    '/model-playground/compare': {
      post: {
        summary: 'Side-by-side hosted model inference',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Model responses' } },
      },
    },
    '/tutor/hints': {
      post: {
        summary: 'Curriculum-grounded hint with optional LLM provider',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Progressive hint' } },
      },
    },
    '/portfolio/projects': {
      get: {
        summary: 'List learner capstones',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Projects' } },
      },
      post: {
        summary: 'Create draft capstone',
        security: [{ cookieAuth: [] }],
        responses: { '201': { description: 'Created' } },
      },
    },
    '/public/portfolio/{slug}': {
      get: {
        summary: 'Public opt-in unverified learner showcase',
        responses: { '200': { description: 'Published project' } },
      },
    },
    '/privacy/export': {
      get: {
        summary: 'Export own learning data',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'JSON export' } },
      },
    },
    '/privacy/account': {
      delete: {
        summary: 'Delete own learner account after password or Google re-verification',
        security: [{ cookieAuth: [] }],
        responses: { '204': { description: 'Deleted' } },
      },
    },
    '/audit': {
      get: {
        summary: 'List owner audit events',
        security: [{ cookieAuth: [] }],
        responses: { '200': { description: 'Recent tenant audit events' } },
      },
    },
  },
} as const;
