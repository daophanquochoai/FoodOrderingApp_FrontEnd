import { useMemo } from 'react';
import wardsData from '../../data/wards.json';

interface Ward {
    ward_name: string;
    ward_code: string;
    province_code: string;
    province_name: string;
}

export const useWards = (selectedProvinceCode?: string) => {
    const wards = useMemo(() => {
        if (!selectedProvinceCode) return [];
        
        return wardsData
            .filter((ward: Ward) => ward.province_code === selectedProvinceCode)
            .map((ward: Ward) => ({
                value: ward.ward_code,
                label: ward.ward_name
            }))
            .sort((a, b) => a.label.localeCompare(b.label, 'vi'));
    }, [selectedProvinceCode]);

    const getWardByCode = (code: string) => {
        return wardsData.find((ward: Ward) => ward.ward_code === code);
    };

    return {
        wards,
        getWardByCode
    };
};