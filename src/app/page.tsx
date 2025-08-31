
import Link from "next/link";
export default function Home() {
  return (
    <div className="py-6 space-y-4">
      <h1 className="text-2xl font-semibold">Welcome</h1>
      <p>Go to <Link href="/discover" className="underline">Discover</Link> to start.</p>
    </div>
  );
}
