import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
const words = {
  en: {
    overview: 'Overview',
    tasks: 'Tasks',
    activity: 'Activity',
    settings: 'Settings',
    signout: 'Sign out',
    welcome: 'Good to see you',
    allTasks: 'All tasks',
    done: 'Completed',
    inProgress: 'In progress',
    newTask: 'New task',
    title: 'Title',
    description: 'Description',
    create: 'Create task',
    empty: 'No tasks yet. Add one to start.',
    status: 'Status',
    delete: 'Delete',
    workspace: 'Workspace',
    dashboard: 'Workspace overview',
  },
  es: {
    overview: 'Resumen',
    tasks: 'Tareas',
    activity: 'Actividad',
    settings: 'Configuración',
    signout: 'Cerrar sesión',
    welcome: 'Bienvenido',
    allTasks: 'Todas las tareas',
    done: 'Completadas',
    inProgress: 'En progreso',
    newTask: 'Nueva tarea',
    title: 'Título',
    description: 'Descripción',
    create: 'Crear tarea',
    empty: 'Aún no hay tareas.',
    status: 'Estado',
    delete: 'Eliminar',
    workspace: 'Espacio de trabajo',
    dashboard: 'Resumen del espacio',
  },
} as const;
export type Locale = keyof typeof words;
export type TranslationKey = keyof typeof words.en;
const LocaleContext = createContext<
  | { locale: Locale; setLocale: (value: Locale) => void; t: (key: TranslationKey) => string }
  | undefined
>(undefined);
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    localStorage.getItem('sapling-locale') === 'es' ? 'es' : 'en',
  );
  const setLocale = useCallback((value: Locale) => {
    localStorage.setItem('sapling-locale', value);
    setLocaleState(value);
  }, []);
  const t = useCallback((key: TranslationKey) => words[locale][key], [locale]);
  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
export function useLocale() {
  const v = useContext(LocaleContext);
  if (!v) throw new Error('Missing LocaleProvider');
  return v;
}
