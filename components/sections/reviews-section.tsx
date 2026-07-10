"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Star, ImagePlus, Send, X, ChevronLeft, ChevronRight } from "lucide-react";
import { NatureBackground } from "@/components/nature-decor";

interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  photos: string[];
  date: string;
}

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          onMouseEnter={() => onChange && setHovered(star)}
          onMouseLeave={() => onChange && setHovered(0)}
          className={onChange ? "cursor-pointer" : "cursor-default"}
        >
          <Star
            className={`w-6 h-6 transition-colors ${
              star <= (hovered || value)
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground/30"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function PhotoLightbox({ photos, startIndex, onClose }: { photos: string[]; startIndex: number; onClose: () => void }) {
  const [current, setCurrent] = useState(startIndex);
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
        <X className="w-5 h-5" />
      </button>
      {photos.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + photos.length) % photos.length); }}
            className="absolute left-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % photos.length); }}
            className="absolute right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photos[current]}
        alt=""
        className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl"
        onClick={(e) => e.stopPropagation()}
      />
      {photos.length > 1 && (
        <div className="absolute bottom-4 flex gap-2">
          {photos.map((_, i) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
              className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/40"}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const date = new Date(review.date).toLocaleDateString("lt-LT", { year: "numeric", month: "long", day: "numeric" });

  return (
    <motion.div
      className="bg-card rounded-2xl p-6 border border-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-foreground">{review.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{date}</p>
        </div>
        <StarRating value={review.rating} />
      </div>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{review.text}</p>
      {review.photos.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {review.photos.map((url, i) => (
            <button key={i} onClick={() => setLightbox(i)} className="relative group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`${review.name} atsiliepimo nuotrauka – baidarių nuoma Marijampolėje`} className="w-20 h-20 object-cover rounded-xl border border-border group-hover:opacity-80 transition-opacity" />
            </button>
          ))}
        </div>
      )}
      <AnimatePresence>
        {lightbox !== null && (
          <PhotoLightbox photos={review.photos} startIndex={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then(({ reviews }) => setReviews(reviews || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files).map((f) => URL.createObjectURL(f));
    setPreviews((p) => [...p, ...urls]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0) return;
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    fd.set("rating", String(rating));

    try {
      const res = await fetch("/api/reviews", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      const { review } = await res.json();
      setReviews((r) => [review, ...r]);
      setSubmitted(true);
      setShowForm(false);
      setPreviews([]);
      setRating(0);
      formRef.current?.reset();
    } catch {
      alert("Nepavyko išsaugoti atsiliepimo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="atsiliepimai" className="relative py-24 md:py-32 bg-muted/30 overflow-hidden">
      <NatureBackground treeSide="right" river="top" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium bg-river/10 text-river rounded-full">
            Bendruomenė
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Atsiliepimai apie baidarių nuomą Marijampolėje
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pasidalinkite savo plaukimo patirtimi Šešupe ir nuotraukomis.
          </p>
        </motion.div>

        {/* Add review button */}
        <div className="flex justify-center mb-10">
          <button
            onClick={() => { setShowForm((s) => !s); setSubmitted(false); }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-forest text-primary-foreground rounded-full font-semibold hover:bg-forest-light transition-colors shadow-md"
          >
            <Star className="w-4 h-4" />
            {showForm ? "Atšaukti" : "Palikti atsiliepimą"}
          </button>
        </div>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-12"
            >
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-card rounded-3xl p-8 border border-border max-w-2xl mx-auto space-y-6"
              >
                <h3 className="text-xl font-bold text-foreground">Jūsų atsiliepimas</h3>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Vardas</label>
                  <input
                    name="name"
                    required
                    placeholder="Jonas Jonaitis"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-forest/50 transition-colors"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Įvertinimas</label>
                  <StarRating value={rating} onChange={setRating} />
                  {rating === 0 && <p className="text-xs text-muted-foreground mt-1">Pasirinkite įvertinimą</p>}
                </div>

                {/* Text */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Atsiliepimas</label>
                  <textarea
                    name="text"
                    required
                    rows={4}
                    placeholder="Papasakokite apie savo plaukimo patirtį..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-forest/50 transition-colors resize-none"
                  />
                </div>

                {/* Photos */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Nuotraukos (neprivaloma)</label>
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-forest/40 transition-colors"
                  >
                    <ImagePlus className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Spustelėkite norėdami įkelti nuotraukas</p>
                    <input
                      ref={fileRef}
                      name="photos"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFiles(e.target.files)}
                    />
                  </div>
                  {previews.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-3">
                      {previews.map((url, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={i} src={url} alt="" className="w-16 h-16 object-cover rounded-lg border border-border" />
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting || rating === 0}
                  className="w-full py-3.5 bg-forest text-primary-foreground rounded-xl font-semibold hover:bg-forest-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <><Send className="w-4 h-4" /> Paskelbti atsiliepimą</>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {submitted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-forest font-medium mb-8"
          >
            Ačiū! Jūsų atsiliepimas sėkmingai paskelbtas.
          </motion.p>
        )}

        {/* Reviews grid */}
        {loading ? (
          <div className="text-center text-muted-foreground">Kraunama...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <Star className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>Dar nėra atsiliepimų. Būkite pirmas!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
