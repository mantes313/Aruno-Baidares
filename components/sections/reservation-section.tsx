"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { parseISO, isBefore, startOfToday, format } from "date-fns";
import { lt } from "date-fns/locale";

interface DayAvailability {
  date: string;
  booked: number;
  available: number;
  fullyBooked: boolean;
}

export function ReservationSection() {
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [availability, setAvailability] = useState<DayAvailability[]>([]);
  const [totalKayaks, setTotalKayaks] = useState(13);
  const [loadingDates, setLoadingDates] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  useEffect(() => {
    fetch("/api/booked-dates")
      .then((r) => r.json())
      .then(({ bookedDates, availability: avail, totalKayaks: total }: {
        bookedDates: string[];
        availability: DayAvailability[];
        totalKayaks: number;
      }) => {
        setBookedDates(bookedDates.map((d) => parseISO(d)));
        setAvailability(avail || []);
        setTotalKayaks(total || 13);
      })
      .catch(() => {})
      .finally(() => setLoadingDates(false));
  }, []);

  const today = startOfToday();

  const isDateDisabled = (date: Date) => {
    if (isBefore(date, today)) return true;
    return bookedDates.some((b) => b.toDateString() === date.toDateString());
  };

  const getAvailability = (date: Date): DayAvailability | null => {
    const key = format(date, "yyyy-MM-dd");
    return availability.find((a) => a.date === key) ?? null;
  };

  const selectedAvail = selectedDate ? getAvailability(selectedDate) : null;
  const selectedAvailCount = selectedDate
    ? selectedAvail
      ? selectedAvail.available
      : totalKayaks
    : null;

  return (
    <section id="rezervacija" className="relative py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium bg-river/10 text-river rounded-full">
            Galutinė stotelė
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Laisvos datos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pasitikrinkite laisvas datas ir susisiekite su mumis rezervacijai.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Calendar */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card rounded-3xl p-8 border border-border">
              {loadingDates ? (
                <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
                  Kraunama...
                </div>
              ) : (
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={isDateDisabled}
                  locale={lt}
                  className="w-full"
                  modifiers={{ booked: bookedDates }}
                  modifiersClassNames={{
                    booked: "line-through text-destructive/60 opacity-60",
                  }}
                />
              )}

              {/* Selected date info */}
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 px-5 py-4 rounded-2xl border text-sm font-medium flex items-center justify-between ${
                    selectedAvailCount === 0
                      ? "bg-destructive/10 border-destructive/20 text-destructive"
                      : selectedAvailCount !== null && selectedAvailCount <= 4
                      ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-700"
                      : "bg-forest/10 border-forest/20 text-forest"
                  }`}
                >
                  <span>
                    {format(selectedDate, "yyyy 'm.' MMMM d 'd.'", { locale: lt })}
                  </span>
                  <span>
                    {selectedAvailCount === 0
                      ? "Visos baidarės užimtos"
                      : `${selectedAvailCount} iš ${totalKayaks} baidarių laisvos`}
                  </span>
                </motion.div>
              )}

              {/* Legend */}
              <div className="mt-6 pt-6 border-t border-border flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-forest/40" />
                  Laisva
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                  Mažai vietų
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/40" />
                  Užimta
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card rounded-3xl p-8 border border-border h-full">
              <h3 className="text-xl font-bold text-foreground mb-2">Rezervuoti</h3>
              <p className="text-sm text-muted-foreground mb-8">
                Pasitikrinę laisvas datas — susisiekite telefonu ar el. paštu.
              </p>

              <div className="space-y-6">
                <a href="tel:+37066299001" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center shrink-0 group-hover:bg-forest/20 transition-colors">
                    <Phone className="w-6 h-6 text-forest" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Telefonas</p>
                    <p className="text-muted-foreground text-sm group-hover:text-forest transition-colors">+370 662 99001</p>
                  </div>
                </a>

                <a href="mailto:baidares6upe@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center shrink-0 group-hover:bg-forest/20 transition-colors">
                    <Mail className="w-6 h-6 text-forest" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">El. paštas</p>
                    <p className="text-muted-foreground text-sm group-hover:text-forest transition-colors">baidares6upe@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-forest" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Adresas</p>
                    <p className="text-muted-foreground text-sm">
                      Ūkininkų g. 8, Liudvinavas,<br />Marijampolės sav.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <h4 className="font-medium text-foreground mb-4">Darbo laikas</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Pirmadienis – Penktadienis</span>
                    <span>9:00 – 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Šeštadienis</span>
                    <span>8:00 – 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sekmadienis</span>
                    <span>8:00 – 18:00</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
