// // export default Navbar;
// import React from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";

// const Navbar: React.FC = () => {
//   const { user, logout, isAuthenticated } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   // Style link có viền khi active
//   const getLinkStyle = (path: string): React.CSSProperties => ({
//     color: "white",
//     textDecoration: "none",
//     fontWeight: "500",
//     padding: "6px 12px",
//     borderRadius: "6px",
//     border:
//       location.pathname === path ? "2px solid #ffd700" : "2px solid transparent",
//     backgroundColor:
//       location.pathname === path ? "rgba(255,255,255,0.1)" : "transparent",
//     transition: "all 0.2s ease",
//   });

//   return (
//     <nav
//       style={{
//         background: "linear-gradient(90deg, #007bff 0%, #6f42c1 100%)",
//         boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
//         padding: "0.75rem 0",
//         marginBottom: "2rem",
//         position: "sticky",
//         top: 0,
//         zIndex: 1000,
//       }}
//     >
//       <div
//         style={{
//           maxWidth: "1200px",
//           margin: "0 auto",
//           padding: "0 24px",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         {/* Logo + Tên */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "10px",
//           }}
//         >
//           {/* 🔹 Logo (ảnh bạn sẽ thêm sau) */}
//           <img
//             src="/logo.jpg" // 👉 sau này bạn thay đường dẫn hình logo tại đây
//             alt="Career Compass Logo"
//             style={{
//               width: "40px",
//               height: "40px",
//               borderRadius: "8px",
//               objectFit: "cover",
//             }}
//           />

//           {/* Tên thương hiệu */}
//           <Link
//             to="/"
//             style={{
//               fontSize: "1.6rem",
//               fontWeight: "bold",
//               color: "white",
//               textDecoration: "none",
//               letterSpacing: "1px",
//               transition: "transform 0.2s ease",
//             }}
//             onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
//             onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
//           >
//             Career Compass
//           </Link>
//         </div>

//         {/* Menu */}
//         <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
//           <Link to="/" style={getLinkStyle("/")}>
//             Home
//           </Link>

//           {isAuthenticated ? (
//             <>
//               <Link to="/quiz" style={getLinkStyle("/quiz")}>
//                 Quiz
//               </Link>

//               {user?.role === "admin" && (
//                 <Link to="/admin" style={getLinkStyle("/admin")}>
//                   Admin
//                 </Link>
//               )}

//               <span style={{ color: "#f1f1f1", fontStyle: "italic" }}>
//                 Hi, {user?.name}
//               </span>

//               <button
//                 onClick={handleLogout}
//                 style={{
//                   background: "white",
//                   color: "#dc3545",
//                   border: "2px solid white",
//                   padding: "8px 18px",
//                   borderRadius: "6px",
//                   fontWeight: "600",
//                   cursor: "pointer",
//                   transition: "all 0.3s ease",
//                 }}
//                 onMouseOver={(e) => {
//                   e.currentTarget.style.background = "#dc3545";
//                   e.currentTarget.style.color = "white";
//                 }}
//                 onMouseOut={(e) => {
//                   e.currentTarget.style.background = "white";
//                   e.currentTarget.style.color = "#dc3545";
//                 }}
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" style={getLinkStyle("/login")}>
//                 Login
//               </Link>

//               <Link
//                 to="/register"
//                 style={{
//                   background: "white",
//                   color: "#007bff",
//                   padding: "8px 16px",
//                   borderRadius: "6px",
//                   fontWeight: "600",
//                   textDecoration: "none",
//                   transition: "all 0.3s ease",
//                 }}
//                 onMouseOver={(e) => {
//                   e.currentTarget.style.background = "#007bff";
//                   e.currentTarget.style.color = "white";
//                 }}
//                 onMouseOut={(e) => {
//                   e.currentTarget.style.background = "white";
//                   e.currentTarget.style.color = "#007bff";
//                 }}
//               >
//                 Register
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const getLinkStyle = (path: string): React.CSSProperties => ({
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    padding: "10px 14px",
    borderRadius: "8px",
    border:
      location.pathname === path ? "2px solid #ffd700" : "2px solid transparent",
    backgroundColor:
      location.pathname === path ? "rgba(255,255,255,0.15)" : "transparent",
    transition: "all 0.2s ease",
    display: "block",
    textAlign: "center",
  });

  return (
    <nav
      style={{
        background: "linear-gradient(90deg, #007bff 0%, #6f42c1 100%)",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        padding: "0.75rem 0",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo + Tên thương hiệu */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="/logo.jpg"
            alt="Career Compass Logo"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
          <Link
            to="/"
            style={{
              fontSize: "1.4rem",
              fontWeight: "bold",
              color: "white",
              textDecoration: "none",
              letterSpacing: "0.5px",
            }}
          >
            Career Compass
          </Link>
        </div>

        {/* Nút menu mobile (dùng Unicode) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: "1.8rem",
            cursor: "pointer",
            display: "none",
          }}
          className="menu-toggle"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Menu desktop */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
          className="menu-desktop"
        >
          <Link to="/" style={getLinkStyle("/")}>
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/quiz" style={getLinkStyle("/quiz")}>
                Quiz
              </Link>
              {user?.role === "admin" && (
                <Link to="/admin" style={getLinkStyle("/admin")}>
                  Admin
                </Link>
              )}
              <span style={{ color: "#f1f1f1", fontStyle: "italic" }}>
                Hi, {user?.name}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  background: "white",
                  color: "#dc3545",
                  border: "2px solid white",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={getLinkStyle("/login")}>
                Login
              </Link>
              <Link
                to="/register"
                style={{
                  background: "white",
                  color: "#007bff",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontWeight: "600",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(8px)",
            padding: "12px 0",
            textAlign: "center",
          }}
        >
          <Link to="/" style={getLinkStyle("/")} onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/quiz"
                style={getLinkStyle("/quiz")}
                onClick={() => setMenuOpen(false)}
              >
                Quiz
              </Link>
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  style={getLinkStyle("/admin")}
                  onClick={() => setMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                style={{
                  background: "#fff",
                  color: "#dc3545",
                  border: "none",
                  borderRadius: "6px",
                  padding: "10px 16px",
                  margin: "10px auto",
                  width: "80%",
                  fontWeight: "600",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={getLinkStyle("/login")}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{
                  background: "white",
                  color: "#007bff",
                  padding: "10px 16px",
                  borderRadius: "6px",
                  fontWeight: "600",
                  margin: "8px auto",
                  width: "80%",
                  display: "block",
                }}
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}

      {/* CSS responsive */}
      <style>
        {`
          @media (max-width: 768px) {
            .menu-desktop {
              display: none !important;
            }
            .menu-toggle {
              display: block !important;
            }
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
