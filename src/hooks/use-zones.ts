"use client";

import { useQuery } from "@tanstack/react-query";
import type { ZoneRecord } from "@/db/schema";

export function useZones() {
  return useQuery<ZoneRecord[]>({
    queryKey: ["zones"],
    queryFn: async () => {
      const res = await fetch("/api/zones");
      if (!res.ok) throw new Error("Failed to fetch zones");
      const json = await res.json();
      return json.data as ZoneRecord[];
    },
  });
}
