"use client"

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function ButtonAuth0() {
    const [session, setSession] = useState<string | null>("");
    const router = useRouter();

    const checkSession = async () => {
        const response = await fetch(`/api/login`)
            .then(res => res.json())
        setSession(response.value);
    };

    useEffect(() => {
        checkSession();
    }, []);


    const handleSubmit = useCallback(() => {
        if (session) {
            router.push(`/api/auth/logout`);
        } else {
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