import Projects from "@/components/Projects";
import { Suspense } from "react";

export default async function Dashboard(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  console.log({ query, currentPage });
  return (
    <Suspense key={query + currentPage} fallback={<p>Loading...</p>}>
      <Projects query={query} currentPage={currentPage} />
    </Suspense>
  );
}
