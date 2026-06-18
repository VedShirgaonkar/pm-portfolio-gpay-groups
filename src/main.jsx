import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CaseStudy from "../gpay-case-study.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CaseStudy />
  </StrictMode>
);
