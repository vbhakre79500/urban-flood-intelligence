import * as React from "react";
import { CitizenShell } from "@/components/layout/citizen-shell";

export default function CitizenLayout({ children }: { children: React.ReactNode }) {
  return <CitizenShell>{children}</CitizenShell>;
}
