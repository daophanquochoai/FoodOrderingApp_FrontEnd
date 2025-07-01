import { Outlet, Link } from "react-router-dom";

const ClientLayout = () => {
  return (
    <div>
      <nav>
        <Link to="/">Trang chủ</Link> | <Link to="/about">Giới thiệu</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default ClientLayout;
