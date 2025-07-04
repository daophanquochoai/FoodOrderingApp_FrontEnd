import { Link } from "react-router-dom";
import ClientBreadcrumb from "../components/breadcrumb/ClientBreadcrumb";

const NotFound = () => {
  return (
    <>
      <ClientBreadcrumb title="404 Not Found" items={[{ label: "Home", to: "/" }]} />
      <div className="h-[400px] flex flex-col items-center justify-center">
        <p className="font-bold text-8xl lg:text-9xl">404</p>
        <p className="font-bold mt-2 text-3xl lg:text-4xl">Page not found</p>
        <Link to="/" className="mt-8 lg:mt-10">
          <div className="text-white bg-orange-500 font-bold p-4 rounded-full">
            CONTINUE SHOPPING
          </div>
        </Link>
      </div>
    </>
  );
};

export default NotFound;