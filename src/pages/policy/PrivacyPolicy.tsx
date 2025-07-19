import ClientBreadcrumb from "../../components/breadcrumb/ClientBreadcrumb";

const PrivacyPolicy = () => {
    return (
        <>
            <ClientBreadcrumb title="Privacy Policy" items={[{ label: "Home", to: "/" }]} />
            <div className="flex flex-col px-4 lg:px-12 py-12 space-y-12">
                <strong className="text-center text-4xl">Privacy policy</strong>
                <div className="space-y-4">
                    <p>Last updated: May 12, 2025</p>
                    <p>This Privacy Policy describes how GrillFood - Fast Food Store (Password: demo) (the "Site", "we", "us", or "our") collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from grillfood-demo.myshopify.com (the "Site") or otherwise communicate with us regarding the Site (collectively, the "Services"). For purposes of this Privacy Policy, "you" and "your" means you as the user of the Services, whether you are a customer, website visitor, or another individual whose information we have collected pursuant to this Privacy Policy.</p>
                    <p>Please read this Privacy Policy carefully.</p>
                </div>
                <div className="space-y-4">
                    <span className="font-bold text-2xl">Changes to This Privacy Policy</span>
                    <p>We may update this Privacy Policy from time to time, including to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on the Site, update the "Last updated" date and take any other steps required by applicable law.</p>
                </div>
                <div className="space-y-4">
                    <span className="font-bold text-2xl">How We Collect and Use Your Personal Information</span>
                    <p>To provide the Services, we collect and have collected over the past 12 months personal information about you from a variety of sources, as set out below. The information that we collect and use varies depending on how you interact with us.</p>
                    <p>In addition to the specific uses set out below, we may use information we collect about you to communicate with you, provide or improve or improve the Services, comply with any applicable legal obligations, enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others.</p>
                </div>
                <div className="space-y-4">
                    <span className="font-bold text-2xl">What Personal Information We Collect</span>
                    <p>The types of personal information we obtain about you depends on how you interact with our Site and use our Services. When we use the term "personal information", we are referring to information that identifies, relates to, describes or can be associated with you. The following sections describe the categories and specific types of personal information we collect.</p>
                </div>
                <div className="space-y-4">
                    <span className="font-bold text-2xl">Information We Collect Directly from You</span>
                    <p>Information that you directly submit to us through our Services may include:</p>
                    <ul className="list-disc pl-6">
                        <li><strong>Contact details</strong> including your name, address, phone number, and email.</li>
                        <li><strong>Order information</strong> including your name, billing address, shipping address, payment confirmation, email address, and phone number.</li>
                        <li><strong>Account information</strong> including your username, password, security questions and other information used for account security purposes.</li>
                        <li><strong>Customer support information</strong> including the information you choose to include in communications with us, for example, when sending a message through the Services.</li>
                    </ul>
                    <p>Some features of the Services may require you to directly provide us with certain information about yourself. You may elect not to provide this information, but doing so may prevent you from using or accessing these features.</p>
                </div>
                <div className="space-y-4">
                    <span className="font-bold text-2xl">Information We Collect about Your Usage</span>
                    <p>We may also automatically collect certain information about your interaction with the Services ("<strong>Usage Data</strong>"). To do this, we may use cookies, pixels and similar technologies ("<strong>Cookies</strong>"). Usage Data may include information about how you access and use our Site and your account, including device information, browser information, information about your network connection, your IP address and other information regarding your interaction with the Services.</p>
                </div>
                <div className="space-y-4">
                    <span className="font-bold text-2xl">Information We Obtain from Third Parties</span>
                    <p>Finally, we may obtain information about you from third parties, including from vendors and service providers who may collect information on our behalf, such as:</p>
                    <ul className="list-disc pl-6">
                        <li>Companies who support our Site and Services</li>
                        <li>Our payment processors, who collect payment information (e.g., bank account, credit or debit card information, billing address) to process your payment in order to fulfill your orders and provide you with products or services you have requested, in order to perform our contract with you.</li>
                        <li>When you visit our Site, open or click on emails we send you, or interact with our Services or advertisements, we, or third parties we work with, may automatically collect certain information using online tracking technologies such as pixels, web beacons, software developer kits, third-party libraries, and cookies.</li>
                    </ul>
                    <p>Any information we obtain from third parties will be treated in accordance with this Privacy Policy.</p>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicy;