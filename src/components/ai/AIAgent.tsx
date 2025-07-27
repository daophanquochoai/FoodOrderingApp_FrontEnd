import React, { useState, useEffect } from 'react';
import { CopilotPopup } from '@copilotkit/react-ui';
import { useCopilotChat } from '@copilotkit/react-core';
import { Role, TextMessage } from '@copilotkit/runtime-client-gql';

const AIAgent: React.FC = () => {
    const [inProgress, setInProgress] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const {
        visibleMessages, // Mảng chứa các tin nhắn hiện tại trong cuộc trò chuyện.
        appendMessage, // Hàm thêm một tin nhắn mới vào cuộc trò chuyện.
        setMessages, // Hàm thiết lập lại các tin nhắn trong cuộc trò chuyện.
        deleteMessage, // Hàm xóa một tin nhắn cụ thể trong cuộc trò chuyện.
        reloadMessages, // Hàm tải lại các tin nhắn từ máy chủ.
        stopGeneration, // Hàm dừng quá trình tạo tin nhắn.
        reset, // Hàm đặt lại cuộc trò chuyện về trạng thái ban đầu.
        isLoading, // Biến boolean cho biết liệu cuộc trò chuyện có đang tải hay không.
    } = useCopilotChat();

    // Đồng bộ hóa trạng thái loading giữa hook và component
    useEffect(() => {
        if (isLoading !== undefined) {
            setInProgress(isLoading);
        }
    }, [isLoading]);

    // Xử lý gửi tin nhắn
    const handleSubmitMessage = (newMessage: string) => {
        console.log('Submitted message:', newMessage);  

        setTimeout(() => {}, 1000); // Giả lập thời gian xử lý
    };

    // Xử lý khi tạo lại phản hồi
    const handleRegenerate = (messageId: string) => {
        console.log('Regenerating response for:', messageId);
    };

    return (
        <>
            <CopilotPopup
                // Callback khi bắt đầu gửi tin nhắn 
                onInProgress={setInProgress}

                // Callback khi có tin nhắn mới
                onSubmitMessage={handleSubmitMessage}

                // Callback khi tạo lại phản hồi
                onRegenerate={handleRegenerate}

                // Callback khi popup được mở
                onSetOpen={setIsOpen}

                // Nhãn văn bản hiển thị
                labels={{
                    copyToClipboard: 'Sao chép vào Clipboard',
                    regenerateResponse: 'Tạo lại phản hồi',
                    error: 'Đã xảy ra lỗi! Vui lòng thử lại.',
                    placeholder: 'Làm thế nào tôi có thể giúp bạn?',
                    initial: 'Chào mừng bạn đến với Trợ lý AI của chúng tôi! Bạn cần giúp đỡ gì hôm nay?',
                    title: 'Trò chuyện với Trợ lý AI',
                }}

                // Tắt tải hình ảnh
                imageUploadsEnabled={false}

                // Ẩn nút dừng
                hideStopButton={true}

                // Trạng thái mở popup
                defaultOpen={isOpen}

                // Không cho phép đóng popup khi click ra ngoài
                clickOutsideToClose={false}

                // Nhấn phím Escape để đóng popup
                hitEscapeToClose={true}
            />
        </>
    );
};

export default AIAgent;