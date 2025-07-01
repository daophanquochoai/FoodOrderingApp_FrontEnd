import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <nav>
        <Link to="/admin">Dashboard</Link> |{" "}
        <Link to="/admin/settings">Cài đặt</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
