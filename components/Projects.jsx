"use client";

import { useEffect, useState } from "react";
import Project from "./Project";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("api/projects", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className=" container mx-auto mt-5">
      <div className="grid gap-3 grid-cols-3">
        {projects.map((project) => {
          {
            return <Project key={project.confirmit} project={project} />;
          }
        })}
      </div>
    </div>
  );
}
