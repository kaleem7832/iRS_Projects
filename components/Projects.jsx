"use client";

import { useEffect, useState } from "react";
import Project from "./Project";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("api/projects");
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
    <>
      {projects.map((project) => {
        {
          return <Project project={project} />;
        }
      })}
    </>
  );
}
