import ButtonAuth0 from "@/components/button-auth0/page";

export default function WelcomePage() {
    return (
        <div className="w-full h-screen relative">
            <img
                src="https://img.freepik.com/free-vector/luxury-blue-golden-background_23-2149329427.jpg?semt=ais_hybrid"
                className="h-full w-full absolute z-20"
                alt=""
            />

            <ButtonAuth0 />
        </div>
    )
}