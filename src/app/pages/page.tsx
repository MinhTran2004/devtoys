'use client'

import ListCard from "@/components/card/list-card";
import { DataAllTools } from "../../data/all-tools";
import { useEffect, useState } from "react";

interface UserInfo {
    name: string,
    nickname: string,
    picture: string,
    sub: string,
    updated_at: string,
}

export default function MainPage() {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const data = DataAllTools;
    const filter = data.filter((item) => item.link);

    const getUserInfo = async () => {
        try {
            const response = await fetch(`api/auth/me`)
                .then(res => res.json());
            setUserInfo(response);
        } catch (err) {
            console.log(err);
        }
    }

    const handleLogout = () => {
        window.location.href = `/api/auth/logout`;
    }

    const toProfilePage = () => {
        window.location.href = `pages/profile`;
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <div className="pb-100">
            <div className="w-full flex justify-between">
                <div className="flex">
                    <h1 className="text-4xl font-bold">Welcome to DevToys</h1>
                    <p className="text-base">v2.0-preview.8</p>
                </div>
                <div className="relative">
                    <img
                        onClick={() => setIsChecked(!isChecked)}
                        src={userInfo?.picture}
                        className="h-12 rounded-4xl cursor-pointer"
                        alt=""
                    />
                    {isChecked &&
                        (<div className="w-28 flex flex-col bg-[#404040] absolute -left-15 mt-1 p-2 gap-2 z-10">
                            <option
                                value="Profile"
                                onClick={() => toProfilePage()}
                                className="cursor-pointer"
                            >Profile</option>

                            <option
                                value="Logout"
                                onClick={() => handleLogout()}
                                className="cursor-pointer"
                            >Logout</option>
                        </div>)}
                </div>
            </div>
            <div>
                <ListCard title="All tools" data={filter} />
            </div>
        </div>
    );
}
