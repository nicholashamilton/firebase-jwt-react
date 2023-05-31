import ToastNotifications from "./components/ToastNotifications";
import { UserProvider } from "./context/user/useUserContext";
import "./styles/App.scss";
import { RouterProvider } from 'react-router-dom';
import router from "./router";

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
