type Size = {
    id: number;
    name: string;
    price: number;
    status: boolean;
    create_by?: string;
};

type FoodSize = {
    size_id: number;
    name: string;
    price: number; // gia su gia da cong
    discount: number;
    ready_in_minutes: number;
    status: boolean;
};

export type Food = {
    id: number;
    name: string;
    desc: string;
    image: string;
    status: boolean;
    create_date: string;
    last_update_time: string;
    food_code: string;
    category_id: number;
    sizes: FoodSize[];
    rate?: number;
};
