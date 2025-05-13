"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import SectionHeading from "@/components/section-heading"
import type { Educationi } from "@/lib/models"

interface EducationSectionProps {
  education?: Educationi[]
}

export default function EducationSection({ education = [] }: EducationSectionProps) {
  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading title="Education" subtitle="My academic background and qualifications." />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {education.map((item, index) => (
            <motion.div
              key={item._id?.toString() || index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card className="overflow-hidden h-full hover-target border-2 hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-2 text-sm font-medium text-muted-foreground">{item.period}</div>

                  <h3 className="text-xl font-bold mb-1">
                    {item.degree} in {item.field}
                  </h3>
                  <div className="text-primary font-medium mb-4">{item.institution}</div>

                  <p className="text-muted-foreground mb-4">{item.description}</p>

                  {item.achievements && item.achievements.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold mb-2">Achievements:</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {item.achievements.map((achievement, i) => (
                          <li key={i} className="mb-1">
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
