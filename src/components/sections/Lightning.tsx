type Props = {
  /** Ключ, меняющий значение которого перезапускает анимацию */
  strikeKey: number;
};

export default function Lightning({ strikeKey }: Props) {
  return (
    <div
      key={strikeKey}
      className="lightning-layer pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Молния 1 — слева сверху */}
      <svg
        className="lightning lightning-1"
        viewBox="0 0 200 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M120 0 L80 180 L130 200 L60 380 L110 400 L40 600"
          stroke="url(#grad1)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow1)"
        />
        <defs>
          <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00D9FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#7B2FFF" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow1" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Молния 2 — справа сверху */}
      <svg
        className="lightning lightning-2"
        viewBox="0 0 200 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M80 0 L130 160 L70 190 L140 360 L90 380 L150 600"
          stroke="url(#grad2)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow2)"
        />
        <defs>
          <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7B2FFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#00D9FF" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow2" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Молния 3 — по центру, короткая */}
      <svg
        className="lightning lightning-3"
        viewBox="0 0 200 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 0 L70 120 L120 140 L60 280 L110 300 L80 400"
          stroke="#FFD700"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow3)"
        />
        <defs>
          <filter id="glow3" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}