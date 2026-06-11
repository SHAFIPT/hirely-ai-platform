import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-background text-foreground">
      <div className="max-w-md space-y-6">
        <h1 className="text-9xl font-extrabold tracking-widest text-indigo-600 animate-pulse">
          404
        </h1>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Page not found
          </h2>
          <p className="text-muted-foreground text-lg">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2">
            <Link href="/">
              Go back home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
