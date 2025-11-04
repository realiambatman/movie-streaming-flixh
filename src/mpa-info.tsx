import { createRoot } from "react-dom/client";
import "./tailwind.css";
import "./styles.css";
import InfoMPA from "./pages/Info.mpa";

const root = createRoot(document.getElementById("root")!);
root.render(<InfoMPA />);
