export type Voucher = {
    id: string;
    code: string;
    description: string;
    type: string;
    value: number;
    maxDiscount: number;
    endDate: string;
    isActive: boolean;
}