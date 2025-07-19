import { Rate } from "antd";
import { GoPencil } from "react-icons/go";
import { useModalContext } from "../../hooks/context/ModalContext";
import { useDispatch } from 'react-redux';
import { common } from "@/store/reducer";
import { ModalType } from "@/type/store/common";

interface Review {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
}

const ProductRating = () => {
    const reviews: Review[] = [
        {
            id: "1",
            userName: "Alex",
            rating: 5,
            comment: "Delicious pizza! Highly recommend.",
            date: "2025-07-01",
        },
        {
            id: "2",
            userName: "George",
            rating: 4,
            comment: "Great taste, but a bit pricey.",
            date: "2025-07-02",
        }
    ];

    const dispatch = useDispatch();

    const handleOpenReviewModal = () => {
        dispatch(common.actions.showModal({
            type: ModalType.REVIEW,
        }));
    };

    const calculateAverageRating = (): number => {
        if (reviews.length === 0) return 0;
        
        const sum = reviews.reduce((total, review) => total + review.rating, 0);
        return sum / reviews.length;
    };

    const reviewCount = reviews.length;
    const averageRating = calculateAverageRating();
    const formattedRating = averageRating.toFixed(1);

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 lg:flex-row flex-col border-b border-gray-300 pb-8">
                    <div className="flex-1 flex flex-col gap-2 items-center">
                        <strong className="text-xl"><span className="text-6xl">{formattedRating}</span>/5</strong>
                        <Rate disabled allowHalf value={averageRating} />
                        <p className="text-gray-400">({reviewCount} review{reviewCount !== 1 ? 's' : ''})</p>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div 
                            className="py-3 px-12 w-fit text-orange-500 flex items-center justify-center cursor-pointer gap-2 border-2 border-orange-500 rounded-md"
                            onClick={handleOpenReviewModal}
                        >
                            <GoPencil className="text-2xl" />
                            <p className="font-bold">Write your review</p>
                        </div>
                    </div>
                </div>
                    
                <div className="space-y-4">
                    {reviews.map(review => (
                        <div key={review.id} className="grid grid-cols-1 lg:grid-cols-[1fr_6fr] gap-4 pb-4">
                            <div>
                                <p className="font-medium">{review.userName}</p>
                                <p className="text-gray-400">{new Date(review.date).toLocaleDateString("vi-VN")}</p>
                                <Rate disabled value={review.rating} className="text-sm" />
                            </div>
                            <div>
                                <p>{review.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductRating;