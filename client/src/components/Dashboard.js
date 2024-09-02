import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; 
import axios from "axios";

function Dashboard ()  {
    const [userData, setUserData] = useState("");
    const { token, loading } = useContext(AuthContext);

    const doFetchData  = async () => {
        try {
            const response = await axios.get("/api/auth/userdetails", {
                headers: {
                    Authorization: token
                }
            });
            setUserData(JSON.stringify(response.data));
            
        } catch (error) {
            setUserData(error.response.data.error);
        }
    }

    if (loading) {
        return null;
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }else{
        doFetchData();
    }

    const navigate = useNavigate();

    const loadSignOut = async (e) => {
        navigate('/logout');
    }
    
    return (
        <div>
            <div><h1>Dashboard</h1></div>
            <hr/>
            <div align="right"><button onClick={loadSignOut}>Sign Out</button></div>
            <hr/>
            <div align="center"><h3>Authorized Token</h3></div>
            <div align="center"><h4>{userData}</h4></div>
        </div>
        
    );
}

export default Dashboard;