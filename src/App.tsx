import ToastNotifications from "@/components/ToastNotifications";
import { UserProvider } from "@/context/user/useUserContext";
import router from "@/router";
import { RouterProvider } from 'react-router-dom';

import "@/styles/App.scss";

function App() {
    return (
        <UserProvider>
            <RouterProvider
                router={router}
            />
            <ToastNotifications />
        </UserProvider>
    );
}

export default App;
