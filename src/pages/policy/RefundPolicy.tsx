import ClientBreadcrumb from "../../components/breadcrumb/ClientBreadcrumb";

const RefundPolicy = () => {
  return (
    <>
      <ClientBreadcrumb title="Refund Policy" items={[{ label: "Home", to: "/" }]} />
      <div className="flex flex-col px-4 lg:px-12 py-12 space-y-12">
                <strong className="text-center text-4xl">Refund policy</strong>
                <div className="space-y-4">
                    <p>We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.</p>
                    <p>To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.</p>
                    <p>If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.</p>
                </div>
                <div className="space-y-4">
                    <span className="font-bold text-2xl">Damages and issues</span>
                    <p>Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.</p>
                </div>
                <div className="space-y-4">
                    <span className="font-bold text-2xl">Exceptions / non-returnable items</span>
                    <p>Certain types of items cannot be returned, like perishable goods (such as food, flowers, or plants), custom products (such as special orders or personalized items), and personal care goods (such as beauty products). We also do not accept returns for hazardous materials, flammable liquids, or gases. Please get in touch if you have questions or concerns about your specific item.</p>
                    <p>Unfortunately, we cannot accept returns on sale items or gift cards.</p>
                </div>
                <div className="space-y-4">
                    <span className="font-bold text-2xl">Exchanges</span>
                    <p>The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.</p>
                </div>
                <div className="space-y-4">
                    <span className="font-bold text-2xl">Refunds</span>
                    <p>We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.</p>
                </div>
            </div>
    </>
  );
};

export default RefundPolicy;