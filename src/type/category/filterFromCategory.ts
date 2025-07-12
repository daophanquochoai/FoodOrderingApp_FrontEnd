import dayjs from 'dayjs';

export type FilterFormValues = {
    search?: string;
    minDiscount?: number;
    maxDiscount?: number;
    minPrice?: number;
    maxPrice?: number;
    minReady?: number;
    maxReady?: number;
    foodIds?: string[];
    size?: string[];
    isActive?: boolean;
    dateRange?: [dayjs.Dayjs, dayjs.Dayjs];
};

export interface FilterMobileProps {
    isOpen: boolean;
    onClose: () => void;
}
