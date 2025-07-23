import { Ingredient, IngredientRaw } from '../type';

export const mapIngredients = (raw: any): any[] => {
    return raw.map((item: any) => {
        const totalQuantity = item.history.reduce((sum, h) => sum + (h.quantity - h.used_unit), 0);

        let status = 'in_stock';
        if (totalQuantity <= 0) status = 'out_of_stock';
        else if (totalQuantity <= item.low_threshold) status = 'low_stock';

        return {
            id: item.id,
            name: item.name,
            unit: item.unit,
            quantity: totalQuantity,
            avg_price: item.avg_price,
            low_threshold: item.low_threshold,
            late_update_time: item.late_update_time,
            create_at: item.create_at,
            status,
        };
    });
};
