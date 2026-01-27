import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

// apply onload.css
import "./onload.css";
import "./base.css";
import Root from "./page/root";

hydrateRoot(
  document.getElementById("mount") as HTMLElement,
  <StrictMode>
    <Root />
  </StrictMode>,
);
