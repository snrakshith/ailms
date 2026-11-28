import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, registerSchema } from '@sapling/contracts';
import type { LoginInput, RegisterInput } from '@sapling/contracts';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, BookOpen, Check, ShieldCheck, LockKeyhole } from 'lucide-react';
import { useAuth } from '../../../core/auth/auth-context';
import { useDocumentTitle } from '../../../shared/hooks/use-document-title';
import { GoogleButton } from '../google-button';

function safeReturnTo(value: string | null) {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.includes('\\'))
    return '/app';
  const route = value.split(/[?#]/)[0];
  return [
    '/app',
    '/learn',
    '/paths',
    '/billing',
    '/labs',
    '/portfolio',
    '/review',
    '/progress',
    '/settings',
  ].some((prefix) => route === prefix || route.startsWith(prefix + '/'))
    ? value
    : '/app';
}
function LoginForm({ onError }: { onError: (message: string) => void }) {
  const { login } = useAuth();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });
  const submit = form.handleSubmit(async (value) => {
    onError('');
    try {
      await login(value);
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Unable to sign in');
    }
  });
  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor="sign-in-email">
        Email address
        <input
          id="sign-in-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          {...form.register('email')}
        />
        <small>{form.formState.errors.email?.message}</small>
      </label>
      <label htmlFor="sign-in-password">
        Password
        <input
          id="sign-in-password"
          type="password"
          autoComplete="current-password"
          placeholder="Your password"
          {...form.register('password')}
        />
        <small>{form.formState.errors.password?.message}</small>
      </label>
      <button className="auth-primary-action" type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? 'Signing you in…' : 'Sign in with email'}
        <ArrowRight size={17} />
      </button>
    </form>
  );
}
function RegisterForm({
  onError,
  referralCode,
}: {
  onError: (message: string) => void;
  referralCode?: string;
}) {
  const { register } = useAuth();
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', referralCode: referralCode ?? '' },
  });
  const submit = form.handleSubmit(async (value) => {
    onError('');
    try {
      await register(value);
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Unable to register');
    }
  });
  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor="register-name">
        Full name
        <input
          id="register-name"
          autoComplete="name"
          placeholder="Your name"
          {...form.register('name')}
        />
        <small>{form.formState.errors.name?.message}</small>
      </label>
      <label htmlFor="register-email">
        Email address
        <input
          id="register-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          {...form.register('email')}
        />
        <small>{form.formState.errors.email?.message}</small>
      </label>
      <label htmlFor="register-password">
        Create password
        <input
          id="register-password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 12 characters"
          {...form.register('password')}
        />
        <small>{form.formState.errors.password?.message}</small>
      </label>
      <label htmlFor="register-referral">
        Referral code (optional)
        <input
          id="register-referral"
          autoComplete="off"
          placeholder="Invite code"
          {...form.register('referralCode')}
          onChange={(e) => form.setValue('referralCode', e.target.value.toUpperCase())}
        />
        <small>{form.formState.errors.referralCode?.message}</small>
      </label>
      <button className="auth-primary-action" type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? 'Creating your account…' : 'Create free account'}
        <ArrowRight size={17} />
      </button>
    </form>
  );
}
export function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  const { user, googleLogin } = useAuth();
  const [error, setError] = useState('');
  const [params] = useSearchParams();
  const next = safeReturnTo(params.get('next'));
  const referralCode = params.get('ref')?.toUpperCase() || undefined;
  const isLogin = mode === 'login';
  useDocumentTitle(isLogin ? 'Sign in' : 'Create account');
  if (user) return <Navigate to={next} replace />;
  const switchParams = new URLSearchParams();
  if (params.has('next')) switchParams.set('next', next);
  if (referralCode) switchParams.set('ref', referralCode);
  const switchHref = `${isLogin ? '/register' : '/login'}${switchParams.size ? `?${switchParams.toString()}` : ''}`;
  return (
    <div className="auth-page-v2">
      <div className="auth-left">
        <header className="auth-top">
          <Link className="mkt-logo" to="/">
            <span className="mkt-logo-mark">
              a<span>i</span>.
            </span>
            aiquest
          </Link>
          <Link className="auth-back-home" to="/">
            Explore the website <ArrowUpRight size={15} />
          </Link>
        </header>
        <div className="auth-content">
          <div className="auth-form-card">
            <span className="mkt-eyebrow">YOUR LEARNING SPACE</span>
            <h1>{isLogin ? 'Welcome back' : 'Become an AI builder'}</h1>
            <p className="auth-card-subtitle">
              {isLogin
                ? 'Pick up where you left off. Your next AI breakthrough is waiting.'
                : 'Start with the fundamentals. Make progress at your own pace, for free.'}
            </p>
            <div className="auth-segmented" role="group" aria-label="Account access">
              <Link
                className={isLogin ? 'active' : ''}
                to={`/login${switchParams.size ? `?${switchParams.toString()}` : ''}`}
              >
                Sign in
              </Link>
              <Link
                className={!isLogin ? 'active' : ''}
                to={`/register${switchParams.size ? `?${switchParams.toString()}` : ''}`}
              >
                Create account
              </Link>
            </div>
            {isLogin ? (
              <LoginForm onError={setError} />
            ) : (
              <RegisterForm onError={setError} referralCode={referralCode} />
            )}
            {error && (
              <p role="alert" className="auth-inline-error">
                {error}
              </p>
            )}
            <div className="auth-divider">
              <span>or continue with</span>
            </div>
            <GoogleButton
              onCredential={async (credential) => {
                await googleLogin(credential);
                if (referralCode) {
                  try {
                    await import('../../../core/api/client').then(({ api }) =>
                      api('/referrals/claim', {
                        method: 'POST',
                        body: JSON.stringify({ code: referralCode }),
                      }),
                    );
                  } catch {
                    /* claim is optional and does not block login */
                  }
                }
              }}
              textError={setError}
            />
            <p className="auth-switch-v2">
              {isLogin ? 'New to AI Quest?' : 'Already learning with us?'}{' '}
              <Link to={switchHref}>{isLogin ? 'Create a free account' : 'Sign in instead'}</Link>
            </p>
          </div>
        </div>
        <footer className="auth-legal">
          <span>
            <LockKeyhole size={13} /> Secure HttpOnly session
          </span>
          <span>© {new Date().getFullYear()} AI Quest · Beta</span>
        </footer>
      </div>
      <aside className="auth-story" aria-label="What you can learn">
        <div className="auth-story-inner">
          <span className="auth-story-eyebrow">
            <span />
            LEARN. EXPERIMENT. BUILD.
          </span>
          <h2>
            From developer.
            <br />
            <em>To AI builder.</em>
          </h2>
          <p>
            The practical path from software engineering to machine learning and modern generative
            AI.
          </p>
          <div className="auth-story-lesson">
            <div className="auth-story-lesson-top">
              <span>
                <BookOpen size={15} /> YOUR FIRST LESSON
              </span>
              <span>FREE</span>
            </div>
            <h3>From rules to learning</h3>
            <p>A better mental model for how AI systems actually work.</p>
            <div className="auth-story-progress">
              <div />
            </div>
            <div className="auth-story-micro">
              <span>
                <Check size={14} /> AI Foundations
              </span>
              <span>8 minutes</span>
            </div>
          </div>
          <div className="auth-story-footer">
            <ShieldCheck size={18} /> Real progress, not just course completion.
          </div>
        </div>
      </aside>
    </div>
  );
}
