import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log('Success:', values);
    axios
      .post('https://first-node-js-app-r.herokuapp.com/api/auth/login', values)
      .then(({ data }) => {
        console.log(data.token);
        localStorage.setItem('token', data.token);
        navigate('/todo');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login">
      <h1 className="login__title">Вход</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}>
          {/* <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          /> */}
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Войти
          </Button>
          <br />
          Или <Link to="/registration">Зарегистрироваться</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
