import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { Toaster } from 'react-hot-toast';

import Welcome from "./pages/Welcome/Welcome";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import Budgets from "./pages/Budgets/Budgets";
import Expenses from "./pages/Expenses/Expenses";
import Layout from "./components/Layout/Layout";

function App() {

    const { authUser } = useAuthContext();

    return (
        <div>
            <Routes>
                <Route path="/" element={authUser ? <Navigate to="/dashboard" /> : <Welcome />} />
                <Route path="/login" element={authUser ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/signup" element={authUser ? <Navigate to="/dashboard" /> : <SignUp />} />
                <Route path="/" element={authUser ? <Layout /> : <Navigate to="/" />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="budgets" element={<Budgets />} />
                    <Route path="expenses" element={<Expenses />} />
                </Route>
            </Routes>
            <Toaster />
        </div>
    );
}

export default App;
