import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Home from "@/components/pages/Home";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen overflow-auto">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}
