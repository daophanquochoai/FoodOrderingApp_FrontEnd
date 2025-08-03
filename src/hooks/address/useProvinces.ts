import { useMemo } from 'react';
import provincesData from '../../data/provinces.json';

interface Province {
    name: string;
    province_code: string;
}

export const useProvinces = () => {
    const provinces = useMemo(() => {
        return provincesData.map((province: Province) => ({
            value: province.name,
            label: province.name,
        }));
    }, []);

    const getProvinceByCode = (code: string) => {
        return provincesData.find((province: Province) => province.province_code === code);
    };

    return {
        provinces,
        getProvinceByCode,
    };
};
