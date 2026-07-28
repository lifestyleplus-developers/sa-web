export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ScrapCo",
    description:
      "Office scrap buyers in Bengaluru. We buy ACs, IT equipment (laptops, workstations), and office furniture. Free assessment, on-the-spot payment.",
    url: "https://scrapco.in",
    telephone: "+91-9900000000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "12, Industrial Layout, Peenya",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560058",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.0302,
      longitude: 77.5199,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: {
      "@type": "City",
      name: "Bengaluru",
    },
    knowsAbout: [
      "Office clearance",
      "IT equipment buying",
      "Furniture disposal",
      "AC scrap buying",
      "E-waste recycling",
    ],
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
