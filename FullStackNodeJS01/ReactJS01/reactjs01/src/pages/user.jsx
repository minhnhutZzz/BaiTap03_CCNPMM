import { notification, Table, Typography, Button, Space, Tag, Input, Modal, Form, Popconfirm } from "antd";
import { ReloadOutlined, UserOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getUserApi, updateUserApi, deleteUserApi } from "../util/api";

const { Title, Text } = Typography;
const { Search } = Input;

const UserPage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [editingId, setEditingId] = useState(null);
    const [searchText, setSearchText] = useState("");

    const fetchUser = async (search = searchText) => {
        setLoading(true);
        const res = await getUserApi(search);
        if (!res?.message) {
            setDataSource(res)
        } else {
            notification.error({ message: "Lỗi truy cập", description: res.message })
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchUser();
    }, [])

    const handleSearch = (value) => {
        setSearchText(value);
        fetchUser(value);
    }

    const handleDelete = async (id) => {
        const res = await deleteUserApi(id);
        if (res && res.EC === 0) {
            notification.success({ message: "Thành công", description: res.EM });
            fetchUser();
        } else {
            notification.error({ message: "Lỗi", description: res?.EM ?? "Xóa thất bại" });
        }
    }

    const handleEdit = (record) => {
        setEditingId(record._id);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    }

    const handleUpdateSubmit = async () => {
        try {
            const values = await form.validateFields();
            const res = await updateUserApi(editingId, values.name, values.phone, values.address);
            if (res && res.EC === 0) {
                notification.success({ message: "Thành công", description: res.EM });
                setIsModalOpen(false);
                fetchUser();
            } else {
                notification.error({ message: "Lỗi", description: res?.EM ?? "Cập nhật thất bại" });
            }
        } catch (error) {
            console.log("Validation failed:", error);
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            render: (text) => <Text copyable type="secondary">{text.substring(0, 8)}...</Text>
        },
        {
            title: 'Họ và Tên',
            dataIndex: 'name',
            render: (text) => <><UserOutlined style={{ marginRight: 8 }} /><b>{text}</b></>
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: (text) => <Tag color="blue">{text}</Tag>
        },
        {
            title: 'SĐT',
            dataIndex: 'phone',
            render: (text) => text ? text : <Text type="secondary">Chưa có</Text>
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            render: (text) => text ? text : <Text type="secondary">Chưa có</Text>
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" ghost icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Popconfirm
                        title="Xóa người dùng"
                        description="Bạn có chắc chắn muốn xóa tài khoản này?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div className="container mt-4 mb-5">
            <div className="glass-card">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                    <div>
                        <Title level={3} style={{ margin: 0, color: '#1a1a1a' }}>Danh Sách Người Dùng</Title>
                        <Text type="secondary">Quản lý toàn bộ tài khoản đang có trên hệ thống</Text>
                    </div>
                    <div className="d-flex gap-2">
                        <Search
                            placeholder="Tìm theo tên/email..."
                            onSearch={handleSearch}
                            allowClear
                            style={{ width: 250 }}
                        />
                        <Button 
                            type="primary" 
                            icon={<ReloadOutlined />} 
                            onClick={() => fetchUser()} 
                            loading={loading}
                            style={{ background: '#667eea' }}
                        >
                            Làm mới
                        </Button>
                    </div>
                </div>
                
                <Table
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    rowKey={"_id"}
                    loading={loading}
                    pagination={{ pageSize: 5 }}
                    style={{ overflowX: 'auto' }}
                />

                <Modal
                    title="Cập Nhật Người Dùng"
                    open={isModalOpen}
                    onOk={handleUpdateSubmit}
                    onCancel={() => setIsModalOpen(false)}
                    okText="Lưu Thay Đổi"
                    cancelText="Hủy"
                >
                    <Form form={form} layout="vertical" className="mt-3">
                        <Form.Item label="Họ và Tên" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Số điện thoại" name="phone">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Địa chỉ" name="address">
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    )
}

export default UserPage;