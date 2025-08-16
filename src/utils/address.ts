import { Address } from '@/type/store/client/account/account.style';
import provincesData from '../data/provinces.json';
import wardsData from '../data/wards.json';

// Chuyển mã province thành tên province
export const getProvinceNameById = (provinceId: string): string => {
    const province = provincesData.find((p) => p.province_code === provinceId);
    return province ? province.name : provinceId;
};

// Chuyển mã ward thành tên ward
export const getWardNameById = (wardId: string): string => {
    const ward = wardsData.find((w) => w.ward_code === wardId);
    return ward ? ward.ward_name : wardId;
};

// Format địa chỉ đầy đủ từ các thành phần
export const formatFullAddress = (address: Address): string => {
    const provinceName = getProvinceNameById(address.province);
    const commune = getWardNameById(address.commune);

    return [address.address, commune, provinceName].filter(Boolean).join(', ');
};
