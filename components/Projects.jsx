"use client";

import { useEffect, useState } from "react";
import Pagination from "./Pagination";

import ProjectTr from "./ProjectTr";
import Search from "./Search";

export default function Projects({ query, currentPage }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
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
        setProjects(data);
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
      <Search placeholder={"Search by Client"} />
      <div className="overflow-x-auto">
        <table className="table ">
          <thead className="text-white text-sm bg-slate-900">
            <tr>
              <td>Date</td>
              <td>Client</td>
              <td>Title</td>
              <td>Methodology</td>
              <td>Programmer</td>
              <td>Status</td>
              <td></td>
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
      </div>
    </div>
  );
}
