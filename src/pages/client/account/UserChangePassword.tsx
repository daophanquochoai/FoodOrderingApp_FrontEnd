import { message, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { userPasswordSchema } from '@/validation/user.validation';
import { useForm } from 'react-hook-form';
import { FloatingInput } from '@/components/input';
import { changePassword } from '@/store/action/client/account/account.action';
import { selectLoading } from '@/store/selector/client/account/account.selector';

const UserChangePassword = () => {
    // selector
    const loadingComonent = useSelector(selectLoading);

    // hook
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(userPasswordSchema),
    });

    const handleReset = () => {
        reset({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        });
    };

    const onSubmit = (data) => {
        const payload = {
            ...data,
            action: () => handleReset(),
        };
        dispatch(changePassword(payload));
    };

    return (
        <Spin spinning={loadingComonent}>
            <div className="bg-white p-6 border border-gray-300 rounded-lg">
                <div className="flex flex-col gap-6 p-8">
                    <strong className="text-2xl mb-4 text-center">Change password</strong>

                    <form
                        className="flex flex-col xl:px-40 gap-4"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <FloatingInput
                            id="currentPassword"
                            label="Current password"
                            type="password"
                            {...register('currentPassword')}
                            error={!!errors.currentPassword}
                            helperText={errors.currentPassword?.message}
                        />
                        <FloatingInput
                            id="newPassword"
                            label="New password"
                            type="password"
                            {...register('newPassword')}
                            error={!!errors.newPassword}
                            helperText={errors.newPassword?.message}
                        />
                        <FloatingInput
                            id="confirmPassword"
                            label="Confirm new password"
                            type="password"
                            {...register('confirmPassword')}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                        />
                        <div className="flex gap-4 justify-end mt-2">
                            <button
                                type="submit"
                                className={`bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded transition-colors w-auto`}
                            >
                                Save Changes
                            </button>
                            <div
                                onClick={handleReset}
                                className="border cursor-pointer border-gray-300 text-gray-700 py-3 px-6 rounded hover:bg-gray-100 transition-colors w-auto"
                            >
                                Reset
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Spin>
    );
};

export default UserChangePassword;
