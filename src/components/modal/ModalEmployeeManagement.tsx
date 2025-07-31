import { ModalState } from '@/type/store/common';
import React, { useEffect } from 'react';
import ModalBase from './ModalBase';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { empAccountSchema } from '@/validation/account.validation';
import { common } from '@/store/reducer';
import { Button, Col, GetProp, Row, Spin, UploadProps } from 'antd';
import { FormInput } from '../form';
import FormSelectAnt from '../form/FormSelectAnt';
import {
    selectEmployeeSelected,
    selectLoadingComponent,
} from '@/store/selector/admin/employee/employee.selector';
import { createEmployee, updateEmployee } from '@/store/action/admin/employee/employee.action';
import { Employee } from '@/type/store/admin/employee/employee.style';

const ModalEmployeeManagement: React.FC<ModalState> = ({ data, type, variant }) => {
    // hook
    const dispatch = useDispatch();

    // selector
    const selectEmployee = useSelector(selectEmployeeSelected);
    const loadingComponent = useSelector(selectLoadingComponent);

    // variant
    const getModalTitle = (): string => {
        switch (variant) {
            case 'edit':
                return 'Edit Employee Account';
            case 'delete':
                return 'Delete Employee Account';
            default:
                return 'Add Employee Account';
        }
    };

    /**
     * get title
     */
    const title = getModalTitle();

    /**
     * control form
     */
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: '',
            cccd: '',
            email: '',
            role: '',
            password: '',
        },
        resolver: yupResolver(empAccountSchema),
    });

    /**
     * submit
     * @param data
     */
    const onSubmit = (data: any) => {
        let json: Employee = {
            name: data.name,
            cccd: data.cccd,
            isActive: true,
            password: data.password,
            role: {
                roleName: data.role,
            },
            email: data.email,
        };
        if (variant == 'edit') {
            json = {
                ...json,
                id: selectEmployee.id,
            };
            dispatch(updateEmployee(json));
        } else {
            dispatch(createEmployee(json));
        }
    };

    useEffect(() => {
        if (variant == 'edit' && data) {
            reset({
                name: selectEmployee?.name,
                cccd: selectEmployee?.cccd,
                email: selectEmployee?.email,
                role: selectEmployee?.role?.roleName,
                password: '@Hoai100303',
            });
        }
    }, [data, reset]);

    const onClose = () => {
        dispatch(common.actions.setHiddenModal(type));
    };

    const handleDeleted = () => {
        let json: Employee = {
            ...selectEmployee,
            isActive: false,
        };
        dispatch(updateEmployee(json));
    };

    if (variant == 'delete') {
        return (
            <ModalBase type={type}>
                <div>
                    <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>
                </div>
                <div className="">
                    <p className="text-center text-red-600">
                        <>
                            Are you sure you want to delete the account of <b>"{data.name}"</b> ?
                        </>
                    </p>
                    <div className="flex justify-end space-x-3 mt-6">
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="primary" danger onClick={handleDeleted}>
                            Delete Account
                        </Button>
                    </div>
                </div>
            </ModalBase>
        );
    }

    const roles = [
        { value: 'ROLE_ADMIN', label: 'Admin' },
        { value: 'ROLE_CHEF', label: 'Chef' },
        { value: 'ROLE_SHIPPER', label: 'Shipper' },
        { value: 'ROLE_WAREHOUSE', label: 'Ware House' },
    ];

    return (
        <ModalBase type={type}>
            <Spin spinning={loadingComponent}>
                <div>
                    <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-6 pb-2 bg-white rounded-2xl space-y-6"
                >
                    {/* Form Grid */}
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <FormInput
                                name="name"
                                control={control}
                                type="text"
                                label="Name"
                                placeholder="Fullname"
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Col>
                        <Col span={12}>
                            <FormInput
                                name="cccd"
                                control={control}
                                type="text"
                                label="Citizen ID Card"
                                placeholder="Citizen ID Card"
                                error={!!errors.cccd}
                                helperText={errors.cccd?.message}
                            />
                        </Col>
                        <Col span={12}>
                            <FormInput
                                name="email"
                                control={control}
                                type="email"
                                label="Email"
                                placeholder="Email"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Col>
                        <Col span={12}>
                            <FormInput
                                disabled={variant == 'edit'}
                                name="password"
                                control={control}
                                type="password"
                                label="Password"
                                placeholder="Password"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Col>
                        <Col span={12}>
                            <FormSelectAnt
                                name="role"
                                control={control}
                                label="Role"
                                options={roles}
                                error={!!errors.role}
                                helperText={errors.role?.message}
                            />
                        </Col>
                    </Row>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            type="primary"
                            className="bg-blue-500 hover:bg-blue-600"
                            disabled={isSubmitting}
                            block
                        >
                            {variant === 'add' ? 'Create Account' : 'Update Account'}
                        </Button>
                    </div>
                </form>
            </Spin>
        </ModalBase>
    );
};

export default ModalEmployeeManagement;
