import ClientBreadcrumb from "../../../components/breadcrumb/ClientBreadcrumb";

const About = () => {
  return (
    <>
      <ClientBreadcrumb title="About Us" items={[{ label: "Home", to: "/" }, { label: "About Us", to: "/about" }]} />
      <div className="flex flex-col px-4 lg:px-12 py-12 space-y-12">
        <div className="space-y-4">
          <span className="font-bold text-2xl">Our company</span>
          <p>Founded in 2020, our fast food chain is dedicated to serving delicious, high-quality meals with speed and a smile. We believe in using fresh ingredients and innovative recipes to bring joy to every bite. Our mission is to make every meal a memorable experience, whether you're grabbing a quick lunch or enjoying a family dinner. With a focus on sustainability and community, we’re more than just a restaurant—we’re a place where flavors and friendships come together.</p>
        </div>
        <div className="space-y-4">
          <span className="font-bold text-2xl">Our team</span>
          <p>Our passionate team is the heart of our success. Our chefs bring years of culinary expertise to create signature dishes with precision. Our operations staff ensures fast and fresh service, keeping our restaurants running smoothly. Our marketing crew connects with our community through creative campaigns, spreading the word about our flavorful menu.</p>
        </div>
        <div className="space-y-4">
          <span className="font-bold text-2xl">Testimonials</span>
          <p>Our customers love our food and service. Many praise our burgers for being fresh, fast, and served with a smile. Others appreciate the variety of our menu and the quick service that fits their busy schedules. Guests often say our team makes them feel like family, and they can’t get enough of our delicious fries.</p>
        </div>
      </div>
    </>
  );
};

export default About;
