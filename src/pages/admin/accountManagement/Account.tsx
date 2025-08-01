import React from 'react';
import { Card, Tabs, Avatar, Descriptions, Button, Form, Input, message, Image } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const fakeEmployee = {
    id: 1,
    name: 'Nguyễn Văn A',
    image: 'https://banobagi.vn/wp-content/uploads/2025/04/anh-avatar-dep-cho-con-trai-1.jpeg',
    email: 'nguyenvana@example.com',
    phoneNumber: '0901234567',
    cccd: '045005031031',
    gender: 'Nam',
    address: '123 Đường ABC, Quận 1, TP.HCM',
    status: true,
    role: {
        id: 2,
        role: 'Admin',
    },
};

const Account = () => {
    const [form] = Form.useForm();

    const handleChangePassword = (values) => {
        console.log('Changing password with:', values);
        message.success('Đổi mật khẩu thành công!');
    };

    const employee = fakeEmployee;

    return (
        <Card title="Employee Account">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Personal Information" key="1">
                    <div style={{ display: 'flex', gap: 24 }}>
                        <Image
                            width={100}
                            height={100}
                            src={employee.image}
                            alt={'avatar'}
                            className="object-contain rounded-full"
                        />
                        <Descriptions column={1} bordered size="small">
                            <Descriptions.Item label="Full Name">{employee.name}</Descriptions.Item>
                            <Descriptions.Item label="Email">{employee.email}</Descriptions.Item>
                            <Descriptions.Item label="Phone Number">
                                {employee.phoneNumber}
                            </Descriptions.Item>
                            <Descriptions.Item label="Gender">{employee.gender}</Descriptions.Item>
                            <Descriptions.Item label="Citizen ID Card (CCCD)">
                                {employee.cccd}
                            </Descriptions.Item>
                            <Descriptions.Item label="Address">
                                {employee.address}
                            </Descriptions.Item>
                            <Descriptions.Item label="Role">
                                {employee.role?.role}
                            </Descriptions.Item>
                            <Descriptions.Item label="Status">
                                {employee.status ? 'Active' : 'Inactive'}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                </TabPane>

                <TabPane tab="Change Password" key="2">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleChangePassword}
                        style={{ maxWidth: 400 }}
                    >
                        <Form.Item
                            label="Old Password"
                            name="oldPassword"
                            rules={[{ required: true, message: 'Please enter your old password' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="New Password"
                            name="newPassword"
                            rules={[
                                { required: true, message: 'Please enter your new password' },
                                {
                                    pattern:
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
                                    message:
                                        'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Confirm New Password"
                            name="confirmPassword"
                            dependencies={['newPassword']}
                            rules={[
                                { required: true, message: 'Please confirm your new password' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error('The passwords do not match!')
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Change Password
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>
        </Card>
    );
};

export default Account;
