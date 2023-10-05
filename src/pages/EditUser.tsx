import { FormEvent, useEffect, useState } from "react";
import { useUserContext } from "@/context/user/useUserContext";
import { useRedirectToLoginIfNoUser } from "@/hooks/user/useRedirectToLoginIfNoUser";
import SEO from "@/components/SEO";
import { sendEmailVerification, updateEmail, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

export default function EditUser() {

    const { user } = useUserContext();

    useRedirectToLoginIfNoUser();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formUser, setFormUser] = useState({
        email: '',
        name: '',
    });

    useEffect(function syncFormUser() {
        setFormUser({
            email: user?.email ?? '',
            name: user?.displayName ?? '',
        });
    }, [user]);

    async function handleUpdateEmail(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!user) return;

        try {
            setIsSubmitting(true);

            await updateEmail(user, formUser.email);

            toast(`Email updated to ${formUser.email}`, {
                type: 'success',
            });
        }
        catch (error) {
            let errorMessage = 'Unknown error occurred while updating email.';

            toast(errorMessage, {
                type: 'error',
            });
        }

        setIsSubmitting(false);
    }

    async function handleUpdateProfile(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!user) return;

        try {
            setIsSubmitting(true);

            await updateProfile(user, {
                displayName: formUser.name,
            });

            toast('Profile Updated.', {
                type: 'success',
            });
        }
        catch (error) {
            let errorMessage = 'Unknown error occurred while updating profile.';

            toast(errorMessage, {
                type: 'error',
            });
        }

        setIsSubmitting(false);
    }

    async function handleVerifyEmail(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!user) return;

        try {
            setIsSubmitting(true);

            await sendEmailVerification(user);

            toast('Email Verification Sent.', {
                type: 'success',
            });
        }
        catch (error) {
            let errorMessage = 'Unknown error occurred while sending email verification.';

            toast(errorMessage, {
                type: 'error',
            });
        }

        setIsSubmitting(false);
    }

    function handleUserInputChange(e: React.FormEvent<HTMLInputElement>) {
        const input = e.currentTarget;
        const { name, value } = input;
        setFormUser({
            ...formUser,
            [name]: value,
        });
    }

    if (!user) return null;

    return (
        <div className="block relative">
            <SEO
                title="Edit User"
                description="Edit User"
            />
            <h1 className="mt-8 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl">
                Edit User
            </h1>
            <form
                onSubmit={handleUpdateEmail}
                className="block mt-14"
            >
                <h4 className="mb-2 text-xl font-bold">Update Email</h4>
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
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${isSubmitting ? 'opacity-50' : ''} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
                >
                    Update Email
                </button>
            </form>
            <form
                onSubmit={handleUpdateProfile}
                className="block mt-14"
            >
                <h4 className="mb-2 text-xl font-bold">Update Profile</h4>
                <div className="block mb-4">
                    <label
                        htmlFor="name"
                        className="inline-block mb-2 text-sm font-medium text-gray-900"
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="block w-full max-w-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                        placeholder="Enter name..."
                        value={formUser.name}
                        onChange={handleUserInputChange}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${isSubmitting ? 'opacity-50' : ''} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
                >
                    Update Profile
                </button>
            </form>
            <form
                onSubmit={handleVerifyEmail}
                className="block mt-14"
            >
                <h4 className="mb-2 text-xl font-bold">Email Verification</h4>
                <button
                    type="submit"
                    disabled={isSubmitting || user.emailVerified}
                    className={`${isSubmitting || user.emailVerified ? 'opacity-50' : ''} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
                >
                    Verify Email {user.emailVerified ? '(email already verified)' : ''}
                </button>
            </form>
        </div>
    );
}
