import type { ReactNode } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  BookOpen,
  Compass,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Moon,
  Settings,
  Sun,
  Trophy,
  Zap,
  FlaskConical,
  Brain,
  FolderGit2,
  BookOpenText,
  WalletCards,
  UsersRound,
  Library,
  Layers,
} from 'lucide-react';
import { useAuth } from '../../core/auth/auth-context';
import { useTheme } from '../../core/theme/theme';
import { AlertBanner } from '../../features/marketing/components/alert-banner';
export function Shell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const nav = [
    { to: '/app', label: 'My dashboard', Icon: LayoutDashboard },
    { to: '/paths', label: 'Learning paths', Icon: Compass },
    { to: '/library', label: 'Resource library', Icon: Library },
    { to: '/flashcards', label: 'Course flashcards', Icon: Layers },
    { to: '/progress', label: 'My progress', Icon: Trophy },
    { to: '/review', label: 'Spaced revision', Icon: Brain },
    { to: '/labs', label: 'AI labs', Icon: FlaskConical },
    { to: '/portfolio', label: 'My capstones', Icon: FolderGit2 },
    { to: '/billing', label: 'Learning pass', Icon: WalletCards },
    { to: '/referrals', label: 'Invite friends', Icon: UsersRound },
    { to: '/studio', label: 'Content studio', Icon: BookOpenText },
    { to: '/settings', label: 'Settings', Icon: Settings },
  ];
  const here = location.pathname.startsWith('/learn/')
    ? 'Learning lab'
    : location.pathname.startsWith('/paths/')
      ? 'Path roadmap'
      : (nav.find((v) => v.to === location.pathname)?.label ?? 'AI Quest');
  return (
    <div className="aq-app-shell">
      <aside className="aq-sidebar" aria-label="Primary navigation">
        <NavLink to="/app" className="aq-brand">
          <span className="aq-brand-icon">
            <GraduationCap size={24} />
          </span>
          <span>
            ai<span className="aq-brand-strong">quest</span>
            <small>LEARN. BUILD. LEVEL UP.</small>
          </span>
        </NavLink>
        <div className="aq-sidebar-caption">YOUR LEARNING SPACE</div>
        <nav className="aq-nav">
          {nav.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              end={to === '/app'}
              to={to}
              className={({ isActive }) => `aq-nav-link ${isActive ? 'aq-nav-active' : ''}`}
            >
              <Icon size={19} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="aq-sidebar-spacer" />
        <div className="aq-sidebar-encourage">
          <div className="aq-encourage-icon">
            <Zap size={21} />
          </div>
          <strong>Little steps. Big breakthroughs.</strong>
          <p>Just ten focused minutes can move your AI skills forward.</p>
          <NavLink to="/paths">
            Explore paths <ArrowUpRight size={16} />
          </NavLink>
        </div>
        <div className="aq-sidebar-user">
          <span className="aq-avatar">{user?.name.charAt(0).toUpperCase()}</span>
          <span>
            <strong>{user?.name}</strong>
            <small>AI Explorer</small>
          </span>
        </div>
      </aside>
      <div className="aq-main-shell">
        <AlertBanner />
        <header className="aq-topbar">
          <span className="aq-breadcrumb">
            Learning space <span>/</span> <strong>{here}</strong>
          </span>
          <div className="aq-top-actions">
            <span className="aq-top-streak">
              <BookOpen size={16} /> Keep curious
            </span>
            <button onClick={toggle} className="aq-icon-button" aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <button
              className="aq-logout"
              onClick={async () => {
                await logout();
                navigate('/login');
              }}
            >
              <LogOut size={16} />
              <span>Sign out</span>
            </button>
          </div>
        </header>
        <main id="main-content" className="aq-main">
          {children}
        </main>
        <footer className="aq-footer">
          AI Quest · Developer-first AI learning <span>Built with React + Node.js</span>
        </footer>
      </div>
    </div>
  );
}
