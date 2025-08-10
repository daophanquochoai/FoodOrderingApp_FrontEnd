import { selectSellFood } from '@/store/selector/admin/dashboard/dashboard.selector';
import { Pie } from '@ant-design/plots';
import { useSelector } from 'react-redux';

const data = [
    { food: 'Gà rán', value: 80 },
    { food: 'Hamburger', value: 30 },
    { food: 'Pizza', value: 30 },
];

const RevenueFood = () => {

    // selector 
    const sellFood = useSelector(selectSellFood);

    const config = {
        data: sellFood,
        angleField: 'value',
        colorField: 'label',
        innerRadius: 0.6,
        label: {
            text: 'value',
            style: {
                fontWeight: 'bold',
            },
        },
        legend: {
            color: {
                title: true,
                position: 'center',
                rowPadding: 5,
            },
        },
        annotations: [
            {
                type: 'text',
                style: {
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontSize: 40,
                    fontStyle: 'bold',
                },
            },
        ],
    };
    return (
        <div>
            <div className="flex items-center justify-between">
                <p className="font-semibold text-lg pl-3">Revenue Foods</p>
            </div>
            <Pie {...config} />
        </div>
    );
};

export default RevenueFood;
