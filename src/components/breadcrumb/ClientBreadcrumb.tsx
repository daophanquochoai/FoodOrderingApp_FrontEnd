import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

type BreadCrumbItem = string | { label: string; to: string };

type ClientBreadItemProps = {
  title: string;
  items: BreadCrumbItem[];
};

const ClientBreadcrumb: React.FC<ClientBreadItemProps> = ({ title, items }) => {
  const breadcrumbItems = items.map((item) => {
    if (typeof item == "string") {
      return {
        title: (
          <span className="font-mono text-base tracking-wider">{item}</span>
        ),
      };
    }

    return {
      title: (
        <Link to={item.to}>
          <span className="font-mono text-base tracking-wider">
            {item.label}
          </span>
        </Link>
      ),
    };
  });

  return (
    <div className="bg-[#ffffff] py-5 md:py-7 lg:py-9 flex flex-col items-center justify-center gap-1 ">
      <h2 className="text-xl md:text-3xl font-kanit font-semibold tracking-wide">
        {title}
      </h2>
      <div>
        <Breadcrumb items={breadcrumbItems} />
      </div>
    </div>
  );
};

export default ClientBreadcrumb;
