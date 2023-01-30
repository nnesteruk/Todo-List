import {
    Button,
    Form,
    Input,
    Select,
} from 'antd';
import React from 'react';
import '../index.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const Register = () => {
    const [form] = Form.useForm();

    const navigate = useNavigate();

    const onFinish = (values) => {
        try {
            console.log(values);
            axios.post('https://first-node-js-app-r.herokuapp.com/api/users/register', values)
                .then(response => console.log(response))
                .catch(err => console.log(err))
            alert('User is finally registered');
            navigate('/Login')
        }
        catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="register-form">

            <Form
                {...formItemLayout}
                form={form}
                name="register"
                scrollToFirstError
                onFinish={onFinish}
            >
                <h2>Registration</h2>
                <Form.Item
                    name="name"
                    label="Name"
                    tooltip="What is your name?"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="username"
                    label="Username"
                    tooltip="What is your username?"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    tooltip="password (min length - 8 symbols, min 1 uppercase, min 1 lowercase, min 1 number, min 1 symbol"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="isMan"
                    label="isMan"
                    rules={[
                        {
                            required: true,
                            message: 'Please select isMan!',
                        },
                    ]}
                >
                    <Select placeholder="select your isMan">
                        <Option value={true}>True</Option>
                        <Option value={false}>False</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="age"
                    label="Age"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Age!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item {...tailFormItemLayout} className="register__btns">
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                    <Button type="primary" htmlType="submit" className='btn__cancel'>
                        <Link to='/Login'>Cancel</Link>
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;