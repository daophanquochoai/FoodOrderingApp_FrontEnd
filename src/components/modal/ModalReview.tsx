import React, { useState } from "react";
import { Rate, Button } from "antd";
import ModalBase from "./ModalBase";
import { useDispatch } from 'react-redux';
import { common } from "@/store/reducer";

const ModalReview: React.FC<any> = (props) => {
    const { type } = props;
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    const onClose = () => {
        dispatch(common.actions.setHiddenModal(type));
    };

    const handleSubmit = async () => {
        if (rating === 0) return;
        setIsSubmitting(true);
        // Simulate API call to submit review
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setRating(0);
        setComment("");
        setIsSubmitting(false);
        onClose();
    };

    return (
        <ModalBase type={type}>
            <div>
                <h2 className="text-xl font-semibold mb-6 text-center">WRITE A REVIEW</h2>
                <div className="flex justify-center mb-6">
                    <Rate
                        allowClear={false}
                        value={rating} 
                        onChange={setRating} 
                        className="text-2xl"
                    />
                </div>
                <div className="mb-6">
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your review here..."
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                    />
                </div>
                <div className="flex justify-end gap-5">
                    <Button 
                        onClick={onClose}
                        className="px-6"
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="primary" 
                        onClick={handleSubmit}
                        disabled={rating === 0}
                        loading={isSubmitting}
                        className={`px-6 bg-blue-600 ${rating === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </ModalBase>
    );
};

export default ModalReview;