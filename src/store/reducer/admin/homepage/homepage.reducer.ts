import { homepageManagement } from "@/defaultValue/admin/homepage/homepage";
import { removeProductFromHomepage } from "@/store/action/admin/homepage/homepage.action";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const name = 'homepage_management';

const HomepageManagementSlice = createSlice({
    name,
    initialState: homepageManagement,
    reducers: {
        setCategories(state, action: PayloadAction<any[]>) {
            state.categories = action.payload;
        },
        setHomepageCategories(state, action: PayloadAction<any[]>) {
            state.homepageCategories = action.payload;
        },
        setCategoriesLoading(state, action: PayloadAction<boolean>) {
            state.categoriesLoading = action.payload;
        },
        addCategoryToHomepage(state, action: PayloadAction<any>) {
            const category = action.payload;
            
            // Remove from available categories
            state.categories = state.categories.filter(c => c.id !== category.id);
            
            // Add to homepage categories
            state.homepageCategories.push({
                ...category,
                displayOrder: state.homepageCategories.length + 1
            });
        },
        removeCategoryFromHomepage(state, action: PayloadAction<any>) {
            const category = action.payload;
            
            // Remove from homepage categories
            state.homepageCategories = state.homepageCategories.filter(c => c.id !== category.id);
            
            // Add back to available categories
            state.categories.push(category);
            
            // Update display order
            state.homepageCategories = state.homepageCategories.map((cat, index) => ({
                ...cat,
                displayOrder: index + 1
            }));
        },

        setProducts(state, action: PayloadAction<any[]>) {
            state.products = action.payload;
        },
        setLatestProducts(state, action: PayloadAction<any[]>) {
            state.latestProducts = action.payload;
        },
        setLatestProductsLoading(state, action: PayloadAction<boolean>) {
            state.latestProductsLoading = action.payload;
        },
        addProductToLatest(state, action: PayloadAction<any>) {
            const product = action.payload;
            
            // Remove from available products
            state.products = state.products.filter(p => p.id !== product.id);
            
            // Add to latest products
            state.latestProducts.push({
                ...product,
                displayOrder: state.latestProducts.length + 1
            });
        },
        removeProductFromHomepage(state, action: PayloadAction<any>) {
            const product = action.payload;

            // Remove from homepage products
            state.latestProducts = state.latestProducts.filter(p => p.id !== product.id);
            state.dealOfWeek = state.dealOfWeek.filter(p => p.id !== product.id);

            // Add back to available products
            state.products.push(product);
            
            // Update display order
            state.latestProducts = state.latestProducts.map((prod, index) => ({
                ...prod,
                displayOrder: index + 1
            }));
            state.dealOfWeek = state.dealOfWeek.map((prod, index) => ({
                ...prod,
                displayOrder: index + 1
            }));
        },

        setDealOfWeek(state, action: PayloadAction<any[]>) {
            state.dealOfWeek = action.payload;
        },
        setDealOfWeekLoading(state, action: PayloadAction<boolean>) {
            state.dealOfWeekLoading = action.payload;
        },
        addDealOfWeek(state, action: PayloadAction<any>) {
            const deal = action.payload;
            // Remove from available products
            state.products = state.products.filter(p => p.id !== deal.id);
            
            // Add to deal of week
            state.dealOfWeek.push({
                ...deal,
                displayOrder: state.dealOfWeek.length + 1
            });
        },
    },
});

export const { actions } = HomepageManagementSlice;
export default HomepageManagementSlice;