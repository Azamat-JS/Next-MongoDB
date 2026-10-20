import ImagesSection from "@/components/images-section";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white w-full min-h-screen">
      <header className="w-full bg-gray-300 shadow-olive-900 flex justify-around py-4 items-center">
        <h1 className="font-bold text-xl text-blue-500">Appliances</h1>
        <div className="bg-white w-[413px] h-[44px] rounded-lg">
          <input className="w-full py-2 px-2" placeholder="Search here..." type="text" />
        </div>
        <div className="text-black flex gap-3 items-center">
          <Link href="/sign-in">
            <Button variant="ghost" className="px-4 py-2">Log In </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="p-5 hover:scale-105 group">Get Started <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </header>
      <main className="h-[70vh] bg-linear-135 from-blue-200 to-purple-200 flex flex-col justify-center">
        <div className="w-[500px] mx-auto items-center flex justify-center flex-col gap-4">

          <h1 className="font-bold text-6xl font-sans">Best Appliances for your
            home.</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, aperiam quibusdam! Vel et sunt fuga quidem sed? Accusamus, dicta blanditiis!</p>
          <Link href="/sign-up">
            <Button className="p-5 hover:scale-105 group">Get Started <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </main>
      <ImagesSection />
    </div>
  );
}
