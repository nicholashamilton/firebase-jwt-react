import { useEffect } from "react";
import { useUserContext } from "@/context/user/useUserContext";
import { useNavigate } from "react-router-dom";

export const useRedirectToProfileIfUser = () => {

    const navigate = useNavigate();

    const { user, isUserLoading } = useUserContext();

    useEffect(function verifyUser() {
        if (user) navigate('/');
    }, [isUserLoading, user]);

    return null;
};