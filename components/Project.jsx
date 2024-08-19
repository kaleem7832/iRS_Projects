import Link from "next/link";

const Project = ({ project }) => {
  function formated(isoString) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  }
  return (
    <Link
      href={"/dashboard/project/" + project.confirmit}
      className="rounded-md border border-slate-600 p-4"
    >
      <div className="text-md">
        {project.title}
        <p className="border-t border-t-slate-600 text-xs text-slate-400">
          Project name
        </p>
      </div>
      <div className="mt-3 flex justify-between">
        <div>
          Online
          <p className="border-t border-t-slate-600 text-xs text-slate-400">
            Methodology
          </p>
        </div>
        <div className="text-right">
          {project.programmer1}
          <p className="border-t border-t-slate-600 text-xs text-slate-400">
            Programmer
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-grow justify-between">
        <div class="text-sm">
          {formated(project.received)}
          <p className="border-t border-t-slate-600 text-xs text-slate-400">
            Received
          </p>
        </div>
        <div className="text-sm text-right">
          {formated(project.delivery)}
          <p class="border-t border-t-slate-600 text-xs text-slate-400">
            Delivery
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Project;
