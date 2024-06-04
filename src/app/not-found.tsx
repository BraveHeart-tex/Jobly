import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <main>
      <div className="flex justify-center items-center flex-col min-h-screen py-10 px-6">
        <div>
          <h2 className="block scroll-m-20 text-4xl font-bold tracking-tight lg:text-4xl text-facebook dark:text-foreground capitalize">
            404 Page Not Found :(
          </h2>
          <p className="text-muted-foreground text-lg w-full mb-4 mt-2">
            It looks like you found a glitch in the matrix...
          </p>
          <Button className="text-white font-semibold bg-facebook dark:bg-gray-700 hover:bg-facebook-400 dark:hover:bg-gray-600 transition-all">
            <FaArrowLeft className="mr-2" />
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
