"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SectionHeading from "@/components/section-heading"
import { cn } from "@/lib/utils"
import type { Experiencei } from "@/lib/models"

interface ExperienceSectionProps {
  experiences?: Experiencei[]
}

export default function ExperienceSection({ experiences = [] }: ExperienceSectionProps) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 0.8])
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0.2, 1])

  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-muted/40 to-muted/10 relative overflow-hidden">
      {/* Glowing orb background */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl z-0"
      />
      
      <div ref={containerRef} className="container mx-auto px-4 relative z-10">
        <SectionHeading
          title="Work Experience"
          subtitle="My professional journey and career highlights."
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <motion.div
            style={{ scaleY: lineScaleY }}
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/60 to-transparent origin-top transform md:translate-x-[-0.5px]"
          />

          {/* Timeline Entries */}
          {experiences.map((experience, index) => {
            const isLeft = index % 2 === 0
            return (
              <motion.div
                key={experience._id?.toString() || index}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  "relative flex flex-col md:flex-row mb-16 group",
                  isLeft ? "md:flex-row-reverse" : ""
                )}
              >
                {/* Glowing timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-0 md:left-1/2 top-2 w-6 h-6 rounded-full bg-primary shadow-lg transform translate-x-[-12px] md:translate-x-[-12px] z-10"
                >
                  <div className="absolute w-full h-full rounded-full bg-primary/20 animate-ping" />
                </motion.div>

                {/* Card Content */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={cn(
                    "w-full md:w-[calc(50%-24px)] transform-gpu",
                    isLeft ? "md:mr-auto" : "md:ml-auto"
                  )}
                >
                  <div className="perspective-[1200px]">
                    <motion.div
                      whileHover={{ rotateY: isLeft ? -8 : 8, scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="rounded-2xl bg-background shadow-2xl transition-all duration-300 hover:shadow-primary/30 hover:ring-1 hover:ring-primary"
                    >
                      <Card className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="mb-2 text-sm font-medium text-muted-foreground">
                            {experience.period}
                          </div>
                          <h3 className="text-xl font-bold mb-1">{experience.title}</h3>
                          <div className="text-primary font-medium mb-4">{experience.company}</div>
                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {experience.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {experience.skills.map((skill) => (
                              <Badge key={skill} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
