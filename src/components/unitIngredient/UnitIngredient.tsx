import React from 'react';

export const unitData = [
    { id: 1, name: 'mg', type: 'weight', base: 'kg', ratio: 0.000001 },
    { id: 2, name: 'g', type: 'weight', base: 'kg', ratio: 0.001 },
    { id: 3, name: 'kg', type: 'weight', base: 'kg', ratio: 1 },
    { id: 3, name: 'Quintal', type: 'weight', base: 'kg', ratio: 100 }, // Quintal (tạ)
    { id: 3, name: 'Metric Ton', type: 'weight', base: 'kg', ratio: 1000 }, // Metric Ton (tấn)
    { id: 4, name: 'oz', type: 'weight', base: 'kg', ratio: 0.0283495 }, // ounce (Mỹ)
    { id: 5, name: 'lb', type: 'weight', base: 'kg', ratio: 0.453592 }, // pound

    //     { id: 6, name: 'ml', type: 'volume', base: 'liter', ratio: 0.001 },
    //     { id: 7, name: 'l', type: 'volume', base: 'liter', ratio: 1 },
    //     { id: 8, name: 'tsp', type: 'volume', base: 'liter', ratio: 0.005 }, // teaspoon (muỗng cà phê)
    //     { id: 9, name: 'tbsp', type: 'volume', base: 'liter', ratio: 0.015 }, // tablespoon (muỗng canh)
    //     { id: 10, name: 'cup', type: 'volume', base: 'liter', ratio: 0.24 },
    //     { id: 11, name: 'floz', type: 'volume', base: 'liter', ratio: 0.0295735 },

    //     { id: 12, name: 'can', type: 'quantity', base: 'can', ratio: 1 }, // lon

    //     { id: 13, name: 'bottle', type: 'quantity', base: 'bottle', ratio: 1 }, // chai

    //     { id: 14, name: 'piece', type: 'quantity', base: 'piece', ratio: 1 }, // cái / miếng
    //     { id: 15, name: 'pack', type: 'quantity', base: 'piece', ratio: 10 }, // 1 pack = 10 cái
    //     { id: 16, name: 'slice', type: 'quantity', base: 'piece', ratio: 1 }, // lát (thường dùng cho phô mai, xúc xích)
    //     { id: 17, name: 'serving', type: 'quantity', base: 'piece', ratio: 1 }, // khẩu phần
    //     { id: 19, name: 'box', type: 'quantity', base: 'piece', ratio: 20 }, // 1 hộp gồm 20 miếng
    //     { id: 20, name: 'stick', type: 'quantity', base: 'piece', ratio: 1 }, // thanh (ví dụ thanh khoai tây)

    //     { id: 18, name: 'tray', type: 'quantity', base: 'tray', ratio: 1 }, // khay
];

const UnitIngredient = () => {
    return <div>UnitIngredient</div>;
};

export default UnitIngredient;
