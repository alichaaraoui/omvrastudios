import { books } from "@/lib/data";
import BookCard from "@/components/BookCard";

export default function BooksPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-16">
      <h1 className="text-4xl font-medium mb-8 text-black">Book</h1>
      <p className="mb-12 text-black leading-relaxed">
        A comprehensive retrospective of work spanning six years.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-8 max-w-md mx-auto">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

