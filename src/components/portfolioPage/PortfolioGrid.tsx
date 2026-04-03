"use client";

import React, { useState } from "react";
import CardPortfolio from "./CardPortfolio";
import ProjectModal from "./ProjectModal";

interface Project {
  id: number;
  name: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  image: string;
  link: string;
  isTrending: boolean;
}

interface PortfolioGridProps {
  projects: Project[];
}

const PortfolioGrid = ({ projects }: PortfolioGridProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (projectId: number) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {projects.map((project) => (
          <CardPortfolio
            key={project.id}
            id={project.id}
            name={project.name}
            description={project.description}
            image={project.image}
            isTrending={project.isTrending}
            onOpenModal={handleOpenModal}
          />
        ))}
      </div>
      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </>
  );
};

export default PortfolioGrid;
