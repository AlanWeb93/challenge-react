import React, { useEffect, useState } from 'react'
import "./Login.css";
import axios from 'axios';
import swal from 'sweetalert';

const Login = ({history}) => {
   const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const {email, password} = login;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLogin(prev => ({ ...prev, [name]: value }));
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            history.push("/home");
        }
    }, []);

    const signIn = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            swal({
                title: "Error",
                text: "Los campos no pueden estar vacios.",
                icon: "error",
                button: "Aceptar",
                timer: "4000"
            });
            return;
        }
        await axios.post('http://challenge-react.alkemy.org', {
            email,
            password
        })
        .then(res => {
            localStorage.setItem('token', res.data.token);
            history.push("/home");
        })
        .catch(err => {
            swal({
                title: "Error",
                text: "Los datos son incorrectos.",
                icon: "error",
                button: "Aceptar",
                timer: "4000"
            });
        });

    }

    return (
        <div className="login">
            <div className="login__container">
                <form>
                    <h2>Iniciar Sesion</h2>
                    <input 
                        placeholder="Email" 
                        type="email"
                        name="email"
                        value={email} 
                        onChange={handleChange} 
                    />
                    <input 
                        placeholder="Contraseña" 
                        type="password"
                        name="password"
                        value={password} 
                        onChange={handleChange} 
                    />
                    <button className="submit" onClick={signIn}>Iniciar</button>
                </form>
            </div>
        </div>
    )
}

export default Login
