import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./home/Home";
import ChatWidget from "./components/chatwgt/ChatWidget";
import ScrollButton from "./components/chatwgt/scroll/ScrollButton";
import Reservation from "./room/Reservation";
import Checkout from "./checkout/Checkout";
import Rooms from "./room/Rooms";
import RoomDetails from "./room/RoomDetails";
import About from "./about/About";
import Contact from "./contact/Contact";
import RoomManager from "./Admin/Rooms/RoomManager";
function App() {
  return (
    <div className="bg-[#0f0c0c] text-[#FFF0DC]">
      <Router>
        <Navbar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/our-rooms" element={<Rooms />} />
          <Route path="/room-details" element={<RoomDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/room-management" element={<RoomManager />} />
        </Routes>
        <Footer />
        <ChatWidget />
        <ScrollButton />
      </Router>
    </div>
  )
}

export default App;
