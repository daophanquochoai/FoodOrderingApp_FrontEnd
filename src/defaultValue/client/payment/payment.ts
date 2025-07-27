import { filter } from "@/defaultValue/common";
import { PaymentSlice } from "@/type/store/client/payment/payment.style";

export const initPaymentSlice : PaymentSlice = {
    payment : {
        data : [],
        loading : false,
        filter : filter,
        totalPage : 0
    }
}