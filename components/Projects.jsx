"use client";

import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import ProjectTr from "./ProjectTr";

export default function Projects({ query, currentPage }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotal] = useState(0);
  useEffect(() => {
    setLoading(true);
    const fetchProjects = async () => {
      try {
        const response = await fetch("api/projects", {
          cache: "no-store",
          method: "POST",
          body: JSON.stringify({ query, currentPage }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setProjects(data.filterProjects);
        setTotal(data.totalPages);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProjects();
  }, []);

  if (loading)
    return (
      <div className="text-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  return (
    <div className=" container mx-auto mt-5">
      <div className="overflow-x-auto">
        <table className="table ">
          <thead>
            <tr>
              <td>Date</td>
              <td>Client</td>
              <td>Title</td>
              <td>Methodology</td>
              <td>Programmer</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              {
                return <ProjectTr key={project.confirmit} project={project} />;
              }
            })}
          </tbody>
        </table>
        <div className="flex justify-end mt-2">
          <Pagination totalPages={totalPages} page={currentPage} />
        </div>
      </div>
    </div>
  );
}
