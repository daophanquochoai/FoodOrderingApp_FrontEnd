import React, { useState } from "react";
import ClientBreadcrumb from "../../../components/breadcrumb/ClientBreadcrumb";
import FloatingInput from "../../../components/input/FloatingInput";
import { Link } from "react-router-dom";
import { validateEmail } from "../../../utils/helper";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    if (password.trim() && password.length < 6) {
      setError("Please enter a password of at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("The password confirmation must match the provided password.");
      return;
    }

    setError("");
  };

  return (
    <div>
      <ClientBreadcrumb
        title="Reset Account"
        items={[{ label: "Home", to: "/" }]}
      />

      <div className="my-12">
        <form
          onSubmit={handleResetPassword}
          className="max-w-xl mx-auto p-8 pt-10 bg-white rounded-sm shadow-sm space-y-5"
        >
          <h2 className="text-xl md:text-3xl font-kanit font-semibold tracking-wide text-center">
            Reset account password
          </h2>

          <p className="text-lg text-gray-600 text-center">
            Enter a new password
          </p>

          <FloatingInput
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <FloatingInput
            id="confirm_password"
            label="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="text-sm text-red-500 pl-1">{error}</p>}
          <button className="btn-primary" type="submit">
            reset password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
