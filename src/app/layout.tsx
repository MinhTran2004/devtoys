import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/side-bar"
import { UserProvider } from '@auth0/nextjs-auth0/client';
import PrimaryButton from "@/components/button";
import LogoutIcon from '@mui/icons-material/Logout';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevToys",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const logout = () => {
    window.location.href = "/api/auth/logout";
  }

  return (
    <html lang="en">
      <UserProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <div id="main">
            <SideBar />
            <div className="bg-[#282828] rounded-2xl p-7 pt-0  w-full h-full overflow-y-hidden box-border">
              <div className="w-full flex justify-end">
                <PrimaryButton
                  name="Logout"
                  disabled={true}
                  iconRight={<LogoutIcon sx={{height: 18}}/>}
                  style={{height: 10}}
                  // onClick={logout}
                />
              </div>
              {children}
            </div>
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
