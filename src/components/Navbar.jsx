import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">

        <Link to="/" className="logo">
          🔎 Lost & Found
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/#lost">Lost Items</Link>
          <Link to="/#found">Found Items</Link>
        </div>

        <Link to="/" className="report-btn">
          Report Item
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;