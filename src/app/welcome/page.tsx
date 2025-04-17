'use client'

export default function WelcomePage() {
    const handleLogin = async () => {
        try {
            window.location.href = `api/auth/login`;
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="w-full h-screen relative">
            <img
                src="https://img.freepik.com/free-vector/luxury-blue-golden-background_23-2149329427.jpg?semt=ais_hybrid"
                className="h-full w-full absolute z-20"
                alt=""
            />
            <button
                className="absolute cursor-pointer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-[#442039] px-7 py-3 rounded-3xl active:scale-95 text-white"
                onClick={handleLogin}
            >LOGIN</button>
        </div>
    )
}