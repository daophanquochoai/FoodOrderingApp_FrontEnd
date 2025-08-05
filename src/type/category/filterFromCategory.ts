import dayjs from 'dayjs';
import { Asserts } from 'yup';
import { FilterProductSchema } from '../../components/yup/product';

// export type FilterFormValues = {
//     search?: string;
//     minDiscount?: number;
//     maxDiscount?: number;
//     minPrice?: number;
//     maxPrice?: number;
//     minReady?: number;
//     maxReady?: number;
//     foodIds?: string[];
//     size?: string[];
//     isActive?: boolean;
//     dateRange?: [dayjs.Dayjs, dayjs.Dayjs];
// };

export type FilterFormValues = Asserts<typeof FilterProductSchema>;

export interface FilterMobileProps {
    isOpen: boolean;
    onClose: () => void;
    setIsMobile?: React.Dispatch<React.SetStateAction<boolean>>;
}
