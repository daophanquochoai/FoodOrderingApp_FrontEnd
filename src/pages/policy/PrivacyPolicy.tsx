import ClientBreadcrumb from "../../components/breadcrumb/ClientBreadcrumb";

const PrivacyPolicy = () => {
    return (
        <>
            <ClientBreadcrumb title="Privacy Policy" items={[{ label: "Home", to: "/" }]} />
            <div className="flex flex-col px-4 lg:px-12 py-12 space-y-12">
                <strong className="text-center text-4xl">Privacy policy</strong>
                <div className="space-y-4">
                    <span className="font-bold text-2xl">Lorem ipsum</span>
                    <p>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet conse ctetur adipisicing elit.</p>
                </div>
                <div className="space-y-4">
                    <span className="font-bold text-2xl">Lorem ipsum</span>
                    <p>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet conse ctetur adipisicing elit.</p>
                </div>
                <div className="space-y-4">
                    <span className="font-bold text-2xl">Lorem ipsum</span>
                    <p>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet conse ctetur adipisicing elit.</p>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicy;