import { useEffect, useState } from "react";
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from '@firebase/auth';

export const useUser = () => {

    const [user, setUser] = useState<User | null>(null);
    const [isUserLoading, setIsUserLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (updatedUser) => {
            setIsUserLoading(false);
            setUser(updatedUser);
        });
        return () => unsubscribe();
    }, []);

    return {
        user,
        setUser,
        isUserLoading,
    };
};

export type UseUser = ReturnType<typeof useUser>;
