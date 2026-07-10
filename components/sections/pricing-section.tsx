"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { NatureBackground } from "@/components/nature-decor";

const baseFeatures = [
  "Baidarė (2 vietų)",
  "Irklai",
  "Gelbėjimosi liemenės",
  "Neperšlampami maišai",
  "Instruktažas",
  "Transportavimas prie upės",
];

const pricingPlans = [
  {
    name: "Darbo dienomis",
    description: "Pirmadienį – Penktadienį",
    price: "25",
    popular: false,
  },
  {
    name: "Savaitgaliais",
    description: "Šeštadienį ir Sekmadienį",
    price: "30",
    popular: true,
  },
];

export function PricingSection() {
  return (
    <section id="kainos" className="relative py-24 md:py-32 overflow-hidden">
      <NatureBackground treeSide="both" treeOpacity={0.06} river="top" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium bg-river/10 text-river rounded-full">
            Trečia stotelė
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Baidarių nuomos kainos Marijampolėje
          </h2>
        </motion.div>

        {/* Pricing cards */}
        <div className="flex flex-col md:flex-row justify-center gap-8 max-w-3xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative flex-1 bg-card rounded-3xl p-10 border transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? "border-forest shadow-xl ring-1 ring-forest/20"
                  : "border-border hover:border-forest/30"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 bg-forest text-primary-foreground text-sm font-medium rounded-full whitespace-nowrap">
                    Populiariausias
                  </span>
                </div>
              )}

              {/* Plan name */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="text-center mb-10">
                <div className="flex items-end justify-center gap-1">
                  <span className="text-6xl font-bold text-foreground">
                    €{plan.price}
                  </span>
                  <span className="text-muted-foreground mb-2 text-lg">/vnt.</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {baseFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      plan.popular ? "bg-forest/20" : "bg-muted"
                    }`}>
                      <Check className="w-3 h-3 text-forest" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#rezervacija"
                className={`block w-full py-3.5 text-center rounded-2xl font-semibold transition-all duration-200 ${
                  plan.popular
                    ? "bg-forest text-primary-foreground hover:bg-forest-light shadow-md hover:shadow-lg"
                    : "bg-muted text-foreground hover:bg-muted/70"
                }`}
              >
                Rezervuoti
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
