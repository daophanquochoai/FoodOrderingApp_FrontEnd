export interface HomepageManagementState {
    // Shop By Categories
    categories: any[];
    homepageCategories: any[];
    categoriesLoading: boolean;

    // Latest Products
    products: any[];
    latestProducts: any[];
    latestProductsLoading: boolean;

    // Deal of the Week
    dealOfWeek: any[];
    dealOfWeekLoading: boolean;
}