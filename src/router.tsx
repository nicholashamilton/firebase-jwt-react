import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import RootLayout from "@/layouts/RootLayout";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import ForgotPassword from "@/pages/ForgotPassword";
import EditUser from "@/pages/EditUser";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<RootLayout />}
        >
            <Route
                index
                element={<Home />}
            />
            <Route
                path="/login"
                element={<Login />}
            />
            <Route
                path="/sign-up"
                element={<SignUp />}
            />
            <Route
                path="/forgot-password"
                element={<ForgotPassword />}
            />
            <Route
                path="/edit-user"
                element={<EditUser />}
            />
        </Route>
    )
);

export default router;