import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../service/api";

export default function LoginPage() {
  const [isSupplier, setIsSupplier] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    register: registerForgot,
    handleSubmit: handleSubmitForgot,
    formState: { errors: errorsForgot },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const toastId = toast.loading("Đang đăng nhập...");
    data.roleName = isSupplier ? "ROLE_SUPPLIER" : "USER";
    if (isSupplier) {
      console.log("Supplier đăng nhập");
    }
    try {
      let deviceId = localStorage.getItem("deviceId");
      if (!deviceId) {
        deviceId = crypto.randomUUID();
        localStorage.setItem("deviceId", deviceId);
      }
      let res;
      if (isSupplier) {
        res = await API.post("/auth/login/supplier", data, {
          headers: {
            "X-Device-Id": deviceId,
          },
          withCredentials: true,
        });
      } else {
        res = await API.post("/auth/login", data, {
          headers: {
            "X-Device-Id": deviceId,
          },
          withCredentials: true,
        });
      }

      const accessToken = res.data?.data?.accessToken;
      if (!accessToken) {
        throw new Error("Không nhận được access token từ máy chủ.");
      }

      localStorage.setItem("token", accessToken);
      localStorage.setItem("showEventNotification", "true");

      toast.update(toastId, {
        render: "Đăng nhập thành công!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      // Điều hướng dựa trên isSupplier
      navigate(isSupplier ? "/supplier/manage" : "/dashboard");
    } catch (err) {
      let message = "Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.";
      if (err?.response?.data?.message) {
        message = err.response.data.message;
      } else if (err.message === "Network Error") {
        message = "Không thể kết nối đến máy chủ.";
      } else {
        message = err.message;
      }

      toast.update(toastId, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 2500,
      });
    }
  });

  const onForgotPasswordSubmit = handleSubmitForgot(async (data) => {
    const toastId = toast.loading("Đang gửi liên kết...");
    try {
      await API.post("/auth/forgot-password", { email: data.forgotEmail });
      toast.update(toastId, {
        render: "Liên kết đặt lại mật khẩu đã được gửi!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      setShowForgotPassword(false);
    } catch (err) {
      const message =
        err.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại.";
      toast.update(toastId, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 2500,
      });
    }
  });

  const handleSupplierContact = () => {
    toast.info(
      "Vui lòng liên hệ qua email: support@ecommerce.com để tạo tài khoản nhà cung cấp.",
      { autoClose: 3000 }
    );
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full mb-4 animate-float">
            <ShoppingCart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 font-sans">
            {isSupplier ? "Đăng nhập Nhà cung cấp" : "Đăng nhập Người dùng"}
          </h1>
          <p className="text-gray-600 mt-3 text-base font-sans">
            {isSupplier
              ? "Truy cập tài khoản nhà cung cấp của bạn"
              : "Chào mừng bạn đến với sàn thương mại điện tử Việt Nam"}
          </p>
        </div>

        {/* Toggle Button */}
        <div className="text-center mb-6">
          <button
            onClick={() => setIsSupplier(!isSupplier)}
            className="text-red-600 hover:text-red-700 text-sm font-medium font-sans transition-colors duration-300"
            aria-label={
              isSupplier
                ? "Chuyển sang đăng nhập người dùng"
                : "Chuyển sang đăng nhập nhà cung cấp"
            }
          >
            {isSupplier ? "Bạn là Người dùng?" : "Bạn là Nhà cung cấp?"}
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2 font-sans"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-400" />
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email là bắt buộc",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email không hợp lệ",
                  },
                })}
                placeholder="Nhập email của bạn"
                autoComplete="email"
                aria-label="Email address"
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-400 transition-all duration-300 ease-in-out font-sans ${
                  errors.email ? "border-red-300" : "border-gray-200"
                } hover:border-red-300`}
              />
              {errors.email && (
                <p
                  id="email-error"
                  className="text-red-500 text-sm mt-1.5 font-sans"
                >
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2 font-sans"
            >
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Mật khẩu là bắt buộc",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                  },
                })}
                placeholder="Nhập mật khẩu"
                autoComplete="current-password"
                aria-label="Password"
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-400 transition-all duration-300 ease-in-out font-sans ${
                  errors.password ? "border-red-300" : "border-gray-200"
                } hover:border-red-300`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-red-400 hover:text-red-600 transition-colors duration-200" />
                ) : (
                  <Eye className="h-5 w-5 text-red-400 hover:text-red-600 transition-colors duration-200" />
                )}
              </button>
            </div>
            {errors.password && (
              <p
                id="password-error"
                className="text-red-500 text-sm mt-1.5 font-sans"
              >
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-4 w-4 text-red-500 focus:ring-red-300 border-gray-300 rounded"
                aria-label="Ghi nhớ đăng nhập"
              />
              <span className="text-sm text-gray-600 font-sans">
                Ghi nhớ đăng nhập
              </span>
            </label>
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-red-600 hover:text-red-700 font-medium font-sans transition-colors duration-300"
            >
              Quên mật khẩu?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-yellow-500 text-white font-medium py-3 rounded-lg hover:from-red-600 hover:to-yellow-600 transition-all duration-300 focus:ring-4 focus:ring-red-300 font-sans"
            aria-label="Đăng nhập"
          >
            Đăng nhập
          </button>
        </form>

        {/* Supplier Contact Section */}
        {isSupplier && (
          <div className="mt-8 border-t pt-6">
            <p className="text-center text-sm text-gray-600 mb-4 font-sans">
              Chưa có tài khoản nhà cung cấp?
            </p>
            <button
              onClick={handleSupplierContact}
              className="w-full bg-green-500 text-white font-medium py-3 rounded-lg hover:bg-green-600 transition-all duration-300 focus:ring-4 focus:ring-green-300 font-sans"
              aria-label="Liên hệ sàn để tạo tài khoản nhà cung cấp"
            >
              Liên hệ sàn để tạo tài khoản
            </button>
          </div>
        )}

        {/* Footer for User */}
        {!isSupplier && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 font-sans">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="text-red-600 hover:text-red-700 font-medium transition-colors duration-300 font-sans"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        )}

        {/* Forgot Password Modal */}
        {showForgotPassword && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-6 z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg relative">
              <button
                onClick={() => setShowForgotPassword(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                aria-label="Đóng modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 font-sans">
                  Đặt lại mật khẩu
                </h2>
                <p className="text-gray-600 mt-3 text-base font-sans">
                  Nhập email để nhận liên kết đặt lại mật khẩu
                </p>
              </div>

              <form onSubmit={onForgotPasswordSubmit} className="space-y-6">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-red-400" />
                  <input
                    id="forgot-email"
                    type="email"
                    {...registerForgot("forgotEmail", {
                      required: "Email là bắt buộc",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Email không hợp lệ",
                      },
                    })}
                    placeholder="Nhập email của bạn"
                    autoComplete="email"
                    aria-label="Email để đặt lại mật khẩu"
                    aria-describedby={
                      errorsForgot.forgotEmail
                        ? "forgot-email-error"
                        : undefined
                    }
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-400 transition-all duration-300 ease-in-out font-sans ${
                      errorsForgot.forgotEmail
                        ? "border-red-300"
                        : "border-gray-200"
                    } hover:border-red-300`}
                  />
                  {errorsForgot.forgotEmail && (
                    <p
                      id="forgot-email-error"
                      className="text-red-500 text-sm mt-1.5 font-sans"
                    >
                      {errorsForgot.forgotEmail.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-500 to-yellow-500 text-white font-medium py-3 rounded-lg hover:from-red-600 hover:to-yellow-600 transition-all duration-300 focus:ring-4 focus:ring-red-300 font-sans"
                  aria-label="Gửi liên kết đặt lại"
                >
                  Gửi liên kết đặt lại
                </button>

                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="w-full text-gray-600 hover:text-gray-800 text-sm font-sans transition-colors duration-300"
                  aria-label="Quay lại đăng nhập"
                >
                  Quay lại đăng nhập
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
