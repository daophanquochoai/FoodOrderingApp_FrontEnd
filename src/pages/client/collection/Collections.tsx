import ClientBreadcrumb from "../../../components/breadcrumb/ClientBreadcrumb";
import { Category, CategoryItem } from "../../../components/category";

const Collections = () => {

    const categories: Category[] = [
        {
          id: 1,
          name: "Cheese Fried Chicken",
          image: "https://grillfood-demo.myshopify.com/cdn/shop/collections/cat-2_7fea190e-4deb-45ca-b2ce-1750a57d0884.png?v=1747046512",
          desc: "All kinds of Italian-style pizzas.",
          create_date: "2025-07-01",
          late_update_time: "2025-07-05",
          status: true,
          parentId: null,
          create_by: 1,
        },
        {
          id: 2,
          name: "Crunchy Taco Bell",
          image: "https://grillfood-demo.myshopify.com/cdn/shop/collections/cat-5.png?v=1747045791",
          desc: "Pizzas with no meat, only veggies and cheese.",
          create_date: "2025-07-02",
          late_update_time: "2025-07-06",
          status: true,
          parentId: 1,
          create_by: 1,
        },
        {
          id: 3,
          name: "French Fries",
          image: "https://grillfood-demo.myshopify.com/cdn/shop/collections/cat-4.png?v=1747045743",
          desc: "Classic and modern burgers with multiple styles.",
          create_date: "2025-07-03",
          late_update_time: "2025-07-07",
          status: true,
          parentId: null,
          create_by: 1,
        },
        {
          id: 4,
          name: "Hamburger Veggie",
          image: "https://grillfood-demo.myshopify.com/cdn/shop/collections/cat-1.png?v=1747045631",
          desc: "Various beverages: soft drinks, coffee, tea.",
          create_date: "2025-07-03",
          late_update_time: "2025-07-07",
          status: true,
          parentId: null,
          create_by: 2,
        },
        {
          id: 5,
          name: "Cheese Fried Chicken",
          image: "https://grillfood-demo.myshopify.com/cdn/shop/collections/cat-3.png?v=1747045706",
          desc: "Hot or iced coffee, Vietnamese and international.",
          create_date: "2025-07-03",
          late_update_time: "2025-07-07",
          status: true,
          parentId: 4,
          create_by: 2,
        },
        {
          id: 6,
          name: "Drinks",
          image: "https://grillfood-demo.myshopify.com/cdn/shop/collections/cat-3.png?v=1747045706",
          desc: "Hot or iced coffee, Vietnamese and international.",
          create_date: "2025-07-03",
          late_update_time: "2025-07-07",
          status: true,
          parentId: 4,
          create_by: 2,
        },
    ];

    return (
        <>
            <ClientBreadcrumb title="Collections" items={[{ label: "Home", to: "/" }]} />
            <div className="py-4">
                <div className="container">
                    <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 max-500:grid-cols-2">
                        {categories.length > 0 && categories.map((category) => (
                            !category.parentId && (
                                <div key={category.id}>
                                    <CategoryItem {...category}/>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Collections;