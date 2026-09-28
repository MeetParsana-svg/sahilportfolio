import React, { useState } from "react";
import { Input, Button, message } from "antd";
import {
  LockOutlined,
  MailOutlined,
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { images } from "@/assets/assets";

export const AdminLogin = () => {
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (res.success) {
        message.success("Welcome back, Shubham! Login successful.");
        navigate("/admin");
      } else {
        setErrorMsg(res.error || "Authentication failed");
        message.error(res.error || "Authentication failed");
      }
    }, 400);
  };

  return (
    <div className="min-h-screen w-full bg-[#0F172A] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeftOutlined /> Back to Main Website
          </Link>
        </div>

        {/* Card */}
        <div className="bg-[#1E293B]/80 backdrop-blur-xl border border-gray-700/60 rounded-2xl p-8 shadow-2xl">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-2xl bg-white/5 border border-white/10 mb-4">
              <img
                src={images.logoTm}
                alt="Sahil Infotech"
                className="h-8 w-auto filter brightness-0 invert"
              />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Admin Portal
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Authorized Personnel Management Console
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0"></span>
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Administrator Email ID
              </label>
              <Input
                size="large"
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="!bg-[#0F172A]/70 !border-gray-700 !text-white hover:!border-indigo-500 focus:!border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <Input.Password
                size="large"
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className="!bg-[#0F172A]/70 !border-gray-700 !text-white hover:!border-indigo-500 focus:!border-indigo-500"
                required
              />
            </div>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              className="w-full !h-12 !bg-gradient-to-r !from-indigo-600 !to-blue-600 hover:!from-indigo-500 hover:!to-blue-500 !border-none !font-semibold !text-base shadow-lg shadow-indigo-600/30 rounded-xl"
            >
              Sign In to Admin Portal
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} Sahil Infotech Portfolio Admin System
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
