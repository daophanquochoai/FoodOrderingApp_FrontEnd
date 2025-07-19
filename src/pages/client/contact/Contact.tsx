import { useState } from "react";
import ClientBreadcrumb from "../../../components/breadcrumb/ClientBreadcrumb";
import { Button } from "antd";
import { IoHome } from "react-icons/io5";
import { FaPhone, FaInfo } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        comment: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        comment: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        if (name in errors) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
            isValid = false;
        }
        if (!formData.comment.trim()) {
            newErrors.comment = "Comment is required";
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);
        try {
            // Simulate form submission
            console.log("Form submitted:", formData);
            // Reset form after submission
            setFormData({
                name: "",
                email: "",
                phone: "",
                comment: "",
            });
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <ClientBreadcrumb title="Contact Us" items={[{ label: "Home", to: "/" }, { label: "Contact", to: "/contact" }]} />
            <div className="flex flex-col px-4 lg:px-12 py-12 space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
                    <div className="bg-white p-6 space-y-6">
                        <span className="font-bold text-2xl">Do You Have Any Questions?</span>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex gap-6">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Name"
                                        className={`peer inputBox px-5 py-2 pt-5 pb-1`}
                                    />
                                    <label
                                        htmlFor="name"
                                        className={`absolute left-5 top-1 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500`}
                                    >
                                        Name
                                    </label>
                                    {errors.name && (
                                        <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                                    )}
                                </div>
                                <div className="flex-1 relative">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Email"
                                        className={`peer inputBox px-5 py-2 pt-5 pb-1`}
                                    />
                                    <label
                                        htmlFor="email"
                                        className={`absolute left-5 top-1 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500`}
                                    >
                                        Email
                                    </label>
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                                    )}
                                </div>
                            </div>
                            <div className="relative">
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Phone Number"
                                    className={`peer inputBox px-5 py-2 pt-5 pb-1`}
                                />
                                <label
                                    htmlFor="phone"
                                    className={`absolute left-5 top-1 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500`}
                                >
                                    Phone Number
                                </label>
                                {errors.phone && (
                                    <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                                )}
                            </div>
                            <div className="relative">
                                <textarea
                                    id="comment"
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleInputChange}
                                    placeholder="Comment"
                                    className={`peer inputBox px-5 py-2 pt-5 pb-1`}
                                />
                                <label
                                    htmlFor="comment"
                                    className={`absolute left-5 top-1 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500`}
                                >
                                    Comment
                                </label>
                                {errors.comment && (
                                    <p className="mt-1 text-xs text-red-500">{errors.comment}</p>
                                )}
                            </div>
                            <Button type="primary" htmlType="submit" loading={isSubmitting} className="w-fit font-bold p-5 rounded-full">
                                SEND
                            </Button>
                        </form>
                    </div>
                    <div className="bg-white p-6 space-y-6">    
                        <span className="font-bold text-2xl">Get in touch with us</span>
                        <div className="flex space-x-4">
                            <IoHome className="text-xl mt-3" />
                            <div>
                                <p>Address:</p>
                                <p>11 Nguyen Dinh Chieu St.</p>
                                <p>Sai Gon Ward, Ho Chi Minh</p>
                                <p>Vietnam 71007</p>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <FaPhone className="text-xl mt-3" />
                            <div>
                                <p>Contact:</p>
                                <p>(+84) 0987-654-321</p>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <MdEmail className="text-xl mt-3" />
                            <div>
                                <p>Email:</p>
                                <p>demo@example.com</p>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <FaInfo className="text-xl mt-3" />
                            <div>
                                <p>Store Info:</p>
                                <p>Monday - Friday 8 AM - 10 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full relative">
                    <div className="relative w-full pb-[60%] lg:pb-[40%]">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31355.759383220662!2d106.67798805811587!3d10.77527517634323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f9ed887b%3A0x14aded5703768989!2sDistrict%201%2C%20Ho%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1752654019540!5m2!1sen!2s"
                            className="absolute top-0 left-0 w-full h-full"
                            style={{ border: 0 }} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;