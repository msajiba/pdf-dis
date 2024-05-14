import DriveSection from "@/components/DriveSection";
import Local from "@/components/Local";


export default function Home() {

  return (
    <main className="flex justify-between h-screen items-center">
      <DriveSection />
      <Local />
    </main>
  );
}
