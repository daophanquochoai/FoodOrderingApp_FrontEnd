import { IconType } from 'react-icons';

const CardSummary = ({
    icon: Icon,
    color,
    number,
    text,
    type,
}: {
    icon: IconType;
    color: string;
    number: number;
    text: string;
    type?: string;
}) => {
    const bgColorMap = {
        green: 'bg-green-50 text-green-500',
        blue: 'bg-blue-50 text-blue-500',
        red: 'bg-red-50 text-red-500',
        yellow: 'bg-yellow-50 text-yellow-500',
        purple: 'bg-purple-50 text-purple-500',
    };

    return (
        <div className="px-6 py-6 border-gray-100 rounded-md bg-white shadow-sm flex gap-3 items-center">
            <div
                className={`${bgColorMap[color]} w-[60px] h-[60px] rounded-full flex items-center justify-center`}
            >
                <Icon className={`size-8`} />
            </div>
            <div className="flex justify-start flex-col gap-1">
                <p className="text-2xl font-medium">
                    {number.toLocaleString()}
                    {type == 'profit' ? ' đ' : ''}
                </p>
                <p className="text-sm text-slate-400 tracking-wider">{text}</p>
            </div>
        </div>
    );
};

export default CardSummary;
