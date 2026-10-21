export default function SuccessCheck() {
  return (
    <div className="w-20 h-20 mx-auto mb-6">
      <svg
        viewBox="0 0 52 52"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Круг */}
        <circle
          cx="26"
          cy="26"
          r="24"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary/40 success-circle"
        />
        {/* Галочка */}
        <path
          d="M14 27 L22 35 L38 18"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary success-check"
        />
      </svg>
    </div>
  );
}