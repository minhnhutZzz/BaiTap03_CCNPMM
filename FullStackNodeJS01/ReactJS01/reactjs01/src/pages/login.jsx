import React, { useContext } from 'react';
import { Button, Col, Divider, Form, Input, notification, Row } from 'antd';
import { loginApi } from '../util/api';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/context/auth.context';
import { ArrowLeftOutlined } from '@ant-design/icons';

const LoginPage = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const onFinish = async (values) => {
        const { email, password } = values;

        const res = await loginApi(email, password);

        if (res && res.EC === 0) {
            localStorage.setItem("access_token", res.access_token);
            notification.success({
                message: "LOGIN USER",
                description: "Success"
            });
            setAuth({
                isAuthenticated: true,
                user: {
                    email: res?.user?.email ?? "",
                    name: res?.user?.name ?? ""
                }
            });
            navigate("/");
        } else {
            notification.error({
                message: "LOGIN USER",
                description: res?.EM ?? "error"
            });
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Đăng Nhập</h2>
                <Form
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                    layout='vertical'
                    size="large"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input placeholder="Nhập email của bạn" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{ marginTop: 20 }}>
                    <Link to={"/"} style={{ color: '#666' }}><ArrowLeftOutlined /> Quay lại trang chủ</Link>
                </div>
                <Divider />
                <div style={{ textAlign: "center" }}>
                    Chưa có tài khoản? <Link to={"/register"} style={{ fontWeight: 600 }}>Đăng ký tại đây</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;