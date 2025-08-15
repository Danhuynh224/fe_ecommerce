import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Lock, Eye, EyeOff, ShoppingCart } from "lucide-react";

export default function LoginPage() {
  const [isSupplier, setIsSupplier] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const onSubmit = handleSubmit(() => {
    showToast("Đăng nhập thành công (mô phỏng)!", "success");
  });

  const handleSupplierContact = () => {
    showToast(
      "Vui lòng liên hệ qua email: support@ecommerce.com để tạo tài khoản nhà cung cấp.",
      "info"
    );
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium ${
            toast.type === "success"
              ? "bg-green-500"
              : toast.type === "error"
              ? "bg-red-500"
              : "bg-blue-500"
          } animate-bounce`}
        >
          {toast.message}
        </div>
      )}

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
        <div className="space-y-6">
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
              onClick={() => showToast("Tính năng đang phát triển")}
              className="text-sm text-red-600 hover:text-red-700 font-medium font-sans transition-colors duration-300"
            >
              Quên mật khẩu?
            </button>
          </div>

          <button
            onClick={onSubmit}
            className="w-full bg-gradient-to-r from-red-500 to-yellow-500 text-white font-medium py-3 rounded-lg hover:from-red-600 hover:to-yellow-600 transition-all duration-300 focus:ring-4 focus:ring-red-300 font-sans"
            aria-label="Đăng nhập"
          >
            Đăng nhập
          </button>
        </div>

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
              <button
                onClick={() => showToast("Chức năng đăng ký đang phát triển")}
                className="text-red-600 hover:text-red-700 font-medium transition-colors duration-300 font-sans"
              >
                Đăng ký ngay
              </button>
            </p>
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
