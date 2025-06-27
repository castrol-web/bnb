import room from "../assets/room.jpeg";
import { RiStarSLine } from "react-icons/ri";
import { FaRegStarHalf } from "react-icons/fa";
import { useState } from "react";
import { useCart } from "../context/CartContext";

function Reservation() {
  const [selectedSpec, setSelectedSpec] = useState("standard");
  const { cart, addToCart, removeFromCart } = useCart();

  const roomId = "classic-room";
  const isInCart = cart.some((item) => item.id === roomId);

  const handleToggleCart = () => {
    const roomData = {
      id: roomId,
      name: "Classic Room",
      spec: selectedSpec,
      price: selectedSpec === "standard" ? 39 : 47,
    };

    isInCart ? removeFromCart(roomId) : addToCart(roomData);
  };

  return (
    <div className="mt-28 mx-4 md:mx-28 justify-center">
      <h1 className="text-3xl py-9 text-center">Rooms available for you</h1>
      <div className="flex flex-col md:flex-row shadow-xl rounded-xl overflow-hidden border-1">
        <img
          alt="room photo"
          src={room}
          className="w-full md:w-2/12 h-60 object-cover"
        />

        <div className="flex flex-col md:flex-row justify-between w-full p-4">
          <div className="md:w-2/3 flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">Classic Room</h1>
            <div className="flex text-sm items-center gap-2">
              <RiStarSLine className="text-yellow-700" />
              <RiStarSLine className="text-yellow-700" />
              <RiStarSLine className="text-yellow-700" />
              <FaRegStarHalf className="text-yellow-700" />
              <p>3 reviews</p>
            </div>
            <p>
              Status: <span className="text-green-600">Available</span>
            </p>
            <p>
              Beds: <span>01</span>
            </p>
            <p>Passengers: 02</p>
          </div>

          <div className="flex flex-col gap-2 mt-4 md:mt-0 md:w-1/3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="roomSpec"
                value="standard"
                checked={selectedSpec === "standard"}
                onChange={() => setSelectedSpec("standard")}
              />
              <span>
                Starting from <span className="text-red-600 text-3xl">$39/</span>night
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="roomSpec"
                value="breakfast"
                checked={selectedSpec === "breakfast"}
                onChange={() => setSelectedSpec("breakfast")}
              />
              <span>
                Includes breakfast <span className="text-red-600 text-3xl">$47/</span>night
              </span>
            </label>

            <button
              type="button"
              onClick={handleToggleCart}
              className={`mt-2 w-full px-4 py-2 rounded-md font-semibold transition ${isInCart ? "bg-red-600 text-white" : "bg-green-600 text-white"
                }`}
            >
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
