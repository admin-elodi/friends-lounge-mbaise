import React from "react";
import { ArrowRight, Compass, Utensils, Sparkles, Map } from "lucide-react";

import { mbaiseExperiences } from "@/data/mbaise";

const iconMap = {
  taste: Utensils,
  experience: Sparkles,
  explore: Compass,
  discover: Map,
};

export default function MbaiseExperience({ onExploreCategory }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-8 lg:px-12">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-600">
          Experience Mbaise
        </p>

        <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
          More than a place to stay.
        </h2>

        <p className="mt-3 text-base leading-7 text-gray-600">
          Friends' Lounge gives you a comfortable base from which to taste,
          explore and experience the wider Mbaise region.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {mbaiseExperiences.map((experience) => {
          const Icon =
            iconMap[experience.id?.toLowerCase()] || Compass;

          return (
            <article
              key={experience.id}
              className="group relative flex min-h-[250px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>

                {experience.eyebrow && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    {experience.eyebrow}
                  </span>
                )}
              </div>

              <div className="mt-6 flex-1">
                <h3 className="text-xl font-bold text-gray-950">
                  {experience.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {experience.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onExploreCategory(experience.category)}
                className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-red-600 transition hover:text-red-800"
              >
                {experience.actionLabel || "Explore"}

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}