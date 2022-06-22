import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const shincodeInfo = {
  name: "shincode",
  age: 24,
};

const ShinCodeContext = createContext(shincodeInfo);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ShinCodeContext.Provider value={shincodeInfo}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ShinCodeContext.Provider>
);

export default ShinCodeContext;
