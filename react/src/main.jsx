import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";

const user = JSON.parse(document.getElementById("user").textContent);

createRoot(document.getElementById("root")).render(<App user={user} />);
