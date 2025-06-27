import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// Define Room type
type Room = {
  id: string;
  name: string;
  spec: string;
  price: number;
};


type CartContextType = {
  cart: Room[];
  addToCart: (room: Room) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};


const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Room[]>(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (room: Room) => {
    if (!cart.find((item) => item.id === room.id)) {
      setCart([...cart, room]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
