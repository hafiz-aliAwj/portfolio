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
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeading title="Work Experience" subtitle="My professional journey and career highlights." />

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:translate-x-[-0.5px]" />

          {/* Experience Items */}
          {experiences.map((experience, index) => (
            <div
              key={experience._id?.toString() || index}
              className={cn(
                "relative flex flex-col md:flex-row mb-12 last:mb-0",
                index % 2 === 0 ? "md:flex-row-reverse" : "",
              )}
            >
              {/* Timeline Dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="absolute left-0 md:left-1/2 top-0 w-5 h-5 rounded-full bg-primary transform translate-x-[-10px] md:translate-x-[-10px] z-10"
              />

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className={cn("w-full md:w-[calc(50%-20px)]", index % 2 === 0 ? "md:mr-auto" : "md:ml-auto")}
              >
                <Card className="overflow-hidden hover-target h-full">
                  <CardContent className="p-6">
                    <div className="mb-2 text-sm font-medium text-muted-foreground">{experience.period}</div>

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
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
