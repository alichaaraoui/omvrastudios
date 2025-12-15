"use client";

import { useCart } from "@/components/CartProvider";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalQuantity } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-medium mb-8 text-black">Cart</h1>
        <div className="text-center py-16">
          <p className="text-black mb-4">Your cart is empty.</p>
          <Link
            href="/books"
            className="inline-block border border-black px-6 py-3 text-black hover:bg-black hover:text-white transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-16">
      <h1 className="text-4xl font-medium mb-8 text-black">Cart</h1>

      <div className="space-y-4 mb-8">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="border border-black p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div className="flex-1">
              <h3 className="font-medium text-black mb-1">{item.title}</h3>
              <p className="text-sm text-black">${item.price.toFixed(2)} each</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="border border-black px-3 py-1 text-black hover:bg-black hover:text-white transition-colors"
                >
                  −
                </button>
                <span className="text-black w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="border border-black px-3 py-1 text-black hover:bg-black hover:text-white transition-colors"
                >
                  +
                </button>
              </div>
              <div className="text-black font-medium w-24 text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="border border-black px-4 py-1 text-sm text-black hover:bg-black hover:text-white transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-black pt-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-medium text-black">Total</span>
          <span className="text-xl font-medium text-black">${total.toFixed(2)}</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="border border-black px-6 py-3 text-black hover:bg-black hover:text-white transition-colors"
          >
            Clear Cart
          </button>
          <button className="border border-black px-6 py-3 bg-black text-white hover:bg-white hover:text-black transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>

      <div className="border border-black p-6 bg-white">
        <p className="text-sm text-black">
          Checkout coming soon. This is a placeholder for the checkout process.
        </p>
      </div>
    </div>
  );
}

