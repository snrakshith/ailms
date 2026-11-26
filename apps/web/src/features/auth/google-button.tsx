import { useEffect, useRef, useState } from 'react';
import { config } from '../../config/env';

type CredentialResponse = { credential?: string };
type GoogleSDK = {
  accounts: {
    id: {
      initialize: (options: {
        client_id: string;
        callback: (response: CredentialResponse) => void;
        auto_select?: boolean;
        use_fedcm_for_prompt?: boolean;
      }) => void;
      renderButton: (
        parent: HTMLElement,
        options: {
          theme: 'outline';
          size: 'large';
          text: 'continue_with';
          shape: 'rectangular';
          width: number;
        },
      ) => void;
    };
  };
};
declare global {
  interface Window {
    google?: GoogleSDK;
  }
}
let scriptPromise: Promise<void> | null = null;
function loadGoogle() {
  if (window.google) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-aiquest-gis]');
    const script = existing ?? document.createElement('script');
    if (!existing) {
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.dataset.aiquestGis = 'true';
      document.head.appendChild(script);
    }
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener(
      'error',
      () => {
        scriptPromise = null;
        reject(new Error('Google sign-in is currently unavailable'));
      },
      { once: true },
    );
  });
  return scriptPromise;
}
export function GoogleButton({
  onCredential,
  textError,
}: {
  onCredential: (credential: string) => Promise<void>;
  textError?: (message: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    config.googleClientId ? 'loading' : 'error',
  );
  const onCredentialRef = useRef(onCredential);
  const errorRef = useRef(textError);
  useEffect(() => {
    onCredentialRef.current = onCredential;
    errorRef.current = textError;
  }, [onCredential, textError]);
  useEffect(() => {
    if (!config.googleClientId) return;
    let active = true;
    void loadGoogle()
      .then(() => {
        if (!active || !window.google || !ref.current) return;
        window.google.accounts.id.initialize({
          client_id: config.googleClientId,
          callback: (response) => {
            if (!response.credential) {
              errorRef.current?.('Google did not return a credential');
              return;
            }
            void onCredentialRef
              .current(response.credential)
              .catch((error) =>
                errorRef.current?.(
                  error instanceof Error ? error.message : 'Could not sign in with Google',
                ),
              );
          },
          auto_select: false,
        });
        ref.current.replaceChildren();
        window.google.accounts.id.renderButton(ref.current, {
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          shape: 'rectangular',
          width: 310,
        });
        setStatus('ready');
      })
      .catch(() => {
        if (active) setStatus('error');
      });
    return () => {
      active = false;
    };
  }, []);
  return (
    <div className="auth-google-wrap">
      <div ref={ref} className="auth-google-button" aria-label="Google sign in" />
      {status === 'loading' && <p className="auth-google-message">Loading Google sign-in…</p>}
      {status === 'error' && (
        <p className="auth-google-message">
          {config.googleClientId
            ? 'Google sign-in is unavailable right now.'
            : 'Google sign-in is available after the OAuth client ID is configured.'}
        </p>
      )}
    </div>
  );
}
