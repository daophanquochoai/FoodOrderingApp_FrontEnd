import React, { useState } from "react";
import ClientBreadcrumb from "../../../components/breadcrumb/ClientBreadcrumb";
import FloatingInput from "../../../components/input/FloatingInput";
import { Link } from "react-router-dom";
import { validateEmail } from "../../../utils/helper";
import imageCheck from "../../../assets/check.png";
import imageError from "../../../assets/close.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [statusSendEmail, setStatusSendEmail] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setError("");

    console.log(email);
    // send thanh cong: statusSendEmail = 1; send that bai: statusSendEmail = 2
    setTimeout(() => {
      setStatusSendEmail(2);
    }, 1000);
  };

  return (
    <div>
      <ClientBreadcrumb title="Account" items={[{ label: "Home", to: "/" }]} />

      <div className="my-12">
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto p-8 pt-10 bg-white rounded-sm shadow-sm space-y-5"
        >
          <h2 className="text-xl md:text-3xl font-kanit font-semibold tracking-wide text-center">
            Reset your password
          </h2>

          {statusSendEmail == 0 ? (
            <p className="text-lg text-gray-600 text-center">
              We will send you an email to reset your password
            </p>
          ) : statusSendEmail == 1 ? (
            <div className="flex items-center justify-center gap-2">
              <img className="size-4" src={imageCheck} alt="checksuccess" />
              <p className="text-base font-semibold text-gray-600 text-center">
                We've sent you an email with a link to update your password.
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <img className="size-4" src={imageError} alt="checksuccess" />
              <p className="text-base font-semibold text-gray-600 text-center">
                There was an unexpected error. Please enter your email again.
              </p>
            </div>
          )}

          <FloatingInput
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && <p className="text-sm text-red-500 pl-1">{error}</p>}

          <button className="btn-primary" type="submit">
            Submit
          </button>

          <div className="text-center">
            <Link to={"/account/register"}>
              <span className="underline-text text-base">Cancel</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
