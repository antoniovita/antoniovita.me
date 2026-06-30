"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  PiArrowRightBold,
  PiStarBold,
  PiStarFill,
  PiXBold,
} from "react-icons/pi";
import { services, type Service } from "@/data/services";
import { services as servicesPt } from "@/data/services.pt";
import { services as servicesIt } from "@/data/services.it";
import { useTranslations, useLocale } from "next-intl";

const Services = () => {
  const t = useTranslations("services");
  const locale = useLocale();
  const allServices = locale === "pt" ? servicesPt : locale === "it" ? servicesIt : services;

  const allLabel = locale === "pt" ? "Todos" : locale === "it" ? "Tutti" : "All";
  const categories = useMemo(
    () => [allLabel, ...new Set(allServices.map((s) => s.category))],
    [allServices, allLabel],
  );
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedService(null); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const filteredServices = useMemo(() => {
    if (selectedCategory === allLabel) return allServices;
    return allServices.filter((s) => s.category === selectedCategory);
  }, [selectedCategory, allServices, allLabel]);

  return (
    <div className="flex justify-center items-center min-h-screen pt-4 md:pt-8">
      <div className="w-[90%] max-w-7xl border-theme-border border-dashed px-4 md:px-6 border-l border-r py-12">
        <div className="mb-12 mt-20">
          <div className="space-y-2">
            <p className="text-sm text-theme-muted uppercase tracking-wide font-medium">
              {t("label")}
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-theme-fg">
              {t("title")}
            </h1>
            <p className="text-lg text-theme-fg-muted leading-relaxed max-w-3xl">
              {t("subtitle")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-theme-accent text-theme-accent-fg"
                    : "bg-theme-bg border border-theme-border text-theme-fg-muted hover:bg-theme-surface"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.title}
              className="bg-theme-bg border border-theme-border rounded-2xl overflow-hidden transition-all"
            >
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-end gap-3">
                  <span className="px-2.5 py-1 bg-theme-accent text-theme-accent-fg text-xs font-semibold rounded-full">
                    {service.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-theme-fg">{service.title}</h3>
                  <p className="text-xs text-theme-fg-muted leading-relaxed mt-1">{service.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5">
                    <p className="text-[11px] text-theme-muted">{t("estimated_price")}</p>
                    <p className="text-xs font-semibold text-theme-fg mt-1">{service.estimatedPrice}</p>
                  </div>
                  <div className="p-2.5">
                    <p className="text-[11px] text-theme-muted">{t("delivery_time")}</p>
                    <p className="text-xs font-semibold text-theme-fg mt-1">{service.deliveryTime}</p>
                  </div>
                  <div className="p-2.5">
                    <p className="text-[11px] text-theme-muted">{t("rating")}</p>
                    <div className="flex items-center gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        index < service.rating ? (
                          <PiStarFill key={`${service.title}-star-${index}`} size={12} className="text-yellow-400" />
                        ) : (
                          <PiStarBold key={`${service.title}-star-${index}`} size={12} className="text-theme-muted" />
                        )
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedService(service)}
                  className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 bg-theme-accent text-theme-accent-fg rounded-lg hover:opacity-80 transition-opacity text-sm font-medium hover:cursor-pointer"
                >
                  {t("request_service")}
                  <PiArrowRightBold size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-theme-bg border border-theme-border rounded-2xl p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-sm text-theme-muted uppercase tracking-wide font-medium">
                {t("custom_label")}
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-theme-fg mt-1">
                {t("custom_title")}
              </h2>
              <p className="text-sm text-theme-fg-muted mt-2">
                {t("custom_desc")}
              </p>
            </div>
            <a
              href="mailto:antoniovitafonseca@gmail.com?subject=Custom%20Service%20Proposal"
              className="inline-flex lg:justify-self-end items-center justify-center gap-2 px-5 py-3 border border-theme-border rounded-xl hover:bg-theme-surface transition-colors text-sm font-medium text-theme-fg"
            >
              {t("request_custom")}
              <PiArrowRightBold size={16} />
            </a>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-theme-bg border border-theme-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="overflow-y-auto p-6">
                <div className="space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-theme-fg mb-2">{selectedService.title}</h2>
                      <span className="px-3 py-1 bg-theme-accent text-theme-accent-fg text-xs font-semibold rounded-full">
                        {selectedService.category}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedService(null)}
                      className="p-2 hover:bg-theme-surface rounded-lg transition-colors text-theme-fg"
                    >
                      <PiXBold size={24} />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-theme-fg mb-2">{t("about_service")}</h3>
                    <p className="text-sm text-theme-fg-muted leading-relaxed">{selectedService.description}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-theme-muted">{t("estimated_price")}</p>
                      <p className="text-sm font-semibold text-theme-fg mt-1">{selectedService.estimatedPrice}</p>
                    </div>
                    <div>
                      <p className="text-xs text-theme-muted">{t("delivery_time")}</p>
                      <p className="text-sm font-semibold text-theme-fg mt-1">{selectedService.deliveryTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-theme-muted">{t("rating")}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          index < selectedService.rating ? (
                            <PiStarFill key={`${selectedService.title}-modal-star-${index}`} size={14} className="text-yellow-400" />
                          ) : (
                            <PiStarBold key={`${selectedService.title}-modal-star-${index}`} size={14} className="text-theme-muted" />
                          )
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-theme-fg mb-3">{t("technologies")}</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.technologies.map((item) => (
                        <span key={item} className="text-xs text-theme-fg-muted border border-theme-border bg-theme-surface rounded-full px-2.5 py-1">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <a
                      href={`mailto:antoniovitafonseca@gmail.com?subject=Service%20Request%20-%20${encodeURIComponent(selectedService.title)}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-theme-accent text-theme-accent-fg rounded-lg hover:opacity-80 transition-opacity text-sm font-medium"
                    >
                      {t("continue_request")}
                      <PiArrowRightBold size={16} />
                    </a>
                    <button
                      onClick={() => setSelectedService(null)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-theme-border rounded-lg hover:bg-theme-surface transition-colors text-sm font-medium text-theme-fg"
                    >
                      {t("close")}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;
