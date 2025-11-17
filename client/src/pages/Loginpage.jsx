import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { HiRefresh } from "react-icons/hi";
import CustomLoaderbtn from "../components/CustomLoaderbtn";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../utils/axiosClient";
import { useMainContext } from "../context/mainContext";

const LoginPage = () => {
  const [isShow, setIsShow] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { fetchUserProfile } = useMainContext();

  const initialValues = {
    email: "",
    password: "",
    captcha: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email must be valid")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    captcha: Yup.string().required("Captcha is required"),
  });

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const operator = ["+", "-"][Math.floor(Math.random() * 2)];
    setCaptcha(`${num1} ${operator} ${num2}`);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const onSubmitHandler = async (values, helpers) => {
    try {
      setLoading(true);

      // Captcha validation
      if (parseInt(values.captcha) !== eval(captcha)) {
        toast.error("Invalid captcha");
        generateCaptcha();
        return;
      }

      const sendValues = {
        email: values.email.trim(),
        password: values.password.trim(),
      };

      const response = await axiosClient.post("/login", sendValues);
      const data = response.data;

      localStorage.setItem("token", data.token);
      toast.success(data.message || "Login successful");

      await fetchUserProfile();
      helpers.resetForm();
      navigate("/dashboard");
      generateCaptcha();
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error(error?.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col py-10">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {({ handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className="w-[98%] md:w-1/2 lg:w-1/3 border-2 py-10 px-4 rounded border-gray-400"
          >
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                type="email"
                className="w-full py-2 border border-gray-500 rounded px-3 placeholder:font-medium outline-none"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                className="text-red-500 text-xs"
                component="p"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <div className="flex w-full border rounded border-gray-500 items-center justify-between px-4">
                <Field
                  name="password"
                  type={isShow ? "text" : "password"}
                  className="w-full py-2 placeholder:font-medium outline-none"
                  placeholder="Enter your password"
                />
                <button type="button" onClick={() => setIsShow(!isShow)}>
                  {isShow ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <ErrorMessage
                name="password"
                className="text-red-500 text-xs"
                component="p"
              />
            </div>

            <div className="mb-3 flex items-center justify-between">
              <p className="text-center w-1/2 font-bold text-lg">{captcha}</p>
              <button type="button" onClick={generateCaptcha} className="text-center w-1/2">
                <HiRefresh size={20} />
              </button>
            </div>

            <div className="mb-3">
              <Field
                placeholder="Enter captcha result"
                name="captcha"
                className="w-full py-2 border border-gray-500 rounded px-3 placeholder:font-medium outline-none font-bold"
              />
              <ErrorMessage
                name="captcha"
                className="text-red-500 text-xs"
                component="p"
              />
            </div>

            <div className="mb-3">
              <CustomLoaderbtn type="submit" isLoading={loading} text="Login" />
            </div>

            <div className="mb-3">
              <p className="text-end">
                Don't have an account?{" "}
                <Link to="/register" className="font-bold text-indigo-500">
                  Register
                </Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
