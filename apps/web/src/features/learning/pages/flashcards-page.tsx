import { useState } from 'react';
import { BrainCircuit, RotateCcw } from 'lucide-react';
import { Loading } from '../../../shared/components/ui/loading';
import { useDocumentTitle } from '../../../shared/hooks/use-document-title';
import { useDueFlashcards, useReviewFlashcard } from '../api/learning';

export function FlashcardsPage() {
  useDocumentTitle('Flashcards');
  const { data, isPending, error } = useDueFlashcards();
  const review = useReviewFlashcard();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  if (isPending) return <Loading />;
  if (error)
    return (
      <div className="aq-page">
        <p className="aq-error">{error.message}</p>
      </div>
    );
  const cards = data?.data ?? [];
  const card = cards[index];
  const rate = (rating: 'again' | 'hard' | 'good' | 'easy') => {
    if (!card) return;
    review.mutate(
      { id: card.id, rating },
      {
        onSuccess: () => {
          setFlipped(false);
          setIndex((value) => value + 1);
        },
      },
    );
  };
  return (
    <div className="aq-page aq-experience aq-flashcards">
      <span className="aq-kicker">SPACED PRACTICE</span>
      <h1>Course flashcards</h1>
      <p>
        Rate each answer to save a personal review schedule. Your next card appears when it is due.
      </p>
      {!card ? (
        <div className="aq-exp-card">
          <BrainCircuit size={28} />
          <h2>You are caught up.</h2>
          <p>There are no flashcards due right now. Explore the library for the full deck.</p>
        </div>
      ) : (
        <>
          <p className="aq-muted">
            Card {index + 1} of {cards.length} · {card.moduleId ?? 'Course review'}
          </p>
          <button
            type="button"
            className={`aq-flashcard ${flipped ? 'aq-flashcard-back' : ''}`}
            onClick={() => setFlipped(!flipped)}
          >
            <span>{flipped ? 'ANSWER' : 'QUESTION'}</span>
            <strong>{flipped ? card.back : card.front}</strong>
            <small>Tap to {flipped ? 'see question' : 'reveal answer'}</small>
          </button>
          {flipped && (
            <div className="aq-rate-row" role="group" aria-label="Rate recall">
              <button
                className="aq-outline"
                onClick={() => rate('again')}
                disabled={review.isPending}
              >
                Again
              </button>
              <button
                className="aq-outline"
                onClick={() => rate('hard')}
                disabled={review.isPending}
              >
                Hard
              </button>
              <button
                className="aq-primary"
                onClick={() => rate('good')}
                disabled={review.isPending}
              >
                Good
              </button>
              <button
                className="aq-outline"
                onClick={() => rate('easy')}
                disabled={review.isPending}
              >
                Easy
              </button>
            </div>
          )}
          <button className="aq-text-link" onClick={() => setFlipped(false)}>
            <RotateCcw size={15} /> Reset card
          </button>
        </>
      )}
    </div>
  );
}
