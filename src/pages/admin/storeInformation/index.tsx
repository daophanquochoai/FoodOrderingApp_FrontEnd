import { useState, useEffect } from "react";
import { Tabs, Spin } from "antd";
import DocumentManagement from "./DocumentManagement";
import StoreInfo from "./StoreInfo";
import { useDispatch, useSelector } from "react-redux";
import { selectLoadingPage } from "@/store/selector/admin/document/document_manager.selector";
import { fetchFirst } from '@/store/action/admin/document/document_manager.action';

const StoreInformation = () => {
    const dispatch = useDispatch();
    const loading = useSelector(selectLoadingPage);
    const [activeKey, setActiveKey] = useState("1");
    const [documentLoaded, setDocumentLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchFirst());
    }, []);

    const ComponentLoad = ({ children }: { children: React.ReactNode }) => {
        if (activeKey !== "2" || !loading) {
            return <>{children}</>;
        }
        
        return (
            <div className="flex justify-center items-center py-20">
                <Spin size="large" tip="Loading documents..." />
            </div>
        );
    };

    const handleTabChange = (key: string) => {
        setActiveKey(key);
        
        if (key === "2" && !documentLoaded) {
            setDocumentLoaded(true);
        }
    };

    const tabItems = [
        {
            key: "1",
            label: "Restaurant Information",
            children: <StoreInfo />
        },
        {
            key: "2",
            label: "Document Management",
            children: (
                <ComponentLoad>
                    <DocumentManagement />
                </ComponentLoad>
            )
        }
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold">Store Information</h1>
            <p className="text-gray-500 mb-4">
                Enter information about your restaurant that the chatbot will use to answer customer questions.
            </p>
            <div className="bg-white p-6 border border-gray-300 mt-4 rounded-lg shadow-sm">
                <Tabs 
                    activeKey={activeKey}
                    onChange={handleTabChange}
                    items={tabItems}
                />
            </div>
        </div>
    );
};

export default StoreInformation;