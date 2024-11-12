import Projects from "@/components/Projects";
import { Suspense } from "react";
import Search from "@/components/Search";

export default async function Dashboard(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <>
      <Search placeholder={"Search by Client"} />
      <Suspense key={query + currentPage} fallback={<p>Loading...</p>}>
        <Projects query={query} currentPage={currentPage} />
      </Suspense>
    </>
  );
}
