import Link from "next/link";

const Project = ({ project }) => {
  return (
    <Link href={"/dashboard/project/" + project.confirmit}>
      <div className="border border-slate-500 m-2 p-2 rounded-md bg-slate-50 grid grid-cols-8 gap-4">
        <div className="col-span-1 ">
          {new Date(project.received).toDateString()}
        </div>
        <div className="col-span-1">{project.confirmit}</div>
        <div className="col-span-1">{project.client}</div>
        <div className="col-span-2">{project.title}</div>
        <div className="col-span-1 ">{project.programmer1}</div>

        <div className="col-span-1 ">
          {new Date(project.delivery).toDateString()}
        </div>
        <div className="col-span-1 ">{project.manager}</div>
      </div>
    </Link>
  );
};

export default Project;
