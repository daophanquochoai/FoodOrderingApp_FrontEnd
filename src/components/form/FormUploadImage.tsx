import { Upload, Button, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Controller } from 'react-hook-form';

const FormImageUpload = ({ name, control, defaultImage }: any) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="flex flex-col gap-2">
                    {defaultImage && (
                        <Image
                            src={defaultImage}
                            width={172}
                            height={120}
                            alt="Current"
                            className="rounded-md border  border-gray-300 object-contain"
                        />
                    )}
                    <Upload
                        listType="picture"
                        showUploadList={false}
                        beforeUpload={(file) => {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                field.onChange(e.target?.result);
                            };
                            reader.readAsDataURL(file);
                            console.log(file);
                            return false; // prevent automatic upload
                        }}
                    >
                        <Button icon={<UploadOutlined />}>Upload New Image</Button>
                    </Upload>
                </div>
            )}
        />
    );
};
export default FormImageUpload;
