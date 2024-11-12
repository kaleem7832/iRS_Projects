import Projects from "@/components/Projects";
import { Suspense } from "react";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";

export default async function Dashboard(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  console.log({ query, currentPage });
  return (
    <>
      <Search placeholder={"Search by Client"} />
      <Suspense key={query + currentPage} fallback={<p>Loading...</p>}>
        <Projects query={query} currentPage={currentPage} />
      </Suspense>
      <Pagination totalPages={5} />
    </>
  );
}
