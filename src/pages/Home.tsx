import SEO from "@/components/SEO";
import { useUserContext } from "@/context/user/useUserContext";

export default function Home() {

    const { user, isUserLoading } = useUserContext();

    return (
        <div className="block relative">
            <SEO
                title="Home"
                description="Home"
            />
            <h1 className="mt-8 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl">
                {isUserLoading ?
                    <>Loading User...</>
                :
                    <>{user ? `Welcome, ${user.displayName ? user.displayName : user.email}` : 'No User'}</>
                }
            </h1>
        </div>
    );
}