import Link from "next/link"
import { Cloud } from "lucide-react"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton } from "@clerk/nextjs";

export default function SignIn() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="#" className="flex items-center gap-2 font-semibold">
          <Cloud className="h-5 w-5" />
          <span>FileVault</span>
        </Link>
        <div className="flex items-center gap-4">
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Sign In
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <form
                  action={async () => {
                    "use server";

                    const session = await auth()

                    if (!session.userId) {
                      return redirect("/sign-in")
                    }

                    return redirect("/drive")
                  }}
                >
                <SignInButton forceRedirectUrl={"/drive"} />

                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2 text-sm">
            <Cloud className="h-4 w-4" />
            <span className="font-semibold">FileVault</span> © 2024
          </div>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

