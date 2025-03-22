'use client'
import InputField from "@/components/input-field";
import { useEffect, useState } from "react";

interface UserInfo {
    name: string;
    nickname: string;
    picture: string;
    sub: string;
    updated_at: string;
}

export default function ProfilePage() {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    const getUserInfo = async () => {
        try {
            const response = await fetch(`/api/auth/me`);
            const data = await response.json();
            setUserInfo(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <div className="w-9/12 h-full mx-auto">
            {userInfo && (
                <div className="flex flex-col justify-center mt-40">
                    <div className="w-full flex justify-center">
                        <img src={userInfo.picture} alt="Profile" className="rounded-full" />
                    </div>
                    <div className="grid grid-cols-2 mt-20 gap-10">
                        <InputField disabled value={userInfo.name} />
                        <InputField disabled value={userInfo.nickname} />
                        <InputField disabled value={userInfo.sub} />
                        <InputField disabled value={userInfo.updated_at} />
                    </div>
                </div>
            )}
        </div>
    );
}