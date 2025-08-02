import { Pie } from '@ant-design/plots';

const data = [
    { food: 'Gà rán', value: 40 },
    { food: 'Hamburger', value: 30 },
    { food: 'Pizza', value: 30 },
];

const RevenueFood = () => {
    const config = {
        data: data,
        angleField: 'value',
        colorField: 'food',
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
