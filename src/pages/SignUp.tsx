import { FormEvent, useState } from "react";
import { useUserContext } from "../context/user/useUserContext";
import { useRedirectToProfileIfUser } from "../hooks/user/useRedirectToProfileIfUser";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firebaseErrorRecord, isFirebaseError } from "../lib/firebase";
import SEO from "../components/SEO";

export default function SignUp() {

    const { user } = useUserContext();

    useRedirectToProfileIfUser();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formUser, setFormUser] = useState({
        email: '',
        password: '',
        username: '',
    });

    function handleUserInputChange(e: React.FormEvent<HTMLInputElement>) {
        const input = e.currentTarget;
        const { name, value } = input;
        setFormUser({
            ...formUser,
            [name]: value,
        });
    }

    async function handleSignUp(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            setIsSubmitting(true);

            await createUserWithEmailAndPassword(auth, formUser.email, formUser.password);

            toast('Account Created.', {
                type: 'success',
            });
        }
        catch (error) {
            let errorMessage = 'Unknown error occurred while signing up.';

            if (isFirebaseError(error) && firebaseErrorRecord[error.code]) {
                errorMessage = firebaseErrorRecord[error.code];
            }

            toast(errorMessage, {
                type: 'error',
            });
        }

        setIsSubmitting(false);
    }

    if (user) return null;

    return (
        <div className="block relative">
            <SEO
                title="Sign Up"
                description="Sign Up"
            />
            <h1 className="mt-8 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl">
                Sign Up
            </h1>
            <form
                onSubmit={handleSignUp}
                className="block mt-10"
            >
                <div className="block mb-4">
                    <label
                        htmlFor="email"
                        className="inline-block mb-2 text-sm font-medium text-gray-900"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="block w-full max-w-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                        placeholder="Enter email..."
                        required
                        value={formUser.email}
                        onChange={handleUserInputChange}
                    />
                </div>
                <div className="block mb-4">
                    <label
                        htmlFor="password"
                        className="inline-block mb-2 text-sm font-medium text-gray-900"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="block w-full max-w-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                        placeholder="Enter password..."
                        required
                        value={formUser.password}
                        onChange={handleUserInputChange}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${isSubmitting ? 'opacity-50' : ''} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}