import { Button, Form, Input, InputNumber, Select } from 'antd';
import axios from 'axios';
import { NavLink, redirect } from 'react-router-dom';

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

export const Registration = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    axios
      .post('https://first-node-js-app-r.herokuapp.com/api/users/register', values)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    alert('Registration is succsessfuly');
    redirect('/');
  };

  return (
    <div className="registration">
      <h1 className="registration__title">Регистрация</h1>
      <Form
        {...formItemLayout}
        className="registration-form"
        form={form}
        name="register"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError>
        <Form.Item
          className="registration-form__input"
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
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          className="registration-form__input"
          name="password"
          label="Password"
          tooltip="'Пароль должен быть длиной не менее 8 символов, из них минимум 1 заглавная буква, 1 прописная, 1 число и 1 символ'"
          rules={[
            {
              required: true,
              message:
                'Пароль должен быть длиной не менее 8 символов, из них минимум 1 заглавная буква, 1 прописная, 1 число и 1 символ',
              pattern: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
            },
          ]}
          hasFeedback>
          <Input.Password />
        </Form.Item>

        <Form.Item
          className="registration-form__input"
          name="name"
          label="Name"
          tooltip="What is your name?"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
              whitespace: true,
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          className="registration-form__input"
          name="username"
          label="Username"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
              whitespace: true,
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          className="registration-form__input"
          name="age"
          label="Age"
          rules={[
            {
              required: true,
              message: 'Please input your age!',
            },
          ]}>
          <InputNumber />
        </Form.Item>

        <Form.Item
          className="registration-form__input"
          name="isMan"
          label="isMan"
          rules={[
            {
              required: true,
              message: 'Please select isMan!',
            },
          ]}>
          <Select placeholder="select your isMan">
            <Option value={true}>Male</Option>
            <Option value={false}>Female</Option>
          </Select>
        </Form.Item>

        <Form.Item className="registration-form__button">
          <Button className="registration-form__button-register" type="primary" htmlType="submit">
            Register
          </Button>
          <p>
            Уже есть аккаунт?{' '}
            <NavLink to="/" className={({ isActive }) => (isActive ? '' : 'active-link')}>
              Войти
            </NavLink>
          </p>
        </Form.Item>
      </Form>
    </div>
  );
};
