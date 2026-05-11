import React from 'react';
import { Button, Col, Divider, Form, Input, notification, Row } from 'antd';
import { createUserApi } from '../util/api';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const RegisterPage = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { name, email, password, phone, address } = values;

        const res = await createUserApi(name, email, password, phone, address);

        if (res) {
            notification.success({
                message: "CREATE USER",
                description: "Success"
            });
            navigate("/login");
        } else {
            notification.error({
                message: "CREATE USER",
                description: "error"
            });
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Đăng Ký Tài Khoản</h2>
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

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input placeholder="Nhập tên của bạn" />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                    >
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                    >
                        <Input placeholder="Nhập địa chỉ" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{ marginTop: 20 }}>
                    <Link to={"/"} style={{ color: '#666' }}><ArrowLeftOutlined /> Quay lại trang chủ</Link>
                </div>
                <Divider />
                <div style={{ textAlign: "center" }}>
                    Đã có tài khoản? <Link to={"/login"} style={{ fontWeight: 600 }}>Đăng nhập ngay</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;