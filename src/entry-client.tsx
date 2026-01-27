import ReactDOM from "react-dom/client";

// apply onload.css
import "./onload.css";
import "./base.css";
import Root from "./page/root";

ReactDOM.hydrateRoot(document.getElementById("mount") as HTMLElement, <Root />);
