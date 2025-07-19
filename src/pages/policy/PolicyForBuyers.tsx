import ClientBreadcrumb from "../../components/breadcrumb/ClientBreadcrumb";

const PolicyForBuyers = () => {
    return (
        <>
            <ClientBreadcrumb title="Policy for Buyers" items={[{ label: "Home", to: "/" }]} />
            <div className="flex flex-col px-4 lg:px-12 py-12 space-y-12">
                <strong className="text-center text-4xl">Policy for buyers</strong>
                <div className="space-y-4">
                    <p>
                        Welcome to our Food Ordering App! As a valued buyer, please review our policies to ensure a smooth and secure experience.
                    </p>
                    <ul className="list-disc pl-6">
                        <li>
                            <strong>Order Placement:</strong> Please double-check your order details before confirming. Once placed, orders cannot be modified.
                        </li>
                        <li>
                            <strong>Payment:</strong> All payments must be completed through our secure payment gateway. We do not store your payment information.
                        </li>
                        <li>
                            <strong>Cancellation & Refunds:</strong> Orders can be cancelled within 5 minutes of placement. Refunds will be processed within 3-5 business days.
                        </li>
                        <li>
                            <strong>Delivery:</strong> Estimated delivery times are provided at checkout. Delays may occur due to unforeseen circumstances.
                        </li>
                        <li>
                            <strong>Customer Support:</strong> For any issues, please contact our support team via the Help section. We aim to resolve all queries promptly.
                        </li>
                        <li>
                            <strong>Privacy:</strong> Your personal information is protected and will not be shared with third parties except as required for order fulfillment.
                        </li>
                    </ul>
                    <p>
                        By using our service, you agree to abide by these policies. Thank you for choosing us!
                    </p>
                </div>
            </div>
        </>
    );
};

export default PolicyForBuyers;