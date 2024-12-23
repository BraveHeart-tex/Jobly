import { buttonVariants } from "@/components/ui/button";
import { SHARED_ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="w-screen h-[calc(100vh-4rem)] flex items-center justify-center flex-col">
      <div className="grid gap-4 place-items-center p-4">
        <Image
          src="/404.svg"
          alt="Not Found"
          width={300}
          height={300}
          className="dark:hidden"
        />
        <Image
          src="/404-dark.svg"
          alt="Not Found"
          width={300}
          height={300}
          className="hidden dark:block"
        />
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Oops! Page Not Found
        </h1>
        <p className="text-lg text-muted-foreground text-center">
          Looks like you hit a dead end. The page you are looking for does not
          exist.
        </p>
        <Link
          className={cn(
            buttonVariants({
              variant: "default",
            }),
            "w-full lg:w-max flex items-center gap-2",
          )}
          href={SHARED_ROUTES.HOME}
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
