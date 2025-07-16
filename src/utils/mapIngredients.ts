import { Ingredient, IngredientRaw } from '../type';

export const mapIngredients = (raw: IngredientRaw[]): Ingredient[] => {
    return raw.map((item) => {
        const totalQuantity = item.history.reduce((sum, h) => sum + (h.quantity - h.used_unit), 0);

        let status: Ingredient['status'] = 'in_stock';
        if (totalQuantity <= 0) status = 'out_of_stock';
        else if (totalQuantity <= item.low_threshold) status = 'low_stock';

        return {
            key: item.id,
            name: item.name,
            unit: item.unit,
            quantity: totalQuantity,
            low_threshold: item.low_threshold,
            late_update_time: item.late_update_time,
            status,
        };
    });
};
