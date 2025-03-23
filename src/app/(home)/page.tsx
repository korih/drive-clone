import Link from "next/link"
import { ArrowRight, Cloud, FileLock2, HardDrive, Users } from "lucide-react"

import { Button } from "~/components/ui/button"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function Home() {
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
        <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center">
          <div className="container flex flex-col items-center justify-center px-4 md:px-6 text-center">
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Simple & Secure File Storage
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Store, share, and access your files from anywhere. Your data, your control.
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
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
                  <Button
                    size="lg"
                    type="submit"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                </form>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-muted/50 py-12 md:py-24 lg:py-32  flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose FileVault</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Designed with simplicity and security in mind
                </p>
              </div>
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col items-center space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <HardDrive className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">Unlimited Storage</h3>
                  <p className="text-muted-foreground">
                    Store all your important files with flexible storage options and plans to meet your needs.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <FileLock2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">End-to-End Encryption</h3>
                  <p className="text-muted-foreground">
                    Your files are encrypted from the moment they leave your device until you access them again.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">Easy File Sharing</h3>
                  <p className="text-muted-foreground">
                    Share files securely with teammates, clients, or friends with just a few clicks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2 text-sm">
            <Cloud className="h-4 w-4" />
            <span className="font-semibold">Kori</span> © 2025
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

