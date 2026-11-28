import { useMemo, useState } from 'react';
import { Play, RotateCcw, SlidersHorizontal } from 'lucide-react';

// A safe, dependency-free interactive lab: no arbitrary code execution.
export function gradientWeight(initial: number, learningRate: number, step: number): number {
  return initial * Math.pow(1 - 2 * learningRate, step);
}
export function GradientDescentLab() {
  const [rate, setRate] = useState(0.2);
  const [steps, setSteps] = useState(4);
  const trajectory = useMemo(
    () => Array.from({ length: steps + 1 }, (_, i) => gradientWeight(3, rate, i)),
    [rate, steps],
  );
  const last = trajectory.at(-1) ?? 3;
  const converging = rate > 0 && rate < 1;
  const curve = Array.from({ length: 81 }, (_, i) => {
    const x = -4 + i / 10;
    return `${i === 0 ? 'M' : 'L'} ${180 + x * 38} ${164 - x * x * 9}`;
  }).join(' ');
  const trail = trajectory
    .map((x, i) => `${i === 0 ? 'M' : 'L'} ${180 + x * 38} ${164 - x * x * 9}`)
    .join(' ');
  return (
    <section className="aq-mini-lab" aria-label="Interactive gradient descent lab">
      <div className="aq-lab-header">
        <span className="aq-kicker">
          <SlidersHorizontal size={15} /> INTERACTIVE EXPERIMENT
        </span>
        <h2>Watch a model learn</h2>
        <p>
          Change the learning rate to see how quickly a single parameter approaches the minimum of a
          simple loss function.
        </p>
      </div>
      <svg
        viewBox="0 0 360 204"
        role="img"
        aria-label={`Plot of squared loss with ${steps} gradient steps. Current weight ${last.toFixed(3)} and loss ${(last * last).toFixed(3)}.`}
        className="aq-lab-graph"
      >
        <defs>
          <clipPath id="gradient-plot-clip">
            <rect x="24" y="6" width="327" height="169" />
          </clipPath>
        </defs>
        <path
          d="M26 12V170H346"
          stroke="currentColor"
          strokeOpacity=".25"
          strokeWidth="1.4"
          fill="none"
        />
        <g clipPath="url(#gradient-plot-clip)">
          <path d={curve} fill="none" stroke="#74dfc0" strokeWidth="2.5" />
          <path d={trail} fill="none" stroke="#f0b180" strokeWidth="2.2" strokeDasharray="5 4" />
          {trajectory.map((x, i) => (
            <circle
              key={i}
              cx={180 + x * 38}
              cy={164 - x * x * 9}
              r={i === steps ? 5 : 3}
              fill="#f0b180"
            />
          ))}
        </g>
        <text x="31" y="18" fontSize="11" fill="currentColor" opacity=".68">
          Loss
        </text>
        <text x="266" y="192" fontSize="11" fill="currentColor" opacity=".68">
          Parameter
        </text>
        <text x="190" y="152" fontSize="10" fill="currentColor" opacity=".65">
          Minimum
        </text>
      </svg>
      <div className="aq-lab-controls">
        <label htmlFor="learning-rate-slider">
          Learning rate <strong>{rate.toFixed(2)}</strong>
        </label>
        <input
          id="learning-rate-slider"
          type="range"
          min="0.05"
          max="1.1"
          step="0.05"
          value={rate}
          onChange={(event) => {
            setRate(Number(event.target.value));
            setSteps(4);
          }}
        />
        <div className="aq-lab-axis">
          <span>Slow updates</span>
          <span>Overshooting</span>
        </div>
        <div className="aq-lab-actions">
          <span>
            Step {steps} · Loss {(last * last).toFixed(3)}
          </span>
          <div>
            <button className="aq-outline" type="button" onClick={() => setSteps(0)}>
              <RotateCcw size={14} /> Reset
            </button>
            <button
              className="aq-primary"
              type="button"
              onClick={() => setSteps((v) => Math.min(v + 1, 8))}
              disabled={steps === 8}
            >
              <Play size={14} /> Step
            </button>
          </div>
        </div>
        <p className="aq-lab-insight">
          {converging
            ? 'At this rate, successive steps move toward the minimum (although they may oscillate).'
            : 'At this rate, each update overshoots enough to prevent convergence.'}{' '}
          The model uses L(w) = w², starting at w = 3.
        </p>
      </div>
    </section>
  );
}
