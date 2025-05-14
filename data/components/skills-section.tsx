"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import SectionHeading from "@/components/section-heading"
import Container from "@/components/container"
import AnimatedProgress from "@/components/animated-progress"
import { cn } from "@/lib/utils"
import type { Skilli } from "@/lib/models"
import Image from "next/image"
import { string } from "zod"

interface SkillsSectionProps {
  skills?: Skilli[]
}

export default function SkillsSection({ skills = [] }: SkillsSectionProps) {
  const [skillsByCategory, setSkillsByCategory] = useState<Record<string, Skilli[]>>({})
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    if (skills.length > 0) {
      // Group skills by category
      const grouped = skills.reduce<Record<string, Skilli[]>>((acc, skill) => {
        const category = skill.category
        if (!acc[category]) {
          acc[category] = []
        }
        acc[category].push(skill)
        return acc
      }, {})

      setSkillsByCategory(grouped)
      setActiveCategory(Object.keys(grouped)[0])
    }
  }, [skills])

  const categories = Object.keys(skillsByCategory)

  return (
    <section id="skills" className="py-20 xl:px-14 bg-muted/30">
      <Container>
        <SectionHeading
          title="My Skills"
          subtitle="I've worked with a variety of technologies and tools throughout my career."
        />

        {/* Category Tabs - Scrollable container for mobile */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <div className="flex flex-nowrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all hover-target whitespace-nowrap",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80",
                )}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeCategory &&
            skillsByCategory[activeCategory]?.map((skill, index) => (
              <div className="transition-all duration-500 ease-in-out"
                key={skill._id?.toString() || index}
                // initial={{ opacity: 0, y: 20 }}
                // whileInView={{ opacity: 1, y: 0 }}
                // viewport={{ once: true, margin: "-100px" }}
                // transition={{ duration: 0.5, delay: index * 0.1 }}
                // whileHover={{ scale: 1.02 }}
              >
                <Card className="overflow-hidden h-full">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex justify-start items-center gap-x-2">
                        <Image src={skill.imgUrl} alt={skill.name} width={50} height={50} className="rounded-full border-2 border-gray-200" />

                      <h3 className="text-lg font-bold">{skill.name}</h3>
                      </div>
                      <span className="text-sm font-medium text-primary">{skill.level}%</span>
                    </div>

                    <AnimatedProgress value={skill.level} color="primary" height={8} delay={0.2 + index * 0.1} />

                    {/* {skill.description && <p className="text-sm text-muted-foreground mt-3">{skill.description}</p>} */}
                  </CardContent>
                </Card>
              </div>
            ))}
        </div>
      </Container>
    </section>
  )
}
