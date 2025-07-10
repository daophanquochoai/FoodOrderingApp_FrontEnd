import { Food } from "../components/product";

export const filterFoods = (foods: Food[] = [], searchParams: URLSearchParams) => {

  const availabilities = searchParams.getAll("availability"); // ["1", "0"]
  const priceGte = parseFloat(searchParams.get("price.gte") || "0");
  const priceLte = parseFloat(searchParams.get("price.lte") || "Infinity");
  const categorySubs = searchParams.getAll("category_sub"); // ["French Fries", "Hamburger Veggie"]
  const sizes = searchParams.getAll("size"); // ["Small", "Medium"]

  const filteredFoods = foods.filter((food) => {

    if (availabilities.length > 0) {
      const foodStatus = food.status ? "1" : "0";
      if (!availabilities.includes(foodStatus)) return false;
    }

    if (categorySubs.length > 0) {
      const matchedCategory = categorySubs.some(sub =>
        food.name.toLowerCase().includes(sub.toLowerCase())
      );
      if (!matchedCategory) return false;
    }

    if (sizes.length > 0) {
      const matchedSize = food.sizes.some(size =>
        sizes.includes(size.name)
      );
      if (!matchedSize) return false;
    }

    const matchedPrice = food.sizes.some(size =>
      size.price >= priceGte && size.price <= priceLte
    );
    if (!matchedPrice) return false;

    return true;
  });

  return filteredFoods;
};
