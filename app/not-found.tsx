import Link from "next/link";
import { PiArrowLeftBold, PiHouseBold } from "react-icons/pi";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-[90%] max-w-7xl border-theme-border border-dashed px-6 border-l border-r">
        <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
          <p className="text-8xl font-bold text-black">404</p>
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-black">
              Page not found
            </h1>
            <p className="text-gray-600 max-w-md">
              The page you are looking for does not exist or has been moved.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 pt-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-medium text-sm"
            >
              <PiHouseBold size={18} />
              Go home
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-theme-border rounded-xl hover:bg-gray-50 dark:hover:bg-dark-elevated transition-colors font-medium text-sm"
            >
              <PiArrowLeftBold size={18} />
              View projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
