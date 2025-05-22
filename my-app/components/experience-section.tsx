"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/section-heading";
import { cn } from "@/lib/utils";
import type { Experiencei } from "@/lib/models";

interface ExperienceSectionProps {
  experiences?: Experiencei[];
}

export default function ExperienceSection({ experiences = [] }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Work Experience"
          subtitle="My professional journey and career highlights."
        />

        <div className="relative max-w-5xl mx-auto mt-20">
          {/* Timeline Rod */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1 }}
            className="absolute left-1/2 top-0 bottom-0 w-[4px] bg-primary via-primary/60 to-transparent transform -translate-x-1/2 z-0 shadow-[0_0_25px_5px_rgba(99,102,241,0.4)]"
          />
          <div className="relative z-10 space-y-28">
            {experiences.map((experience, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={experience._id?.toString() || index}
                  initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className={cn(
                    "w-full md:w-1/2 relative",
                    isLeft ? "md:pr-12 md:ml-0 md:mr-auto text-right" : "md:pl-12 md:mr-0 md:ml-auto text-left"
                  )}
                >
                  {/* Connector Circle */}
                  <div
                    className={cn(
                      "absolute top-6 w-4 h-4 rounded-full bg-primary border-4 border-background z-10 shadow-md",
                      isLeft ? "right-[-32px]" : "left-[-32px]"
                    )}
                  >
                    <div className="w-2 h-2 bg-primary/70 animate-ping rounded-full mx-auto mt-[6px]"></div>
                  </div>

                  {/* Experience Card */}
                  <Card className="bg-background border border-border text-left shadow-lg hover:shadow-primary/30 transition-shadow duration-300 rounded-2xl">
                    <CardContent className="p-6 space-y-4">
                      <div className="text-sm text-muted-foreground">{experience.period}</div>
                      <div className="text-xl font-bold text-foreground">{experience.title}</div>
                      <div className="text-primary font-semibold">{experience.company}</div>
                      <div className="text-sm text-muted-foreground space-y-2 leading-relaxed px-2 pl-4 pt-2">
                        <ul>

                        {experience.description.map((desc, i) => (
                          <li className="list-outside list-disc" key={i}> {desc}</li>
                        ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-3">
                        {experience.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
