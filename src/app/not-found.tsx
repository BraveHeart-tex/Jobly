import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <main>
      <div className="flex justify-center items-center flex-col min-h-screen py-10 px-6">
        <div>
          <h2 className="block text-4xl font-semibold text-facebook dark:text-foreground">404 Page Not Found :(</h2>
          <p className="text-foreground mb-6 mt-3">It looks like you found a glitch in the matrix...</p>
          <Button className="text-white font-semibold bg-facebook dark:bg-gray-700 hover:bg-facebook-400 dark:hover:bg-gray-600 transition-all">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
