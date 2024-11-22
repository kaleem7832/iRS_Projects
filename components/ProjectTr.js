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
        <Link href={"/dashboard/project/" + project.confirmit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-5"
          >
            <path
              fill-rule="evenodd"
              d="M15.75 2.25H21a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-1.5 0V4.81L8.03 17.03a.75.75 0 0 1-1.06-1.06L19.19 3.75h-3.44a.75.75 0 0 1 0-1.5Zm-10.5 4.5a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V10.5a.75.75 0 0 1 1.5 0v8.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V8.25a3 3 0 0 1 3-3h8.25a.75.75 0 0 1 0 1.5H5.25Z"
              clip-rule="evenodd"
            />
          </svg>
        </Link>
      </td>
    </tr>
  );
};

export default ProjectTr;
