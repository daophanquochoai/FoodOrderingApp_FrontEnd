import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface PointHistory {
    id: string;
    date: string;
    orderId: string;
    previousPoints: number;
    usedPoints: number;
    remainingPoints: number;    
}

const UserPoint = () => {
    const pointHistory: PointHistory[] = [
        {
            id: '1',
            date: '1/7/2025',
            orderId: 'ORD12345',
            previousPoints: 5500,
            usedPoints: 1000,
            remainingPoints: 4500,
        },
        {
            id: '2',
            date: '2/7/2025',
            orderId: 'ORD12346',
            previousPoints: 4500,
            usedPoints: 1000,
            remainingPoints: 3500,
        },
    ];

    const columns: ColumnsType<PointHistory> = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            key: 'orderId',
        },
        {
            title: 'Previous Points',
            dataIndex: 'previousPoints',
            key: 'previousPoints',
        },
        {
            title: 'Used Points',
            dataIndex: 'usedPoints',
            key: 'usedPoints',
        },
        {
            title: 'Remaining Points',
            dataIndex: 'remainingPoints',
            key: 'remainingPoints',
        },
    ];

    return (
        <>
            <div className="bg-white p-6 border border-gray-300 rounded-lg">
                <div className="p-8 flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Loyalty Points</h1>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600">Your current points balance:</p>
                            <p className="text-3xl font-bold text-orange-500">3,500 points</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 border border-gray-300 rounded-lg mt-4">
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4">Points History</h2>
                    <Table 
                        columns={columns}
                        dataSource={pointHistory}
                        rowKey="id"
                        pagination={{ pageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20'] }}
                    />
                </div>
            </div>
        </>
    );
};

export default UserPoint;