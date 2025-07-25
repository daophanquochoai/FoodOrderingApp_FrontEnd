export type Voucher = {
    id: string;
    code: string;
    description: string;
    type: string;
    value: number;
    maxDiscount: number;
    maxUsage?: number;
    usedCount?: number;
    startDate?: string;
    endDate: string;
    isActive: boolean;
    createdAt?: string;
}