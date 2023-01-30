import React, { useContext } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import {
    Link, useNavigate
} from "react-router-dom";
import '../index.css';
import logo from '../image/logo192.png';
import axios from 'axios';
import AuthContext from '../Context/AuthProvider';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const onFinish = async ({ email, password }) => {
        try {
            let response = await axios.post("https://first-node-js-app-r.herokuapp.com/api/auth/login", { email, password })
            console.log(response);
            const tok = response?.data?.token
            setAuth({ currentUser: { email, password, tok }, isAuth: true })
            localStorage.setItem('Token', JSON.stringify(response.data.token))
            navigate('/TaskList')
        }
        catch (err) {
            console.log(err);
            alert(err.response.data.message)
        }
    };

    return (
        <div className='login-center'>

            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <img src={logo} alt="Logo" className='logo' />
                <h2>Login</h2>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                    className='login__inp'
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        }
                    ]}
                    className="password-indent"
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Login
                    </Button>
                    <p className="register-row">
                        Or <Link to="/Register">register now!</Link>
                    </p>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;