import Stories from "../components/Stories";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-full min-h-screen m-0 p-0 bg-[#fafafa] flex flex-col justify-between md:hidden">
      <header className="flex items-center">
        <Image src="/images/instagram.webp" alt="Instagram" width={120} height={36} priority />
      </header>
      <div className="flex-1">
        <Stories />
      </div>
    </div>
  );
}
