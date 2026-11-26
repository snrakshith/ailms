import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { siteContent } from '../content/site-content';
import { useAuth } from '../../../core/auth/auth-context';
import { AlertBanner } from './alert-banner';

export function PublicLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() =>
        document.getElementById(location.hash.slice(1))?.scrollIntoView(),
      );
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);
  const { user } = useAuth();
  const { brand, nav, footer } = siteContent;
  return (
    <div className="mkt-site">
      <AlertBanner />
      <div className="mkt-beta-banner">
        <span className="mkt-beta-dot" />
        {brand.beta}{' '}
        <span className="mkt-banner-copy">
          An early learning experience for developers moving into AI.
        </span>
      </div>
      <header className="mkt-header">
        <div className="mkt-container mkt-header-inner">
          <Link to="/" className="mkt-logo" aria-label="AI Quest home">
            <span className="mkt-logo-mark">
              a<span>i</span>.
            </span>
            {brand.name}
          </Link>
          <nav
            className={menuOpen ? 'mkt-nav mkt-nav-open' : 'mkt-nav'}
            aria-label="Public navigation"
          >
            {nav.map((link) =>
              link.href.startsWith('/#') ? (
                <a onClick={() => setMenuOpen(false)} key={link.href} href={link.href}>
                  {link.label}
                </a>
              ) : (
                <NavLink onClick={() => setMenuOpen(false)} key={link.href} to={link.href}>
                  {link.label}
                </NavLink>
              ),
            )}
            <div className="mkt-mobile-actions">
              <Link onClick={() => setMenuOpen(false)} to={user ? '/app' : '/login'}>
                {user ? 'My dashboard' : 'Log in'}
              </Link>
            </div>
          </nav>
          <div className="mkt-header-actions">
            <Link to={user ? '/app' : '/login'} className="mkt-header-login">
              {user ? 'Dashboard' : 'Log in'}
            </Link>
            <Link
              className="mkt-button mkt-button-dark mkt-button-small"
              to={user ? '/app' : '/register'}
            >
              {user ? 'Keep learning' : 'Get started'} <ArrowRight size={16} />
            </Link>
          </div>
          <button
            className="mkt-menu-toggle"
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main-content">{children}</main>
      <footer className="mkt-footer">
        <div className="mkt-container">
          <div className="mkt-footer-grid">
            <div className="mkt-footer-brand">
              <Link to="/" className="mkt-logo">
                <span className="mkt-logo-mark">
                  a<span>i</span>.
                </span>
                {brand.name}
              </Link>
              <p>{footer.description}</p>
              <span className="mkt-beta-tag">{brand.beta}</span>
            </div>
            {footer.columns.map((column) => (
              <div className="mkt-footer-col" key={column.title}>
                <h3>{column.title}</h3>
                {column.links.map((link) => (
                  <Link key={link.href} to={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div className="mkt-footer-bottom">
            <span>
              © {new Date().getFullYear()} {brand.copyright}
            </span>
            <span>{footer.disclaimer}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
