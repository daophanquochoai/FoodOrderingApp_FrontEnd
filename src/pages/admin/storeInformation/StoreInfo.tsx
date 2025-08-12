import { useState, useEffect } from "react";
import { Form, Button, Radio, Upload, message } from "antd";
import { SaveOutlined, EditOutlined, FilePdfOutlined, UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { jsPDF } from "jspdf";
import RTE from "./RTE";
import { useDispatch, useSelector } from "react-redux";
import { uploadDocument } from "@/store/action/admin/document/document_manager.action";
import { selectLoadingComponent } from "@/store/selector/admin/document/document_manager.selector";

const StoreInfo = () => {
    const dispatch = useDispatch();
    const uploadLoading = useSelector(selectLoadingComponent);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [inputType, setInputType] = useState<'text' | 'file'>('file');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [editorContent, setEditorContent] = useState<string>("");

    useEffect(() => {
        if (editorContent) {
            form.setFieldsValue({ restaurantInfo: editorContent });
        }
    }, [editorContent, form]);

    const onFinish = async (values: any) => {
        setLoading(true);
        
        try {
            if (inputType === 'text') {
                if (!editorContent) {
                    message.error("Please add content before saving");
                    setLoading(false);
                    return;
                }

                const fileName = `restaurant-info-${new Date().toISOString().replace(/:/g, '-')}.pdf`;

                const pdfBlob = await htmlToPdfBlob(editorContent);
                const pdfFile = new File([pdfBlob], fileName, { type: 'application/pdf' });

                uploadPdfToServer(pdfFile);
                
                console.log("Content saved as PDF:", fileName);
                message.success("PDF has been generated successfully!");
            } else {
                if (!uploadedFile) {
                    message.error("Please upload a PDF file before saving");
                    setLoading(false);
                    return;
                }

                uploadPdfToServer(uploadedFile);
                
                console.log("Uploading PDF file:", uploadedFile.name);
            }
        } catch (error) {
            console.error("Error in save operation:", error);
            message.error("Failed to save information");
        } finally {
            setLoading(false);
        }
    };

    const htmlToPdfBlob = async (htmlContent: string): Promise<Blob> => {
        return new Promise(async (resolve, reject) => {
            try {
                // Tạo PDF với cấu hình cơ bản
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'pt',
                    format: 'a4'
                });
                
                // Thiết lập thông tin tài liệu
                pdf.setProperties({
                    title: 'Restaurant Information',
                    subject: 'Information about restaurant',
                    author: 'System',
                    creator: 'Restaurant Management System'
                });
                
                // Thiết lập font và kích thước
                pdf.setFont('helvetica');
                pdf.setFontSize(11);
                
                // Xử lý HTML thành cấu trúc dữ liệu phù hợp cho PDF
                const processedContent = extractTextSectionsFromHTML(htmlContent);
                
                // Thêm nội dung vào PDF
                let yPosition = 40;
                let currentPage = 1;
                
                // Thêm tiêu đề
                pdf.setFontSize(16);
                pdf.text("RESTAURANT INFORMATION", 40, yPosition);
                yPosition += 30;
                
                // Thêm ngày tạo
                pdf.setFontSize(10);
                const today = new Date().toLocaleDateString('en-US');
                pdf.text(`Created: ${today}`, 40, yPosition);
                yPosition += 20;
                
                // Thiết lập lại font và kích thước cho nội dung chính
                pdf.setFontSize(11);
                
                // Thêm nội dung chính vào PDF
                for (const section of processedContent) {
                    // Kiểm tra nếu cần thêm trang mới
                    if (yPosition > 780) {
                        pdf.addPage();
                        yPosition = 40;
                        currentPage++;
                    }
                    
                    // Tùy chỉnh dựa trên loại nội dung
                    switch (section.type) {
                        case 'heading':
                            pdf.setFontSize(14);
                            pdf.setFont('helvetica', 'bold');
                            break;
                        case 'subheading':
                            pdf.setFontSize(12);
                            pdf.setFont('helvetica', 'bold');
                            break;
                        case 'list-item':
                            pdf.setFontSize(11);
                            pdf.setFont('helvetica', 'normal');
                            break;
                        default:
                            pdf.setFontSize(11);
                            pdf.setFont('helvetica', 'normal');
                    }
                    
                    // Xử lý văn bản và thụt đầu dòng
                    const indent = section.indent * 20;
                    const safeText = section.text;
                    
                    // Tách văn bản thành nhiều dòng để tránh tràn
                    const maxWidth = 520 - indent;
                    const lines = pdf.splitTextToSize(safeText, maxWidth);
                    
                    // Thêm văn bản vào PDF
                    pdf.text(lines, 40 + indent, yPosition);
                    
                    // Cập nhật vị trí Y
                    const lineHeight = pdf.getLineHeight() / pdf.internal.scaleFactor;
                    yPosition += (lines.length * lineHeight) + 5;
                }
                
                // Thêm chân trang
                const totalPages = pdf.internal.pages.length - 1;
                for (let i = 1; i <= totalPages; i++) {
                    pdf.setPage(i);
                    pdf.setFontSize(8);
                    pdf.setTextColor(100, 100, 100);
                    pdf.text(`Page ${i} of ${totalPages}`, 40, pdf.internal.pageSize.height - 20);
                }
                
                // Tạo blob từ PDF với các tùy chọn tối ưu nhất cho khả năng đọc văn bản
                const blob = pdf.output('blob');
                resolve(blob);
                
            } catch (error) {
                console.error("Error converting HTML to PDF:", error);
                reject(error);
            }
        });
    };

    // Hàm trích xuất dữ liệu văn bản có cấu trúc từ HTML
    const extractTextSectionsFromHTML = (htmlContent: string): Array<{type: string, text: string, indent: number}> => {
        const result: Array<{type: string, text: string, indent: number}> = [];
        
        // Tạo container tạm thời
        const container = document.createElement('div');
        container.innerHTML = htmlContent;
        
        // Hàm xử lý các phần tử HTML
        const processNode = (node: Element) => {
            // Bỏ qua các phần tử không hiển thị
            const style = window.getComputedStyle(node);
            if (style.display === 'none' || style.visibility === 'hidden') {
                return;
            }
            
            const tagName = node.tagName.toLowerCase();
            
            // Trích xuất text từ node
            const text = node.textContent?.trim();
            if (!text) return;
            
            // Xác định loại nội dung
            let type = 'paragraph';
            let indent = 0;
            
            // Phân loại theo thẻ HTML
            switch(tagName) {
                case 'h1':
                case 'h2':
                    type = 'heading';
                    break;
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6':
                    type = 'subheading';
                    break;
                case 'li': {
                    type = 'list-item';
                    
                    // Tính mức thụt lề
                    let parent = node.parentElement;
                    while (parent) {
                        if (parent.tagName.toLowerCase() === 'ul' || parent.tagName.toLowerCase() === 'ol') {
                            indent++;
                        }
                        parent = parent.parentElement;
                    }
                    
                    // Thêm bullet hoặc số
                    const parentTag = node.parentElement?.tagName.toLowerCase();
                    if (parentTag === 'ul') {
                        result.push({
                            type,
                            text: `• ${text}`,
                            indent: indent - 1
                        });
                    } else if (parentTag === 'ol') {
                        const index = Array.from(node.parentElement?.children || []).indexOf(node);
                        result.push({
                            type,
                            text: `${index + 1}. ${text}`,
                            indent: indent - 1
                        });
                    }
                    
                    // Đã xử lý đặc biệt rồi, không cần thêm vào result nữa
                    return;
                }
                case 'p':
                case 'div':
                    // Nếu không có nội dung text riêng, bỏ qua
                    if (node.childElementCount > 0) {
                        break;
                    }
                    
                    // Lấy text trực tiếp (loại bỏ text từ các phần tử con)
                    const directText = Array.from(node.childNodes)
                        .filter(child => child.nodeType === Node.TEXT_NODE)
                        .map(child => child.textContent?.trim())
                        .filter(Boolean)
                        .join(' ');
                    
                    if (directText) {
                        result.push({ type, text: directText, indent });
                    }
                    break;
                case 'br':
                    result.push({ type: 'paragraph', text: ' ', indent: 0 });
                    break;
                default:
                    // Bỏ qua các thẻ không cần xử lý đặc biệt
                    break;
            }
            
            // Xử lý phần tử con
            for (const child of Array.from(node.children)) {
                processNode(child);
            }
        };
        
        // Bắt đầu xử lý từ các phần tử gốc
        for (const rootElement of Array.from(container.children)) {
            processNode(rootElement);
        }
        
        return result;
    };

    const uploadPdfToServer = (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', 'restaurant_info');

        dispatch(uploadDocument({
            formData,
            onSuccess: () => {
                message.success(`File "${file.name}" has been uploaded successfully!`);
                setUploadedFile(null); // Reset uploaded file sau khi thành công
            },
            onError: (error: any) => {
                message.error(error?.message || "Failed to upload document");
            }
        }));
    };

    const handleUpload: UploadProps["customRequest"] = (options) => {
        const { file, onSuccess } = options;
        
        if (!(file instanceof File)) {
            message.error("Invalid file");
            return;
        }
        
        // Kiểm tra loại file - chỉ chấp nhận PDF
        if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
            message.error("Please upload a PDF file");
            return;
        }
        
        // Lưu file để sau này submit
        setUploadedFile(file);
        message.success(`File "${file.name}" uploaded successfully`);
        onSuccess?.(file);
    };

    return (
        <div>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <div className="mb-4">
                    {/* <Radio.Group 
                        value={inputType} 
                        onChange={(e) => setInputType(e.target.value)}
                        buttonStyle="solid"
                        className="mb-4"
                    >
                        <Radio.Button value="text">
                            <EditOutlined /> Enter Text
                        </Radio.Button>
                        <Radio.Button value="file">
                            <FilePdfOutlined /> Upload PDF
                        </Radio.Button>
                    </Radio.Group> */}

                    {inputType === 'text' ? (
                        <Form.Item
                            label="Restaurant Information"
                            name="restaurantInfo"
                            rules={[{ required: inputType === 'text', message: 'Please input restaurant information!' }]}
                        >
                            <RTE 
                                value={editorContent}
                                onChange={(html) => setEditorContent(html)}
                            />
                        </Form.Item>
                    ) : (
                        <div className="py-4">
                            <Upload
                                customRequest={handleUpload}
                                maxCount={1}
                                accept=".pdf"
                                className="upload-pdf"
                            >
                                <Button icon={<UploadOutlined />} size="large">
                                    Click to Upload PDF File
                                </Button>
                            </Upload>
                            
                            <div className="mt-4 bg-gray-50 p-4 rounded-md">
                                <p className="text-gray-500">
                                    <FilePdfOutlined className="mr-2" />
                                    {uploadedFile 
                                        ? `Selected file: ${uploadedFile.name} (${(uploadedFile.size / 1024).toFixed(2)} KB)` 
                                        : "No file selected. Please upload a PDF file."}
                                </p>
                            </div>
                            
                            <div className="mt-6">
                                <h3 className="text-lg font-medium mb-2">Notes</h3>
                                <ul className="list-disc list-inside text-gray-600">
                                    <li>Upload a PDF file containing restaurant information</li>
                                    <li>Maximum file size: 10MB</li>
                                    <li>The PDF will be processed and stored for the chatbot</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                <Form.Item>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        loading={loading || uploadLoading}
                        icon={loading || uploadLoading ? <LoadingOutlined /> : <SaveOutlined />}
                        disabled={(inputType === 'file' && !uploadedFile) || uploadLoading}
                    >
                        {loading || uploadLoading ? 'Processing...' : 'Save Information'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default StoreInfo;
