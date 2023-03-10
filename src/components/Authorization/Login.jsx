import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import icon from '../../assets/img/logo192.png';

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
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <div className="login">
      <img className="login__icon" src={icon} alt="Icon" />
      <h1 className="login__title">Вход</h1>

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}>
        <Form.Item
          className="login-form__input"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}>
          <Input
            className="login-form__input-email"
            prefix={<UserOutlined />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          className="login-form__input"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}>
          <Input.Password
            className="login-form__input-password"
            prefix={<LockOutlined />}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item className="login-form__buttons">
          <Button className="login-form__buttons-enter" type="primary" htmlType="submit">
            Войти
          </Button>
          <p className="login-form__buttons-registration">
            <Link to="/registration">Зарегистрироваться</Link>
          </p>
        </Form.Item>
      </Form>
    </div>
  );
};
