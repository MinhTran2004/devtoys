"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();

  const checkSession = async () => {
    const response = await fetch(`/api/auth/me`, {
      credentials: 'include'
    })
      .then(res => res.json());

    if (response.ok) {
      router.push(`/pages`);
    } else {
      router.push(`/welcome`);
    }
  }

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <div className="w-full h-full relative">
    </div>
  );
}