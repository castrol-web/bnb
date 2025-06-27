import { useState } from "react";
import { NavLink, useNavigate} from "react-router-dom";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import hotellogo from "../assets/hotellogo.jpg";
import { useCart } from "../context/CartContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const navigate = useNavigate();

  const navLinks = [
    { name: "HOME", to: "/" },
    { name: "OUR ROOMS", to: "/our-rooms" },
    { name: "RESERVATION", to: "/reservation" },
    { name: "ABOUT", to: "/about" },
    { name: "CONTACT US", to: "/contact" },
    { name: "ADVENTURES", to: "" },
  ];

  const { cart } = useCart();

  return (
    <div className="w-full shadow-sm z-50 fixed mb-10 top-0">
      {/* Top Info Bar */}
      <div className="bg-[#E88A1A] text-sm py-2 px-4 flex justify-between items-center lg:px-28 text-black">
        <p>
          Contact us: <span className="font-medium pl-1">+255 657 849 224</span>
        </p>
        <select title="select language" className="select w-20">
          <option value="ENG">ENG</option>
          <option value="GER">GER</option>
          <option value="Dutch">Dutch</option>
          <option value="FR">FR</option>
        </select>
      </div>

      <hr className="border-base-300" />

      {/* Navbar Main */}
      <div className="navbar bg-[#131010] flex justify-between items-center">
        {/* Left: Logo */}
        <div className="text-2xl font-bold text-primary">
          <NavLink to="/">
            <img
              alt={`${hotellogo}`}
              src={hotellogo}
              className="rounded-full h-12 w-12"
            />
          </NavLink>
        </div>

        {/* Center: Desktop Nav Links */}
        <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
          <ul className="menu menu-horizontal px-1 gap-4 font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#F2910A] font-semibold"
                      : "hover:text-[#F2910A] transition"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Cart + Hamburger */}
        <div className="flex items-center gap-2">
          {/* Cart Icon */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">{cart.length}</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 card card-compact dropdown-content w-64 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">{cart.length} Rooms</span>
                <span className="text-info">
                  Subtotal: $
                  {cart.reduce((acc, item) => acc + item.price, 0)}
                </span>
                <div className="card-actions flex flex-col gap-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={() => navigate("/checkout")}
                    disabled={cart.length === 0}
                  >
                    Go to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Hamburger Menu */}
          <button
            type="button"
            className="btn btn-ghost lg:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {menuOpen ? (
              <IoMdClose className="text-2xl" />
            ) : (
              <IoMdMenu className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="w-full px-4 py-4 shadow-md bg-base-100 flex flex-col gap-2 lg:hidden">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "text-[#F2910A] font-semibold"
                  : "hover:text-[#F2910A] transition"
              }
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;
