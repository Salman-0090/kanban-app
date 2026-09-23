import Link from "next/link";
import Button from "./_components/Buttons";
import Navbar from "./_components/Navbar";
import Header from "./_components/Header";
import BoardOverview from "./_components/BoardOverview";
import Features from "./_components/Features";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
    <Navbar />
    <Header />
    <BoardOverview />
    <Features />
    <Footer />
   </div>
  );
}
