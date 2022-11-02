import { Routes, Route } from "react-router";

import Navbar from "./components/Navbar/Navbar";
import Daily from "./pages/Daily/Daily";
import Monthly from "./pages/Monthly/Monthly";

import "./App.module.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Daily />} />
        <Route path="/month" element={<Monthly />} />
      </Routes>
    </div>
  );
}

export default App;
