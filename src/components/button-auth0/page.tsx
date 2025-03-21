"use client"

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function ButtonAuth0() {
    const [session, setSession] = useState<string | null>("");
    const router = useRouter();

    const checkSession = async () => {
        const response = await fetch(`/api/login`)
            .then(res => res.json())
        setSession(response.session?.user);
    };

    useEffect(() => {
        checkSession();
    }, []);


    const handleSubmit = useCallback(() => {
        if (session) {
            console.log('haha');
            router.push(`/api/auth/logout`);
        } else {
            console.log('hihi');
            router.push(`/api/auth/login`);
        }
    }, [session])

    return (
        <div className="cursor-pointer">
            <button
                onClick={handleSubmit}
            >{session ? "Logout" : "Login"}</button>
        </div>
    )
}