import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { EquipmentSection } from "@/components/sections/equipment-section";
import { RoutesSection } from "@/components/sections/routes-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { ReservationSection } from "@/components/sections/reservation-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { FaqSection } from "@/components/sections/faq-section";
import { faqs } from "@/lib/faq-data";
import { AnimatedKayakJourney } from "@/components/animated-kayak-journey";
import { RiverPathOverlay } from "@/components/river-path-overlay";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://6upe.lt/#business",
  "name": "6upė – Baidarių Nuoma",
  "description": "Baidarių nuoma Marijampolėje ir Suvalkijoje. Plaukite Šešupe – 3 maršrutai.",
  "url": "https://6upe.lt",
  "image": "https://6upe.lt/marsrutas-2.jpg",
  "priceRange": "€25 - €30",
  "telephone": "+37066299001",
  "email": "baidares6upe@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Ūkininkų g. 8",
    "addressLocality": "Liudvinavas",
    "addressRegion": "Marijampolės sav.",
    "addressCountry": "LT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 54.6133,
    "longitude": 23.2833
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
  "areaServed": ["Marijampolė", "Suvalkija", "Liudvinavas", "Šešupė"],
  "keywords": "baidarių nuoma, baidarės Marijampolė, baidarės Suvalkija, Šešupė"
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
    },
  })),
};

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Fixed animated elements */}
      <RiverPathOverlay />
      <AnimatedKayakJourney />

      {/* Header */}
      <Header />

      {/* Page sections - the river journey */}
      <div className="relative z-20">
        {/* Hero - Starting point */}
        <HeroSection />

        {/* Equipment - First stop */}
        <EquipmentSection />

        {/* Routes - Second stop */}
        <RoutesSection />

        {/* Pricing - Third stop */}
        <PricingSection />

        {/* Reservation - Final destination */}
        <ReservationSection />

        {/* Reviews */}
        <ReviewsSection />

        {/* FAQ */}
        <FaqSection />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
