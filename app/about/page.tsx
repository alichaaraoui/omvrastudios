import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-16">
      <h1 className="text-4xl font-medium mb-12 text-black">About Omvra Studios</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        {/* Portrait placeholder */}
        <div className="border border-black aspect-square bg-white flex items-center justify-center">
          <div className="text-center text-black opacity-50">
            <p className="text-sm">Portrait</p>
          </div>
        </div>

        {/* Bio text */}
        <div className="space-y-4 text-black leading-relaxed">
          <p>
            Omvra Studios was founded with a singular vision: to capture the quiet moments
            that exist between the noise of everyday life. Through a minimalist approach
            to photography, we explore the relationship between light and shadow, form and
            emptiness, movement and stillness.
          </p>
          <p>
            Our work spans both urban landscapes and natural environments, finding common
            threads in the geometric patterns of architecture and the organic forms of the
            natural world. Each photograph is a meditation on space, time, and the subtle
            beauty that surrounds us.
          </p>
          <p>
            Based in the intersection of art and documentation, our practice is dedicated
            to creating images that invite contemplation and reflection. We believe that
            photography, at its best, is a form of visual poetry—a way of seeing that
            transforms the ordinary into the extraordinary.
          </p>
        </div>
      </div>

      <div className="mt-12 space-y-4 text-black leading-relaxed">
        <h2 className="text-2xl font-medium mb-4">Contact</h2>
        <p>
          For inquiries about prints, commissions, or collaborations, please reach out
          through our contact form or email.
        </p>
      </div>
    </div>
  );
}

