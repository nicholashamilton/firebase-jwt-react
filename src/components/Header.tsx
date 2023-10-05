import { Link } from "react-router-dom";
import SignOutButton from "@/components/SignOutButton";
import { useUserContext } from "@/context/user/useUserContext";

export default function Header() {

    const { user, isUserLoading } = useUserContext();

    return (
        <header>
            <nav>
                <Link
                    to=""
                    className="mr-4 text-lg font-medium"
                >
                    Home
                </Link>
                {isUserLoading ?
                    <span>Loading User...</span>
                :
                    <>
                        {user ?
                            <>
                                <Link
                                    to="edit-user"
                                    className="mr-4 text-lg font-medium"
                                >
                                    Edit User
                                </Link>
                                <SignOutButton
                                    className="mr-4 text-lg font-medium"
                                />
                            </>
                        :
                            <>
                                <Link
                                    to="login"
                                    className="mr-4 text-lg font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="sign-up"
                                    className="mr-4 text-lg font-medium"
                                >
                                    Sign up
                                </Link>
                                <Link
                                    to="forgot-password"
                                    className="text-lg font-medium"
                                >
                                    Forgot Password
                                </Link>
                            </>
                        }
                    </>
                }
            </nav>
        </header>
    );
}
