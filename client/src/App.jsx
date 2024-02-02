import "./App.css";
import Sales from "./components/sales/Sales";
import Navbar from "./components/navbar/Navbar";
import Expenses from "./components/expenses/Expenses";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="/" element={<Sales />} />
      <Route path="/expenses" element={<Expenses />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
