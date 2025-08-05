import {
    fetchEmployeeByUsername,
    updatePasswordEmployee,
} from '@/store/action/admin/employee/employee.action';
import {
    selectAccount,
    selectLoadingComponent,
} from '@/store/selector/admin/employee/employee.selector';
import { Card, Tabs, Descriptions, Button, Form, Input, message, Image, Spin } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const { TabPane } = Tabs;

const Account = () => {
    // hook
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    // selector
    const loading = useSelector(selectLoadingComponent);
    const account = useSelector(selectAccount);
    // useEffect
    useEffect(() => {
        dispatch(fetchEmployeeByUsername());
    }, []);

    const handleChangePassword = (values) => {
        const data = {
            oldPassword: values?.oldPassword,
            newPassword: values?.newPassword,
        };
        dispatch(updatePasswordEmployee({ data, action: () => form.resetFields() }));
    };

    return (
        <Spin spinning={loading}>
            <Card title="Employee Account">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Personal Information" key="1">
                        <div style={{ display: 'flex', gap: 24 }}>
                            <Descriptions column={1} bordered size="small">
                                <Descriptions.Item label="Full Name">
                                    {account?.name || 'Error'}
                                </Descriptions.Item>
                                <Descriptions.Item label="Email">
                                    {account?.email || 'Error'}
                                </Descriptions.Item>
                                <Descriptions.Item label="Last Login">
                                    {account?.lastLogin
                                        ? new Date(account.lastLogin as string).toLocaleString()
                                        : 'N/A'}
                                </Descriptions.Item>
                                <Descriptions.Item label="Citizen ID Card (CCCD)">
                                    {account?.cccd || 'Error'}
                                </Descriptions.Item>
                                <Descriptions.Item label="Role">
                                    {account?.role?.roleName || 'Error'}
                                </Descriptions.Item>
                                <Descriptions.Item label="Status">
                                    {account?.isActive ? 'Active' : 'Inactive'}
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
                                rules={[
                                    { required: true, message: 'Please enter your old password' },
                                ]}
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
        </Spin>
    );
};

export default Account;
