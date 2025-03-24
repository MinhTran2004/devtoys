import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export default function DashboardPage(request: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (accessToken) {
    redirect(`/pages`);
  } else {
    redirect(`/welcome`);
  }

  return (
    <div className="w-full h-full relative">
    </div>
  );
}