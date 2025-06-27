import { useCart } from "../context/CartContext";
import { useState } from "react";
import { Dialog } from "@headlessui/react";

function Checkout() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleConfirmBooking = () => {
    // TODO: Replace with API call to backend
    console.log("Booking submitted", cart);
    clearCart();
    setIsConfirmOpen(false);
    alert("Booking confirmed!");
  };

  return (
    <div className="px-6 lg:px-32 mt-32">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 rounded shadow"
            >
              <div>
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.spec}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold">${item.price}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-4">
            <p className="text-lg font-semibold">
              Total: <span className="text-primary">${total}</span>
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsConfirmOpen(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Proceed to Booking
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <Dialog open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} className="fixed inset-0 z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white max-w-md w-full p-6 rounded shadow-lg">
            <Dialog.Title className="text-xl font-semibold mb-4">
              Confirm Booking
            </Dialog.Title>
            <p className="mb-6">Are you sure you want to confirm your booking?</p>
            <div className="flex justify-end gap-4">
              <button type="button" onClick={() => setIsConfirmOpen(false)} className="text-gray-500">
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmBooking}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Confirm
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

export default Checkout;
