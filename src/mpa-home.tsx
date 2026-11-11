import { createRoot } from "react-dom/client";
import "./styles.css";
import HomeMPA from "./pages/Home.mpa";

const root = createRoot(document.getElementById("root")!);
root.render(<HomeMPA />);
