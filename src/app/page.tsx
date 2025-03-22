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

    if (response) {
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
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/042/192/644/small_2x/ai-generated-mysterious-sunset-background-free-photo.jpg"
        className="h-full w-full absolute z-10"
        alt=""
      />
    </div>
  );
}