import { Suspense } from "react";
import Loading from "./loading";

import Projects from "@/components/Projects";

export default function Dashboard() {
  return (
    <Suspense fallback={<Loading />}>
      <Projects />
    </Suspense>
  );
}
