import React, { useState } from "react";
import ClientBreadcrumb from "../../../components/breadcrumb/ClientBreadcrumb";
import FloatingInput from "../../../components/input/FloatingInput";
import { Link } from "react-router-dom";
import { validateEmail } from "../../../utils/helper";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      setError("Please enter your name.");
      return;
    }

    if (!formData.email) {
      setError("Please enter your email.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (!formData.password) {
      setError("Please enter your password");
      return;
    }

    setError("");

    console.log(formData);
  };

  return (
    <div>
      <ClientBreadcrumb
        title="Create Account"
        items={[{ label: "Home", to: "/" }]}
      />

      <div className="my-8">
        <form
          onSubmit={handleRegister}
          className="max-w-xl mx-auto p-8 pt-10 bg-white rounded-sm shadow-sm space-y-5"
        >
          <h2 className="text-xl md:text-2xl font-kanit font-semibold tracking-wide text-center">
            Create account
          </h2>

          <FloatingInput
            id="name"
            label="Name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />

          <FloatingInput
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <FloatingInput
            id="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          {error && <p className="text-sm text-red-500 pl-1">{error}</p>}

          <button className="btn-primary" type="submit">
            Create
          </button>

          <div className="text-center">
            <Link to={"/"}>
              <span className="relative text-base text-gray-900 cursor-pointer after:contents[''] after:absolute after:bottom-[-2px] after:left-0 after:h-[0.5px] after:w-full after:bg-gray-500 hover:after:bg-transparent">
                Return to store
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
