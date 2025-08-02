import { useState, useEffect } from 'react';
import { Card, Button, Empty, message, Spin } from 'antd';
import { 
    DownloadOutlined,  
    FilePdfOutlined, 
    CalendarOutlined,
    FileOutlined
} from '@ant-design/icons';

interface DocumentItem {
    id: string;
    fileName: string;
    uploadDate: string;
    fileSize: number;
    url: string;
}

const DocumentManagement = () => {
    const [documents, setDocuments] = useState<DocumentItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 800));

                const mockData: DocumentItem[] = [
                    {
                        id: '1',
                        fileName: 'restaurant-info-2025-08-02T01:38:24.269Z.pdf',
                        uploadDate: '2025-08-02T14:30:45',
                        fileSize: 1200000,
                        url: '/api/documents/1'
                    },
                    {
                        id: '2',
                        fileName: 'restaurant-info-2025-08-01T01:38:24.269Z.pdf',
                        uploadDate: '2025-08-01T14:30:45',
                        fileSize: 2500000,
                        url: '/api/documents/2'
                    }
                ];

                setDocuments(mockData);
            } catch (error) {
                console.error('Error fetching documents:', error);
                message.error('Failed to load documents');
            } finally {
                setLoading(false);
            }
        };
        
        fetchDocuments();
    }, []);

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    const formatDateTime = (dateTimeStr: string): string => {
        const date = new Date(dateTimeStr);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const truncateFileName = (fileName: string, maxLength: number = 25): string => {
        if (fileName.length <= maxLength) return fileName;
        
        // Tách phần tên và phần mở rộng
        const lastDotIndex = fileName.lastIndexOf('.');
        const extension = lastDotIndex !== -1 ? fileName.substring(lastDotIndex) : '';
        const name = lastDotIndex !== -1 ? fileName.substring(0, lastDotIndex) : fileName;
        
        // Tính toán độ dài phần tên để giữ lại
        const truncateLength = maxLength - extension.length - 3; // 3 cho "..."
        
        return name.substring(0, truncateLength) + '...' + extension;
    };

    const handleDownload = (document: DocumentItem) => {
        message.success(`Downloading ${document.fileName}...`);

        setTimeout(() => {
            message.success(`${document.fileName} downloaded successfully`);
        }, 1500);

        // window.location.href = document.url;
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Document Management</h1>

            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <Spin size="large" tip="Loading documents..." />
                </div>
            ) : documents.length === 0 ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No documents found" />
            ) : (
                <div className='space-y-4'>
                    {documents.map((document) => (
                        <Card 
                            key={document.id}
                            className="hover:shadow-md transition-shadow"
                            styles={{ body: { padding: '16px' } }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="bg-red-100 p-3 rounded-lg mr-4">
                                        <FilePdfOutlined className="text-red-500 text-xl" />
                                    </div>
                                    <div>
                                        <div className="font-medium">
                                            {truncateFileName(document.fileName, 40)}
                                        </div>
                                        <div className="text-sm text-gray-500 flex items-center mt-1">
                                            <CalendarOutlined className="mr-1" />
                                            <span className="mr-3">{formatDateTime(document.uploadDate)}</span>
                                            <FileOutlined className="mr-1" />
                                            <span>{formatFileSize(document.fileSize)}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button 
                                    type="primary"
                                    icon={<DownloadOutlined />}
                                    onClick={() => handleDownload(document)}
                                    className="mr-2"
                                >
                                    Download
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DocumentManagement;
