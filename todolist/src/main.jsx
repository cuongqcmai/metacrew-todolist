import React from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AppProvider } from "./context/AppProvider.jsx";
import "./index.css";
import { MultiBackend } from "react-dnd-multi-backend";
import {
  DndProvider,
  TouchTransition,
  MouseTransition,
} from "react-dnd-multi-backend";

export const HTML5toTouch = {
  backends: [
    {
      id: "html5",
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      id: "touch",
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition,
    },
  ],
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DndProvider
      options={HTML5toTouch}
      backend={MultiBackend}
      // options={backendOptions}
    >
      <AppProvider>
        <App />
      </AppProvider>
    </DndProvider>
  </React.StrictMode>
);
