import React, { useContext, useState } from 'react'
import "./Login.scss";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const { toggleAuth } = useContext(AuthContext);

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://data-visualizor-dashboard.onrender.com/api/v1/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (data.success) {
                toggleAuth();
                navigate("/");
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("An error occurred. Please try again later.");
        }
    }

    return (
        <div className="login">
            <div className="login_container">

                <span style={{ fontSize: "13px" }}>email: admin@gmail.com</span>
                <span style={{ fontSize: "13px" }}>password: admin123</span>

                <div className='heading flex'>login</div>

                <label>email</label>
                <input type="email" name="email" value={email} placeholder='enter your email' onChange={e => setEmail(e.target.value)} />

                <label>password</label>
                <input type="password" name="password" value={password} placeholder='enter your password' onChange={e => setPassword(e.target.value)} />
                {error && <span style={{ color: "red", fontSize: "13px" }}>{error}</span>}
                <button className='btn' onClick={handleClick}>login</button>
            </div>
        </div>
    )
}

export default Login