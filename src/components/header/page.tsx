"use client"

import PrimaryButton from "../button";
import LogoutIcon from '@mui/icons-material/Logout';

interface HeaderProps {
    nameUser?: string,
}

export default function Header({
    nameUser
}: HeaderProps) {

    const handleLogout = () => {
        window.location.href = "/api/auth/logout";
    };

    return (
        <div className="flex items-end gap-2">
            <p>Hi, {nameUser}</p>
            <PrimaryButton
                name="Logout"
                disabled={true}
                iconRight={<LogoutIcon sx={{ height: 18 }} />}
                style={{ height: 10 }}
                onClick={handleLogout}
            />
        </div>
    )
}