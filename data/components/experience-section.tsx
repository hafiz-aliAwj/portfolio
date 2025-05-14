"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SectionHeading from "@/components/section-heading"
import { cn } from "@/lib/utils"
import type { Experiencei } from "@/lib/models"

interface ExperienceSectionProps {
  experiences?: Experiencei[]
}

export default function ExperienceSection({ experiences = [] }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Work Experience"
          subtitle="My professional journey and career highlights."
        />

        <div className="relative max-w-5xl mx-auto mt-16">
          {/* Glowing Timeline Rod */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1 }}
            className="absolute left-1/2 top-0 bottom-0 w-[4px] bg-gradient-to-b from-primary via-primary/60 to-transparent transform -translate-x-1/2 z-0 shadow-[0_0_25px_5px_rgba(99,102,241,0.4)]"
          />

          {/* Experience Items */}
          <div className="space-y-24 relative z-10">
            {experiences.map((experience, index) => {
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={experience._id?.toString() || index}
                  initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className={cn(
                    "w-full md:w-1/2 relative",
                    isLeft ? "md:pr-12 md:ml-0 md:mr-auto" : "md:pl-12 md:mr-0 md:ml-auto",
                    "group"
                  )}
                >
                  {/* Connector bar from rod to card */}
                  <div
                    className={cn(
                      "absolute top-12 w-6 h-1 bg-primary z-0",
                      isLeft ? "right-0" : "left-0"
                    )}
                  />

                  {/* Experience Card */}
                  <Card
                    className={cn(
                      "bg-background shadow-xl transform transition-transform duration-300 hover:scale-[1.02]",
                      "group-hover:shadow-primary/30 group-hover:ring-1 group-hover:ring-primary",
                      isLeft ? "origin-left" : "origin-right"
                    )}
                    style={{
                      transform: `perspective(1000px) rotateY(${isLeft ? "-2deg" : "2deg"})`,
                    }}
                  >
                    <CardContent className="p-6 relative z-10">
                      <div className="mb-2 text-sm font-medium text-muted-foreground">
                        {experience.period}
                      </div>
                      <h3 className="text-xl font-bold mb-1">{experience.title}</h3>
                      <div className="text-primary font-medium mb-4">{experience.company}</div>
                      <p className="text-muted-foreground mb-4">{experience.description}</p>
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
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
