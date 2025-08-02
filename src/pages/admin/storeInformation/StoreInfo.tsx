import { useState, useEffect } from "react";
import { Form, Button, Radio, Upload, message } from "antd";
import { SaveOutlined, EditOutlined, FilePdfOutlined, UploadOutlined, LoadingOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import html2pdf from "html2pdf.js";
import RTE from "./RTE";
import { useDispatch, useSelector } from "react-redux";
import { uploadDocument } from "@/store/action/admin/document/document_manager.action";
import { selectLoadingComponent } from "@/store/selector/admin/document/document_manager.selector";

const StoreInfo = () => {
    const dispatch = useDispatch();
    const uploadLoading = useSelector(selectLoadingComponent);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [inputType, setInputType] = useState<'text' | 'file'>('text');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [editorContent, setEditorContent] = useState<string>("");

    useEffect(() => {
        if (editorContent) {
            form.setFieldsValue({ restaurantInfo: editorContent });
        }
    }, [editorContent, form]);

    const generatePDF = (htmlContent: string, fileName: string) => {
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = htmlContent;
        tempContainer.style.padding = '20px';
        tempContainer.style.width = '800px';

        const style = document.createElement('style');
        style.textContent = `
            h1 { font-size: 24px; font-weight: bold; margin-bottom: 16px; }
            h2 { font-size: 20px; font-weight: bold; margin-bottom: 12px; }
            h3 { font-size: 16px; font-weight: bold; margin-bottom: 8px; }
            p { font-size: 14px; margin-bottom: 8px; }
            ul, ol { padding-left: 20px; margin-bottom: 16px; }
            li { margin-bottom: 4px; }
            ul > li { list-style-type: disc !important; display: list-item !important; }
            ol > li { list-style-type: decimal !important; display: list-item !important; }
            ul ul > li { list-style-type: circle !important; }
        `;

        tempContainer.appendChild(style);
        document.body.appendChild(tempContainer);

        const options = {
            margin: [15, 15],
            filename: fileName,
            image: { type: 'jpeg', quality: 1.0 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                logging: true,
                letterRendering: true,
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait',
                precision: 16
            }
        };

        return html2pdf()
            .from(tempContainer)
            .set(options)
            .save()
            .then(() => {
                document.body.removeChild(tempContainer);
                return true;
            })
            .catch((error) => {
                console.error('Error generating PDF:', error);
                document.body.removeChild(tempContainer);
                throw error;
            })
    }

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

                await generatePDF(editorContent, fileName);

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
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = htmlContent;
        tempContainer.style.padding = '20px';
        tempContainer.style.width = '800px';

        document.body.appendChild(tempContainer);

        const options = {
            margin: [15, 15],
            image: { type: 'jpeg', quality: 1.0 },
            html2canvas: { 
                scale: 2,
                useCORS: true,
                letterRendering: true,
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait',
                precision: 16
            },
            output: 'blob'
        };

        try {
            const pdfBlob = await html2pdf().from(tempContainer).set(options).output('blob');
            document.body.removeChild(tempContainer);
            return pdfBlob;
        } catch (error) {
            document.body.removeChild(tempContainer);
            throw error;
        }
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
        
        // Kiểm tra loại file
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
                    <Radio.Group 
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
                    </Radio.Group>

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
