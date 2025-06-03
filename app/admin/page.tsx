"use client";
import Statistic from "@/components/admin/statistics/Statistic";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function AdminHomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user?.role !== "admin") {
      router.push("/"); // Ra ngoài nếu không phải admin
    }
  }, [session, status, router]);
  return (
    <div>
      <Statistic />
    </div>
  );
}
