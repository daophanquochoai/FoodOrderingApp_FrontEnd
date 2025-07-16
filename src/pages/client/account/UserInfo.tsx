import { useState, useEffect } from "react";
import { User } from "../../../type/user/user";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message as antMessage, Upload } from "antd";
import type { UploadChangeParam, RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

const UserInfo = () => {
    const [user, setUser] = useState<User>({
        id: 1,
        name: "Nguyen Ngoc Quy",
        phone: "0987654321",
        address: [],
        image: "https://avatars.githubusercontent.com/u/156199238?v=4",
        username: "ngocquy.19082003@gmail.com"
    });

    const [formData, setFormData] = useState({
        fullName: user.name,
        phone: user.phone,
        email: user.username
    });

    const [errors, setErrors] = useState({
        fullName: "",
        phone: "",
        email: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{type: "success" | "error", text: string} | null>(null);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>(user.image);

    useEffect(() => {
        setFormData({
            fullName: user.name,
            phone: user.phone,
            email: user.username
        });
        setImageUrl(user.image);
    }, [user]);

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            antMessage.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            antMessage.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleUploadChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            if (info.file.originFileObj) {
                setLoading(false);
                const url = URL.createObjectURL(info.file.originFileObj);
                setImageUrl(url);
            }
        }
        if (info.file.status === 'error') {
            setLoading(false);
            antMessage.error('Upload failed.');
        }
    };

    const customRequest = ({ onSuccess }: any) => {
        setTimeout(() => {
            onSuccess("ok", new XMLHttpRequest());
        }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });

        if (errors[id as keyof typeof errors]) {
            setErrors({
                ...errors,
                [id]: ""
            });
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        // Kiểm tra họ tên
        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
            valid = false;
        }

        // Kiểm tra số điện thoại
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
            valid = false;
        } else if (!/^[0-9]+$/.test(formData.phone)) {
            newErrors.phone = "Phone number must contain only digits";
            valid = false;
        }

        // Kiểm tra email
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
            valid = false;  
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            setMessage({ type: "error", text: "Please fix the errors below before submitting." });
            return;
        }

        setIsSubmitting(true);
        setMessage(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            setUser({
                ...user,
                name: formData.fullName,
                phone: formData.phone,
                username: formData.email,
                image: imageUrl
            });
            setMessage({ type: "success", text: "Profile updated successfully!" });
        } catch (error) {
            setMessage({ type: "error", text: "Failed to update profile. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <div className="bg-white p-6 border border-gray-300 rounded-lg">
            <div className="flex flex-col gap-6 p-8">
                <strong className="text-2xl mb-4">Personal profile</strong>

                {message && (
                    <div className={`p-4 mb-4 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {message.text}
                    </div>
                )}

                <form className="flex flex-col xl:px-40 gap-4" onSubmit={handleSubmit}>
                    <div className="mb-6 flex flex-col items-center">
                        <Upload
                            name="avatar"
                            listType="picture-circle"
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={handleUploadChange}
                            customRequest={customRequest}
                        >
                            {imageUrl ? (
                                <img src={imageUrl} alt="avatar" style={{ width: '100%', borderRadius: '50%' }} />
                            ) : (
                                uploadButton
                            )}
                        </Upload>
                        <p className="text-gray-500 mt-2 text-sm">Click to upload or change your profile photo</p>
                    </div>
                    
                    <div className="relative">
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className={`peer inputBox px-5 py-2 pt-5 pb-1`}
                            required
                        />
                        <label
                            htmlFor="fullName"
                            className={`absolute left-5 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500`}
                        >
                            Full Name
                        </label>
                        {errors.fullName && (
                            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                        )}
                    </div>

                    <div className="relative">
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className={`peer inputBox px-5 py-2 pt-5 pb-1`}
                            required
                        />
                        <label
                            htmlFor="phone"
                            className={`absolute left-5 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500`}
                        >
                            Phone Number
                        </label>
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                    </div>

                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className={`peer inputBox px-5 py-2 pt-5 pb-1`}
                            required
                        />
                        <label
                            htmlFor="email"
                            className={`absolute left-5 top-1 text-gray-500 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500`}
                        >
                            Email
                        </label>
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div className="flex gap-4 justify-end mt-2">
                        <button 
                            type="submit" 
                            className={`${
                                isSubmitting 
                                ? "bg-gray-400" 
                                : "bg-orange-500 hover:bg-orange-600"
                            } text-white py-3 px-6 rounded transition-colors w-auto`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                        <button 
                            type="button" 
                            className="border border-gray-300 text-gray-700 py-3 px-6 rounded hover:bg-gray-100 transition-colors w-auto"
                            onClick={() => {
                                setFormData({
                                    fullName: user.name,
                                    phone: user.phone,
                                    email: user.username
                                });
                                setErrors({
                                    fullName: "",
                                    phone: "",
                                    email: ""
                                });
                                setMessage(null);
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserInfo;