import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-900 px-4">
      {/* Video with 404 overlay */}
      <div className="relative flex flex-col items-center">
        <video
          src="/caveman.webm" // keep caveman.webm in `public/`
          autoPlay
          loop
          muted
          playsInline
          className="w-72 md:w-[28rem] rounded-2xl "
        />

        {/* Overlay 404 */}
        <span className="absolute top-6 text-5xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 drop-shadow-lg">
          404
        </span>
      </div>

      {/* Message */}
      <p className="mt-6 text-gray-700 dark:text-gray-300 text-center text-lg">
        Looks like you’re lost in the caves 🪨
      </p>

      {/* Back Home button */}
      <Link
        to="/"
        className="mt-8 px-8 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
