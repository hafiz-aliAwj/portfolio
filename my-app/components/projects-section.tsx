"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import CardFlip from "react-card-flip";
import {
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/section-heading";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/models";

interface ProjectsSectionProps {
  projects?: Project[];
}

export default function ProjectsSection({ projects = [] }: ProjectsSectionProps) {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState(false);
  const [transitionType, setTransitionType] = useState<"fade" | "slide" | "zoom">("fade");
  const modalRef = useRef<HTMLDivElement | null>(null);

  const toggleFlip = (projectId: string) => {
    setFlippedCards((prev) => ({ ...prev, [projectId]: !prev[projectId] }));
  };

  const toggleExpand = (projectId: string) => {
    setExpandedCards((prev) => ({ ...prev, [projectId]: !prev[projectId] }));
  };

  const openModal = (project: Project, index: number) => {
    setSelectedProject(project);
    setCurrentImageIndex(index);
    setIsModalOpen(true);
    setIsSlideshowPlaying(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setIsSlideshowPlaying(false);
  };

  const toggleSlideshow = () => setIsSlideshowPlaying((prev) => !prev);
  const nextImage = () => {
    if (!selectedProject) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
  };
  const prevImage = () => {
    if (!selectedProject) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedProject.images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (!isSlideshowPlaying || !selectedProject) return;
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, [isSlideshowPlaying, selectedProject]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleCloseModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <section className="relative w-full px-4 py-20 bg-muted/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Projects"
          subtitle="Explore some of the personal and professional projects I’ve crafted."
        />

        <div className="flex flex-wrap justify-center gap-6 mt-12">
          {projects.map((project, index) => {
            const projectId = `${index}`;
            const isFlipped = flippedCards[projectId] || false;
            const isExpanded = expandedCards[projectId] || false;

            return (
              <motion.div
                key={projectId}
                className="w-[calc(33.333%-2rem)] overflow-hidden min-w-[300px] flex-shrink-0"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CardFlip isFlipped={isFlipped} flipDirection="horizontal">
                  {/* Front Side */}
                  <Card
                    className={cn(
                      "flex flex-col border border-border bg-background/50 backdrop-blur-lg rounded-2xl transition-all duration-500",
                      isExpanded ? "h-[34rem]" : "h-[26rem]"
                    )}
                  >
                    <div
                      className="relative h-48 overflow-hidden cursor-pointer group"
                      onClick={() => openModal(project, 0)}
                    >
                      <Image
                        src={project.images[0] || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover rounded-t-2xl group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Maximize2 className="text-primary w-6 h-6" />
                      </div>
                    </div>
                    <CardContent className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                      <p className={cn("text-sm text-muted-foreground mb-2 transition-all duration-300", !isExpanded && "line-clamp-2")}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-auto pt-4 flex justify-between items-center">
                        <div className="flex gap-2">
                          {project.githubUrl && (
                            <Button asChild variant="outline" className="gap-1">
                              <a href={project.githubUrl} target="_blank">
                                <Github className="w-4 h-4" />
                                GitHub
                              </a>
                            </Button>
                          )}
                          {project.liveUrl && (
                            <Button asChild variant="outline" className="gap-1">
                              <a href={project.liveUrl} target="_blank">
                                <ExternalLink className="w-4 h-4" />
                                Live
                              </a>
                            </Button>
                          )}
                        </div>
                        <Button size="sm" onClick={() => toggleFlip(projectId)}>
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Back Side */}
                  <Card className="overflow-y-auto flex flex-col justify-stretch items-start border border-primary bg-background p-6 rounded-2xl shadow-md h-[26rem]">
                    <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                    <div className="overflow-y-scroll custom-scroll">
                      {project.longDescription && (
                        <div className="mb-4 space-y-2 text-sm">
                          {project.longDescription.map((item, i) => (
                            <p key={i} className="leading-relaxed text-foreground/80">
                              • {item}
                            </p>
                          ))}
                        </div>
                      )}
                      {project.features && (
                        <div className="mb-4">
                          <h4 className="font-semibold mb-1">Features:</h4>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            {project.features.map((feat, i) => (
                              <li key={i}>{feat}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="mt-auto flex flex-row w-full justify-between">
                      <Button size="sm" onClick={() => toggleFlip(projectId)}>
                        Back
                      </Button>
                      <Button variant="outline" onClick={() => openModal(project, 0)}>
                        View Images
                      </Button>
                    </div>
                  </Card>
                </CardFlip>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex justify-center items-center p-4">
          <div
            ref={modalRef}
            className="relative w-full max-w-5xl bg-background rounded-lg overflow-hidden shadow-2xl flex flex-col"
          >
            <button onClick={handleCloseModal} className="absolute top-3 right-3 text-foreground p-2 z-20 rounded-full">
              &times;
            </button>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{
                  opacity: 0,
                  x: transitionType === "slide" ? 100 : 0,
                  scale: transitionType === "zoom" ? 0.8 : 1,
                }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  x: transitionType === "slide" ? -100 : 0,
                  scale: transitionType === "zoom" ? 0.8 : 1,
                }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-[30rem] sm:h-[34rem] flex justify-center items-center bg-black"
              >
                <Zoom>
                  <Image
                    src={selectedProject.images[currentImageIndex] || "/placeholder.svg"}
                    alt={selectedProject.title}
                    fill
                    className="object-contain select-none"
                  />
                </Zoom>
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-y-0 left-0 flex items-center px-3">
              <button onClick={prevImage} className="text-white p-3 bg-primary/20 hover:bg-primary/40 rounded-full">
                <ChevronLeft size={28} />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center px-3">
              <button onClick={nextImage} className="text-white p-3 bg-primary/20 hover:bg-primary/40 rounded-full">
                <ChevronRight size={28} />
              </button>
            </div>

            <div className="flex justify-center items-center py-3 bg-background/90 border-t border-border space-x-4">
              <button
                onClick={toggleSlideshow}
                className="text-white p-2 bg-primary/20 hover:bg-primary/40 rounded-full"
              >
                {isSlideshowPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <span className="text-white text-sm">
                {currentImageIndex + 1} / {selectedProject.images.length}
              </span>
              <select
                className="text-white bg-primary/20 hover:bg-primary/40 p-2 rounded text-sm"
                value={transitionType}
                onChange={(e) => setTransitionType(e.target.value as any)}
              >
                <option value="fade">Fade</option>
                <option value="slide">Slide</option>
                <option value="zoom">Zoom</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
