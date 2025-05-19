"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/section-heading";
import Container from "@/components/container";
import AnimatedProgress from "@/components/animated-progress";
import { cn } from "@/lib/utils";
import type { Skilli } from "@/lib/models";

interface SkillsSectionProps {
  skills?: Skilli[];
}

export default function SkillsSection({ skills = [] }: SkillsSectionProps) {
  const [skillsByCategory, setSkillsByCategory] = useState<Record<string, Skilli[]>>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isCarouselEnabled, setIsCarouselEnabled] = useState<boolean>(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState<boolean>(false);

  useEffect(() => {
    const grouped = skills.reduce<Record<string, Skilli[]>>((acc, skill) => {
      const category = skill.category || "Other";
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
      return acc;
    }, {});
    setSkillsByCategory(grouped);
    setActiveCategory(Object.keys(grouped)[0] || null);
  }, [skills]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categories = Object.keys(skillsByCategory);

  const renderSkillCard = (skill: Skilli, index: number) => (
    <motion.div
      key={skill._id?.toString() || index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full shadow-sm hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-3">
              <div className="relative w-[50px] h-[50px] shrink-0">
                {skill.imgUrl ? (
                  <Image
                    src={skill.imgUrl}
                    alt={skill.name}
                    fill
                    className=" border-2 border-gray-200 object-cover transition-opacity duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const fallback = target.parentElement?.querySelector(".fallback-avatar") as HTMLElement;
                      fallback?.classList.remove("hidden");
                    }}
                  />
                ) : null}
                <div
                  className={cn(
                    "fallback-avatar hidden absolute inset-0 rounded-full flex items-center justify-center font-bold",
                    "bg-blue-400 text-black dark:text-white"
                  )}
                >
                  {skill.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <h3 className="text-lg font-semibold">{skill.name}</h3>
            </div>
            <span className="text-sm font-medium text-primary">{skill.level}%</span>
          </div>
          <AnimatedProgress
            value={skill.level}
            color="primary"
            height={8}
            delay={0.2 + index * 0.05}
          />
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <section id="skills" className="py-20 xl:px-14 bg-muted/30 transition-colors duration-300">
      <Container>
        <SectionHeading
          title="My Skills"
          subtitle="I've worked with a variety of technologies and tools throughout my career."
        />

        {/* Category Tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <div className="flex flex-nowrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary hover:bg-secondary/80"
                )}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Skills Display */}
        {activeCategory && (
          <>
            {isMobileOrTablet && isCarouselEnabled ? (
              <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={20}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                  },
                  640: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                  },
                }}
                className="w-full"
              >
                {skillsByCategory[activeCategory]?.map((skill, index) => (
                  <SwiperSlide key={skill._id?.toString() || index}>
                    {renderSkillCard(skill, index)}
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div
                className="flex justify-center flex-wrap gap-6 justify-start items-stretch transition-all duration-300 overflow-hidden"
                style={{
                  rowGap: "24px",
                  columnGap: "24px",
                }}
              >
                {skillsByCategory[activeCategory]?.map((skill, index) => (
                  <div
                    key={skill._id?.toString() || index}
                    style={{
                      flex: `${skillsByCategory[activeCategory].length > 2 ? "1 1 calc(33.333% - 16px)" : "1 1 calc(50% - 16px)"} `,
                      minWidth: "300px",
                      maxWidth: "calc(33.333% - 16px)",
                    }}
                  >
                    {renderSkillCard(skill, index)}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
}
