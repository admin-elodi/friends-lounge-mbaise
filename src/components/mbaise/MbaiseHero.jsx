import React from "react";
import { ArrowRight, MapPin } from "lucide-react";

import { mbaiseHero } from "@/data/mbaise";

export default function MbaiseHero({ onExplore, onBookExperience }) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Hero copy */}
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-700">
              <MapPin className="h-3.5 w-3.5" />
              <span>{mbaiseHero.eyebrow}</span>
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-gray-950 sm:text-5xl lg:text-7xl">
              {mbaiseHero.title}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              {mbaiseHero.description}
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onExplore}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-red-700 hover:shadow-lg"
              >
                {mbaiseHero.primaryAction.label}

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={onBookExperience}
                className="inline-flex items-center justify-center rounded-full border-2 border-red-600 px-6 py-3.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                {mbaiseHero.secondaryAction.label}
              </button>
            </div>
          </div>

          {/* Brand positioning panel */}
          <div className="relative mx-auto w-full max-w-md lg:justify-self-end">
            <div className="relative overflow-hidden rounded-[2rem] border border-red-100 bg-gradient-to-br from-red-600 via-red-700 to-neutral-950 p-8 text-white shadow-2xl">
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10" />
              <div className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-yellow-400/10" />

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-100">
                  Friends' Lounge Mbaise
                </p>

                <div className="mt-8">
                  <p className="text-sm font-medium text-red-100">
                    Your base for
                  </p>

                  <p className="mt-1 text-3xl font-black leading-tight sm:text-4xl">
                    experiencing Mbaise.
                  </p>
                </div>

                <div className="mt-8 h-px bg-white/20" />

                <p className="mt-6 text-sm leading-6 text-white/80">
                  Come for the Lounge. Use it as your starting point for
                  discovering the food, culture, places, people and experiences
                  around Mbaise.
                </p>

                <button
                  type="button"
                  onClick={onExplore}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-red-100"
                >
                  Start exploring
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}