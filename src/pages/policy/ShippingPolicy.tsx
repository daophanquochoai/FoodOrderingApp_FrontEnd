import ClientBreadcrumb from "../../components/breadcrumb/ClientBreadcrumb";

const ShippingPolicy = () => {
  return (
    <>
      <ClientBreadcrumb title="Shipping Policy" items={[{ label: "Home", to: "/" }]} />
      <div className="flex flex-col px-4 lg:px-12 py-12 space-y-12">
                <strong className="text-center text-4xl">Shipping policy</strong>
                <div className="space-y-4">
                    <span className="font-bold text-2xl">Shipping policy</span>
                    <p>At our Company, we understand the importance of timely delivery. We offer a variety of shipping options to suit your needs, including standard, expedited, and express shipping. Our dedicated team works diligently to process and dispatch your orders promptly, aiming to deliver them to your doorstep within the estimated timeframe.</p>
                    <p>We strive to provide fast and reliable shipping to our customers. Here's everything you need to know about our shipping process:</p>
                    <ul className="list-disc pl-6">
                        <li>Dispatch: Within 24 Hours</li>
                        <li>Free shipping across all products on a minimum purchase of $99.</li>
                        <li>International delivery time 5 to 7 business days</li>
                        <li>Cash on delivery might be available</li>
                        <li>Easy 30 days returns and exchanges</li>
                    </ul>
                    <p>Please note that delivery times are estimates and may vary depending on factors such as product availability, destination, and carrier delay</p>
                </div>
            </div>
    </>
  );
};

export default ShippingPolicy;