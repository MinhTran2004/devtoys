"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {

  const router = useRouter();

  const checkSession = async () => {
    const response = await fetch(`/api/login`)
      .then(res => res.json())
    if (response.session?.user) {
      router.push('/pages');
    }
  }

  useEffect(() => {
    checkSession();
  }, []);

  const handleLogin = () => {
    router.push(`/api/auth/login`);
  };

  return (
    <div className="w-full h-full relative">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/042/192/644/small_2x/ai-generated-mysterious-sunset-background-free-photo.jpg"
        className="h-full w-full absolute z-10"
        alt=""
      />

      <button
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-[#442039] px-7 py-3 rounded-3xl active:scale-95"
        onClick={handleLogin}
      >LOGIN</button>
    </div>
  );
}