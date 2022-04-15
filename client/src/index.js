import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ComicCharacterProvider from "./components/ComicCharacterContext";
import App from "./components/App";
import AuthProvider from "./components/Form/AuthContext";

// 👇️ IMPORTANT: use correct ID of your root element
// this is the ID of the div in your index.html file
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// 👇️ if you use TypeScript, add non-null (!) assertion operator
// const root = createRoot(rootElement!);

root.render(
  <AuthProvider>
    <ComicCharacterProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </ComicCharacterProvider>
  </AuthProvider>
);
