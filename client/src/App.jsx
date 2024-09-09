// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Welcome from "./pages/Welcome/Welcome";
import Dashboard from "./pages/Dashboard/Dashboard";
import Container from "./components/Container/Container";

function App() {
    const { authUser } = useAuthContext();

    return (
        <div className="min-h-screen flex flex-col">
            <Routes>
                {authUser ? (
                    <Route path="/" element={<Layout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        {/* Define other authenticated routes here */}
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                    </Route>
                ) : (
                    <>
                        <Route path="/" element={<Container><Welcome /></Container>} />
                        <Route path="/login" element={<Container><Login /></Container>} />
                        <Route path="/signup" element={<Container><SignUp /></Container>} />
                    </>
                )}
                <Route path="*" element={<Navigate to={authUser ? "/" : "/login"} />} />
            </Routes>
        </div>
        
    );
}

export default App;
