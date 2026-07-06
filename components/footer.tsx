"use client";

import { SmallKayak } from "./kayak";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <SmallKayak className="invert" />
              <span className="font-bold text-lg">
                6upe<span className="text-river-light">.lt</span>
              </span>
            </a>
            <p className="text-background/70 text-sm">
              Lietuvos upių nuotykiai prasideda čia. Išsinuomokite baidarę ir atraskite gamtos grožį.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Navigacija</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a href="#iranga" className="hover:text-background transition-colors">
                  Įranga
                </a>
              </li>
              <li>
                <a href="#marsrutai" className="hover:text-background transition-colors">
                  Maršrutai
                </a>
              </li>
              <li>
                <a href="#kainos" className="hover:text-background transition-colors">
                  Kainoraštis
                </a>
              </li>
              <li>
                <a href="#rezervacija" className="hover:text-background transition-colors">
                  Rezervacija
                </a>
              </li>
            </ul>
          </div>

          {/* Routes */}
          <div>
            <h4 className="font-semibold mb-4">Maršrutai</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a href="#marsrutai" className="hover:text-background transition-colors">
                  Jungėnai – Bukta
                </a>
              </li>
              <li>
                <a href="#marsrutai" className="hover:text-background transition-colors">
                  Bukta – Liudvinavas
                </a>
              </li>
              <li>
                <a href="#marsrutai" className="hover:text-background transition-colors">
                  Liudvinavas – Marijampolė
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Kontaktai</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>+370 662 99001</li>
              <li>baidares6upe@gmail.com</li>
              <li>Ūkininkų g. 8, Liudvinavas, Marijampolės sav.</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/50">
            © {new Date().getFullYear()} 6upe.lt. Visos teisės saugomos.
          </p>
          <div className="flex gap-6 text-sm text-background/50">
            <a href="#" className="hover:text-background transition-colors">
              Privatumo politika
            </a>
            <a href="#" className="hover:text-background transition-colors">
              Naudojimo sąlygos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
