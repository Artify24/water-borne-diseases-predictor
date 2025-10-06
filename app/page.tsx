import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold text-balance">Arogya Dristi</h1>
        <Image src={"/image/logopng.png"} alt="Logo" width={150} height={150} className="mx-auto" />
        <p className="text-lg text-muted-foreground text-balance">Smart Rural Health & Water Safety Alert System</p>

        <div className="space-y-4 pt-8">
          <Link href="/citizen" className="block">
            <Button size="lg" className="w-full text-lg h-14 rounded-xl">
              Citizen App
            </Button>
          </Link>

          <Link href="/admin" className="block">
            <Button size="lg" variant="outline" className="w-full text-lg h-14 rounded-xl bg-transparent">
              Admin Panel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
