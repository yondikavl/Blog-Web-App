import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${rubik.className}`}>
      <h1>Splash</h1>
    </main>
  );
}
