import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { AppProvider } from "./context/AppProvider.jsx";
import { TouchBackend } from "react-dnd-touch-backend";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend || TouchBackend}>
      <AppProvider>
        <App />
      </AppProvider>
    </DndProvider>
  </React.StrictMode>
);
