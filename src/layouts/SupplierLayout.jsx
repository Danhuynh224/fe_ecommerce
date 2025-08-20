import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const SupplierLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarCollapsed ? "w-16" : "w-64"
        } bg-gradient-to-b from-red-600 via-red-500 to-red-600 text-white flex flex-col shadow-xl relative overflow-hidden transition-all duration-300 ease-in-out`}
      >
        {/* Decorative background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400/10 rounded-full transform -translate-x-12 translate-y-12"></div>

        <div className="relative z-10 p-6">
          {/* Toggle button */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute -right-3 top-6 w-6 h-6 bg-white text-red-600 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200 z-20"
          >
            <svg
              className={`w-3 h-3 transition-transform duration-300 ${
                sidebarCollapsed ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-lg mb-3 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            {!sidebarCollapsed && (
              <div className="transition-opacity duration-300">
                <h2 className="text-xl font-bold text-white drop-shadow-lg">
                  Quản lý Nhà Cung Cấp
                </h2>
                <p className="text-red-100 text-sm mt-1">Hệ thống quản trị</p>
              </div>
            )}
          </div>

          <nav className="flex flex-col gap-1">
            <Link
              to="/supplier/manage"
              className="group flex items-center py-3 px-4 rounded-xl hover:bg-white/20 text-white transition-all duration-300 hover:shadow-lg hover:translate-x-1 border border-transparent hover:border-yellow-400/30"
              title={sidebarCollapsed ? "Dashboard" : ""}
            >
              <div className="w-5 h-5 bg-yellow-400/20 rounded-lg flex items-center justify-center group-hover:bg-yellow-400/40 transition-colors flex-shrink-0">
                <svg
                  className="w-3 h-3 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              {!sidebarCollapsed && (
                <span className="font-medium ml-3">Dashboard</span>
              )}
            </Link>

            <Link
              to="/supplier/manage/identification"
              className="group flex items-center py-3 px-4 rounded-xl hover:bg-white/20 text-white transition-all duration-300 hover:shadow-lg hover:translate-x-1 border border-transparent hover:border-yellow-400/30"
              title={sidebarCollapsed ? "Định danh" : ""}
            >
              <div className="w-5 h-5 bg-yellow-400/20 rounded-lg flex items-center justify-center group-hover:bg-yellow-400/40 transition-colors flex-shrink-0">
                <svg
                  className="w-3 h-3 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {!sidebarCollapsed && (
                <span className="font-medium ml-3">Định danh</span>
              )}
            </Link>

            <Link
              to="/supplier/manage/contact"
              className="group flex items-center py-3 px-4 rounded-xl hover:bg-white/20 text-white transition-all duration-300 hover:shadow-lg hover:translate-x-1 border border-transparent hover:border-yellow-400/30"
              title={sidebarCollapsed ? "Liên hệ" : ""}
            >
              <div className="w-5 h-5 bg-yellow-400/20 rounded-lg flex items-center justify-center group-hover:bg-yellow-400/40 transition-colors flex-shrink-0">
                <svg
                  className="w-3 h-3 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              {!sidebarCollapsed && (
                <span className="font-medium ml-3">Liên hệ</span>
              )}
            </Link>

            <Link
              to="/supplier/manage/legal"
              className="group flex items-center py-3 px-4 rounded-xl hover:bg-white/20 text-white transition-all duration-300 hover:shadow-lg hover:translate-x-1 border border-transparent hover:border-yellow-400/30"
              title={sidebarCollapsed ? "Pháp lý" : ""}
            >
              <div className="w-5 h-5 bg-yellow-400/20 rounded-lg flex items-center justify-center group-hover:bg-yellow-400/40 transition-colors flex-shrink-0">
                <svg
                  className="w-3 h-3 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {!sidebarCollapsed && (
                <span className="font-medium ml-3">Pháp lý</span>
              )}
            </Link>

            <Link
              to="/supplier/manage/bank"
              className="group flex items-center py-3 px-4 rounded-xl hover:bg-white/20 text-white transition-all duration-300 hover:shadow-lg hover:translate-x-1 border border-transparent hover:border-yellow-400/30"
              title={sidebarCollapsed ? "Ngân hàng" : ""}
            >
              <div className="w-5 h-5 bg-yellow-400/20 rounded-lg flex items-center justify-center group-hover:bg-yellow-400/40 transition-colors flex-shrink-0">
                <svg
                  className="w-3 h-3 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {!sidebarCollapsed && (
                <span className="font-medium ml-3">Ngân hàng</span>
              )}
            </Link>

            <Link
              to="/supplier/manage/operations"
              className="group flex items-center py-3 px-4 rounded-xl hover:bg-white/20 text-white transition-all duration-300 hover:shadow-lg hover:translate-x-1 border border-transparent hover:border-yellow-400/30"
              title={sidebarCollapsed ? "Vận hành" : ""}
            >
              <div className="w-5 h-5 bg-yellow-400/20 rounded-lg flex items-center justify-center group-hover:bg-yellow-400/40 transition-colors flex-shrink-0">
                <svg
                  className="w-3 h-3 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {!sidebarCollapsed && (
                <span className="font-medium ml-3">Vận hành</span>
              )}
            </Link>

            <Link
              to="/supplier/manage/store"
              className="group flex items-center py-3 px-4 rounded-xl hover:bg-white/20 text-white transition-all duration-300 hover:shadow-lg hover:translate-x-1 border border-transparent hover:border-yellow-400/30"
              title={sidebarCollapsed ? "Gian hàng" : ""}
            >
              <div className="w-5 h-5 bg-yellow-400/20 rounded-lg flex items-center justify-center group-hover:bg-yellow-400/40 transition-colors flex-shrink-0">
                <svg
                  className="w-3 h-3 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {!sidebarCollapsed && (
                <span className="font-medium ml-3">Gian hàng</span>
              )}
            </Link>

            <Link
              to="/supplier/manage/add-product"
              className={`group flex items-center py-3 px-4 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-red-800 font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 mt-2 border border-yellow-300 ${
                sidebarCollapsed ? "justify-center" : ""
              }`}
              title={sidebarCollapsed ? "Thêm sản phẩm" : ""}
            >
              <div className="w-5 h-5 bg-red-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-3 h-3 text-red-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {!sidebarCollapsed && <span className="ml-3">Thêm sản phẩm</span>}
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-white">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SupplierLayout;
