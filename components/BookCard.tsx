"use client";

import Image from "next/image";
import { Book } from "@/lib/data";
import { useCart } from "./CartProvider";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (book.inStock) {
      addToCart({
        id: book.id,
        title: book.title,
        price: book.price,
      });
    }
  };

  return (
    <div className="border border-black bg-white">
      <div className="relative w-full aspect-[2/3]">
        <Image
          src={book.coverUrl}
          alt={`Book cover: ${book.title}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-black mb-1">{book.title}</h3>
        {book.subtitle && (
          <p className="text-sm text-black mb-2 italic">{book.subtitle}</p>
        )}
        <p className="text-sm text-black mb-3">{book.description}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-medium text-black">${book.price.toFixed(2)}</span>
          <span className="text-xs text-black">
            {book.pages} pages · {book.releaseYear}
          </span>
        </div>
        <div className="mb-3">
          <span className={`text-sm ${book.inStock ? "text-black" : "text-black opacity-50"}`}>
            {book.inStock ? "In stock" : "Out of stock"}
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={!book.inStock}
          className={`w-full py-2 px-4 border border-black text-sm ${
            book.inStock
              ? "bg-white text-black hover:bg-black hover:text-white transition-colors"
              : "bg-white text-black opacity-50 cursor-not-allowed"
          }`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

