import React from 'react';
import { Rate } from 'antd';

type StaffQuoteProps = {
    content: string;
    image: string;
    name: string;
    major: string;
};

const StaffQuoteCard: React.FC<StaffQuoteProps> = ({ content, image, name, major }) => {
    return (
        <div className="container flex items-center justify-center">
            <div className="">
                <div className="max-w-3xl flex flex-col gap-5">
                    <div className="text-center">
                        <Rate disabled defaultValue={5} style={{ fontSize: '22px' }} />
                    </div>

                    <p className="font-kanit font-base text-xl text-slate-700 text-center tracking-wide leading-8">
                        {content}
                    </p>

                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className="w-[80px] h-[80px] rounded-full overflow-hidden">
                            <img src={image} alt="" className="w-full h-full object-center" />
                        </div>
                        <h3 className="font-kanit font-semibold text-xl">{name}</h3>
                        <p className="text-gray-600 font-medium -mt-1">{major}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffQuoteCard;
