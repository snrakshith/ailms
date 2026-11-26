import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen } from 'lucide-react';
import { PublicLayout } from '../components/public-layout';
import { articleBySlug, siteContent } from '../content/site-content';
import { useDocumentTitle } from '../../../shared/hooks/use-document-title';
export function BlogPage() {
  useDocumentTitle('Journal', siteContent.journal.description);
  const journal = siteContent.journal;
  return (
    <PublicLayout>
      <section className="mkt-inner-hero mkt-container">
        <span className="mkt-eyebrow">{journal.eyebrow}</span>
        <h1>{journal.title}</h1>
        <p>{journal.description}</p>
      </section>
      <section className="mkt-container mkt-blog-grid">
        {siteContent.articles.map((article, index) => (
          <Link
            key={article.slug}
            className={`mkt-blog-card ${index === 0 ? 'mkt-blog-featured' : ''}`}
            to={`/blog/${article.slug}`}
          >
            <div className="mkt-blog-art" aria-hidden="true">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <BookOpen size={index === 0 ? 52 : 36} />
            </div>
            <div className="mkt-blog-card-copy">
              <span className="mkt-article-category">
                {article.category} · {article.minutes} min read
              </span>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <span className="mkt-inline-link">
                Read article <ArrowUpRight size={16} />
              </span>
            </div>
          </Link>
        ))}
      </section>
      <p className="mkt-container mkt-journal-note">{journal.newsletterNote}</p>
    </PublicLayout>
  );
}
export function BlogArticlePage() {
  const { slug = '' } = useParams();
  const article = articleBySlug(slug);
  useDocumentTitle(article?.title ?? 'Article not found', article?.description);
  if (!article) return <Navigate to="/blog" replace />;
  return (
    <PublicLayout>
      <article className="mkt-container mkt-blog-detail">
        <Link to="/blog" className="mkt-back-link">
          <ArrowLeft size={16} /> Back to journal
        </Link>
        <div className="mkt-article-category">
          {article.category} · {article.minutes} min read
        </div>
        <h1>{article.title}</h1>
        <p className="mkt-blog-dek">{article.description}</p>
        <div className="mkt-blog-byline">
          <span>{article.author}</span>
          <span>
            {new Date(article.published + 'T00:00:00').toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
        <div className="mkt-blog-prose">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          {article.sources?.length ? (
            <section className="mkt-article-sources">
              <h2>Further reading</h2>
              {article.sources.map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.label}
                  <ArrowUpRight size={14} />
                </a>
              ))}
            </section>
          ) : null}
        </div>
        <div className="mkt-article-end">
          <h3>Learning is a practice, not a race.</h3>
          <p>Start with one lesson and build your understanding from there.</p>
          <Link className="mkt-button mkt-button-dark" to="/register">
            Start learning free <ArrowRight size={16} />
          </Link>
        </div>
      </article>
    </PublicLayout>
  );
}
