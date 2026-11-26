import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import { Providers } from './app/providers';
import { initializeObservability } from './core/observability/browser';
import './styles/index.css';
import './styles/learning.css';
import './styles/marketing.css';
import { registerOfflineShell } from './core/pwa/register';
initializeObservability();
registerOfflineShell();
const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');
createRoot(root).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
);
