import TopNavMPA from "../components/TopNavMPA";
import Footer from "../components/Footer";
import Home from "./Home";

export default function HomeMPA() {
  return (
    <div className="app">
      <TopNavMPA />
      <Home />
      <Footer />
    </div>
  );
}
