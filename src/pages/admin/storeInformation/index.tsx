import { Tabs } from "antd";
import DocumentManagement from "./DocumentManagement";
import StoreInfo from "./StoreInfo";

const { TabPane } = Tabs;


const StoreInformation = () => {
    const tabItems = [
        {
            key: "1",
            label: "Restaurant Information",
            children: <StoreInfo />
        },
        {
            key: "2",
            label: "Document Management",
            children: <DocumentManagement />
        }
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold">Store Information</h1>
            <p className="text-gray-500 mb-4">
                Enter information about your restaurant that the chatbot will use to answer customer questions.
            </p>
            <div className="bg-white p-6 border border-gray-300 mt-4 rounded-lg shadow-sm">
                <Tabs defaultActiveKey="1" items={tabItems} />
            </div>
        </div>
    );
};

export default StoreInformation;