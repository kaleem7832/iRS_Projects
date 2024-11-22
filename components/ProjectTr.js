import Link from "next/link";

const ProjectTr = ({ project }) => {
  function formated(isoString) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  }
  return (
    <tr>
      <td>{formated(project.received)}</td>
      <td>{project.client}</td>
      <td>{project.title}</td>
      <td>{project.methodology}</td>
      <td>{project.programmer1}</td>
      <td>{project.status}</td>
      <td>
        <Link
          href={"/dashboard/project/" + project.confirmit}
          className="btn btn-sm btn-neutral"
        >
          Open
        </Link>
      </td>
    </tr>
  );
};

export default ProjectTr;
