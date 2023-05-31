import { useEffect } from "react";
import { useUserContext } from "../../context/user/useUserContext";
import { useNavigate } from "react-router-dom";

export const useRedirectToLoginIfNoUser = () => {

    const navigate = useNavigate();

    const { user, isUserLoading } = useUserContext();

    useEffect(function verifyUser() {
        if (!user && !isUserLoading) navigate('/login');
    }, [user, isUserLoading]);

    return null;
};