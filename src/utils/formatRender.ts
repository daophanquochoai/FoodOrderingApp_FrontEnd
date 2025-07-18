export const formatMoney = (value: string | number) => {
    const number = Number(value);
    return number.toLocaleString('vi-VN');
};
