import { Card, Button, Empty, Spin, Pagination } from 'antd';
import { 
    DownloadOutlined,  
    FilePdfOutlined, 
    CalendarOutlined,
    FileOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
    downloadDocument,
    changePage
} from '@/store/action/admin/document/document_manager.action';
import {
    selectDocuments,
    selectLoadingPage,
    selectFilter,
    selectTotalPage
} from '@/store/selector/admin/document/document_manager.selector';

const DocumentManagement = () => {
    const dispatch = useDispatch();
    const documents = useSelector(selectDocuments);
    const loading = useSelector(selectLoadingPage);
    const filter = useSelector(selectFilter);
    const totalPage = useSelector(selectTotalPage);

    

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    const formatDateTime = (dateTimeStr?: string): string => {
        if (!dateTimeStr) return 'N/A';
        try {
            const date = new Date(dateTimeStr);
            
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            
            return `${day}/${month}/${year} ${hours}:${minutes}`;
        } catch (error) {
            console.error("Date format error:", error);
            return 'Invalid date';
        }
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

    const handleDownload = (document: any) => {
        dispatch(downloadDocument({ id: document.id, name: document.name }));
    };

    const handleChangePage = (page: number) => {
        dispatch(changePage(page));
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
                <div>
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
                                                {truncateFileName(document.name, 40)}
                                            </div>
                                            <div className="text-sm text-gray-500 flex items-center mt-1">
                                                <CalendarOutlined className="mr-1" />
                                                <span className="mr-3">{formatDateTime(document.create_at)}</span>
                                                <FileOutlined className="mr-1" />
                                                <span>{formatFileSize(document.size)}</span>
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

                    {totalPage > 1 && (
                        <div className="flex justify-center mt-4">
                            <Pagination
                                current={filter.pageNo}
                                total={totalPage * filter.pageSize}
                                pageSize={filter.pageSize}
                                onChange={handleChangePage}
                                showSizeChanger={false}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DocumentManagement;
