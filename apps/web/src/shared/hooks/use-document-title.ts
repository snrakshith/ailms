import { useEffect } from 'react';
export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = `${title} · AI Quest`;
    const meta = document.querySelector<HTMLMetaElement>('meta[name=description]');
    if (meta)
      meta.content =
        description ?? 'AI Quest: practical AI, ML and Generative AI learning for developers.';
  }, [title, description]);
}
