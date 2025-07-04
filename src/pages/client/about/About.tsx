import ClientBreadcrumb from "../../../components/breadcrumb/ClientBreadcrumb";

const About = () => {
  return (
    <>
      <ClientBreadcrumb title="About Us" items={[{ label: "Home", to: "/" }, { label: "About Us", to: "/about" }]} />
      <div className="h-[500px] flex flex-col px-4 lg:px-12 py-12 space-y-12">
        <div className="space-y-4">
          <span className="font-bold text-2xl">Our company</span>
          <p>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet conse ctetur adipisicing elit.</p>
        </div>
        <div className="space-y-4">
          <span className="font-bold text-2xl">Our team</span>
          <p>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet conse ctetur adipisicing elit.</p>
        </div>
        <div className="space-y-4">
          <span className="font-bold text-2xl">Testimonials</span>
          <p>Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet conse ctetur adipisicing elit.</p>
        </div>
      </div>
    </>
  );
};

export default About;
