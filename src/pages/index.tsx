import { Inter } from "next/font/google";
import Chess from "@/components/Chess";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={inter.className}>
      <Chess />
    </main>
  );
}
