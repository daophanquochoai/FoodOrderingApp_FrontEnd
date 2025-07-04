import ClientBreadcrumb from "../../../components/breadcrumb/ClientBreadcrumb";

const Contact = () => {
    return (
        <>
            <ClientBreadcrumb title="Contact Us" items={[{ label: "Home", to: "/" }, { label: "Contact", to: "/contact" }]} />
            <div className="h-[500px]">

            </div>
        </>
    );
};

export default Contact;