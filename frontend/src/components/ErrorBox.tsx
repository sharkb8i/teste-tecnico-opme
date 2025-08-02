interface ErrorBoxProps {
  message: string;
  className?: string;
}

export default function ErrorBox({ message, className = "" }: ErrorBoxProps) {
  return (
    <div
      className={`flex items-center p-3 bg-red-100 border border-red-400 text-red-700 rounded ${className}`}
      role="alert"
    >
      <svg
        className="w-5 h-5 mr-2 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M12 2a10 10 0 110 20 10 10 0 010-20z" />
      </svg>
      <p className="text-sm">{message}</p>
    </div>
  );
}