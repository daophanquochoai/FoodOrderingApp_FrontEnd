export const statusColorMap = {
    pending: "blue",
    processing: "purple",
    completed: "orange",
    shipping: "yellow",
    received: "green",
    cancelled: "red",
};

export const statusTextMap = {
    pending: "Pending",
    processing: "Processing",
    completed: "Completed",
    shipping: "Shipping",
    received: "Received",
    cancelled: "Cancelled",
};

export function countTotalQuantity(
    items: { id: string | number; quantity: number }[]
): number {
    return items.reduce((total, item) => total + item.quantity, 0);
}
