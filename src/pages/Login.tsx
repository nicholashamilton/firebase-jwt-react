import { FormEvent, useState } from "react";
import { useRedirectToProfileIfUser } from "@/hooks/user/useRedirectToProfileIfUser";
import { useUserContext } from "@/context/user/useUserContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firebaseErrorRecord, isFirebaseError } from "@/lib/firebase";
import { toast } from "react-toastify";
import SEO from "@/components/SEO";

export default function Login() {

    const { user } = useUserContext();

    useRedirectToProfileIfUser();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formUser, setFormUser] = useState({
        email: '',
        password: '',
    });

    function handleUserInputChange(e: React.FormEvent<HTMLInputElement>) {
        const input = e.currentTarget;
        const { name, value } = input;
        setFormUser({
            ...formUser,
            [name]: value,
        });
    }

    async function handleLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            setIsSubmitting(true);

            const userRes = await signInWithEmailAndPassword(auth, formUser.email, formUser.password);

            toast(`Welcome ${userRes.user.email}.`, {
                type: 'success',
            });
        }
        catch (error) {
            let errorMessage = 'Unknown error occurred while signing in.';

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
                title="Login"
                description="Login"
            />
            <h1 className="mt-8 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl">
                Login
            </h1>
            <form
                onSubmit={handleLogin}
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
                    Login
                </button>
            </form>
        </div>
    );
}
