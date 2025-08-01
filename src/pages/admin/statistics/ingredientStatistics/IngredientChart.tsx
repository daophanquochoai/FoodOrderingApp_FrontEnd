import { useEffect, useState } from 'react';
import { Select, Card, Spin } from 'antd';
import { Line } from '@ant-design/charts';

const { Option } = Select;

const mockPriceHistory = [
    { create_at: '2025-07-01', price_per_unit: 25000 },
    { create_at: '2025-07-05', price_per_unit: 26000 },
    { create_at: '2025-07-10', price_per_unit: 25500 },
    { create_at: '2025-07-15', price_per_unit: 26500 },
    { create_at: '2025-07-20', price_per_unit: 27000 },
    { create_at: '2025-07-25', price_per_unit: 26800 },
    { create_at: '2025-07-30', price_per_unit: 27500 },
];

const mockIngredients = [
    { id: 1, name: 'Thịt bò' },
    { id: 2, name: 'Gà chiên' },
    { id: 3, name: 'Khoai tây' },
    { id: 4, name: 'Bánh mì burger' },
];

const IngredientChart = () => {
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIngredients(mockIngredients);
    }, []);

    const handleChange = (value) => {
        setSelectedIngredient(value);
        setLoading(true);

        setTimeout(() => {
            // Sau này có thể lọc theo value nếu cần
            const filtered = mockPriceHistory;
            const formatted = filtered.map((item) => ({
                date: item.create_at,
                price: item.price_per_unit,
            }));
            setChartData(formatted);
            setLoading(false);
        }, 500);
    };

    const config = {
        data: chartData,
        xField: 'date',
        yField: 'price',
        smooth: true,
        height: 400,
        lineStyle: {
            lineWidth: 2,
        },
        point: {
            size: 5,
            shape: 'circle',
            style: { fill: '#1890ff', stroke: '#fff', lineWidth: 2 },
        },
    };

    return (
        <Card title="Raw ingredient import price chart">
            <Select
                showSearch
                placeholder="Chọn nguyên liệu"
                onChange={handleChange}
                style={{ width: 300, marginBottom: 20 }}
            >
                {ingredients.map((ing) => (
                    <Option key={ing.id} value={ing.id}>
                        {ing.name}
                    </Option>
                ))}
            </Select>

            {loading ? <Spin /> : chartData.length > 0 && <Line {...config} />}
        </Card>
    );
};

export default IngredientChart;
