import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ItemDetail from "./pages/ItemDetail";

import "./App.css";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Matches the database column 'product_id' */}
          <Route path="/item/:product_id" element={<ItemDetail />} />
        </Routes>
      </main>

      <footer className="footer">
        <div>
          <h3>🔎 Lost & Found</h3>
          <p>Helping students reconnect with their lost belongings.</p>
        </div>

        <p>© 2026 Lost & Found</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;