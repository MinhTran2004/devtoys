"use client"
export default function ButtonAuth0() {
    const handleSubmit = () => {
        window.location.href = `/api/auth/logout`;
    };

    return (
        <div className="cursor-pointer">
            <button onClick={handleSubmit}>Logout</button>
        </div>
    )
}