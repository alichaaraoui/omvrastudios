"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";

export default function Navbar() {
  const { getTotalQuantity } = useCart();
  const cartCount = getTotalQuantity();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
    if (showAbout) setShowAbout(false);
  };

  const handleAboutClick = () => {
    setShowAbout(!showAbout);
    if (!isExpanded) setIsExpanded(true);
  };

  return (
    <>
      {/* Black tint overlay when About is expanded */}
      {showAbout && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500"
          onClick={() => setShowAbout(false)}
        />
      )}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div 
        className="bg-white overflow-hidden"
        style={{ 
          maxWidth: isExpanded ? '450px' : '200px',
          width: isExpanded ? '450px' : 'auto',
          transition: 'max-width 500ms ease-in-out, width 500ms ease-in-out',
          display: isExpanded ? 'block' : 'inline-block'
        }}
      >
        {/* Main navbar row */}
        <div className="p-2 flex items-center" style={{ gap: isExpanded ? '0.5rem' : '0.5rem' }}>
          <Link 
            href="/" 
            className="text-black font-medium text-sm hover:underline whitespace-nowrap flex-shrink-0 p-2 border border-black"
            onClick={() => {
              setIsExpanded(false);
              setShowAbout(false);
            }}
          >
            OMVRA STUDIOS
          </Link>
          {!isExpanded && (
            <button
              onClick={toggleMenu}
              className="text-black text-2xl font-light flex items-center justify-center flex-shrink-0 border border-black aspect-square"
              style={{ width: '2.5rem', height: '2.5rem' }}
              aria-label="Toggle menu"
            >
              +
            </button>
          )}
          {isExpanded && (
            <>
              <div className="flex items-center ml-2" style={{ gap: '0.5rem' }}>
                <button
                  onClick={handleAboutClick}
                  className="p-2 text-black text-sm hover:bg-black hover:text-white transition-colors whitespace-nowrap"
                >
                  About
                </button>
                <Link
                  href="/books"
                  onClick={() => {
                    setIsExpanded(false);
                    setShowAbout(false);
                  }}
                  className="p-2 text-black text-sm hover:bg-black hover:text-white transition-colors whitespace-nowrap"
                >
                  Book
                </Link>
                <Link
                  href="/cart"
                  onClick={() => {
                    setIsExpanded(false);
                    setShowAbout(false);
                  }}
                  className="p-2 text-black text-sm hover:bg-black hover:text-white transition-colors whitespace-nowrap"
                >
                  Cart ({cartCount})
                </Link>
              </div>
              <button
                onClick={toggleMenu}
                className="text-black text-2xl font-light p-2 flex items-center justify-center flex-shrink-0 ml-2"
                aria-label="Toggle menu"
              >
                ×
              </button>
            </>
          )}
        </div>

        {/* About content - expands downward */}
        <div 
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            showAbout 
              ? "max-h-[500px] opacity-100" 
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-3 py-4 border-t border-black max-w-full">
            <p className="text-black text-sm leading-relaxed mb-3">
              Omvra Studios was founded with a singular vision: to capture the quiet moments
              that exist between the noise of everyday life. Through a minimalist approach
              to photography, we explore the relationship between light and shadow, form and
              emptiness, movement and stillness.
            </p>
            <p className="text-black text-sm leading-relaxed mb-3">
              Our work spans both urban landscapes and natural environments, finding common
              threads in the geometric patterns of architecture and the organic forms of the
              natural world. Each photograph is a meditation on space, time, and the subtle
              beauty that surrounds us.
            </p>
            <p className="text-black text-sm leading-relaxed">
              Based in the intersection of art and documentation, our practice is dedicated
              to creating images that invite contemplation and reflection. We believe that
              photography, at its best, is a form of visual poetry—a way of seeing that
              transforms the ordinary into the extraordinary.
            </p>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
}

