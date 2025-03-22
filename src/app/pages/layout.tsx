import ButtonAuth0 from "@/components/button-auth0/page";
import SideBar from "@/components/side-bar";
import { Suspense } from "react";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-full w-full flex pt-2">
            <SideBar />
            <div className="bg-[#282828] px-7 pt-0 w-full h-full overflow-y-hidden box-border">
                {children}
            </div>
        </div>
    );
}
