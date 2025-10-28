import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(90deg, #007bff 0%, #6f42c1 100%)",
        boxShadow: "0 -4px 10px rgba(0,0,0,0.15)",
        padding: "1.5rem 0",
        marginTop: "auto",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "white",
            fontSize: "0.9rem",
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 500,
            textShadow: "0 0 3px rgba(255, 255, 255, 0.2)",
            margin: 0,
            letterSpacing: "0.3px",
          }}
        >
          &copy; 2025 Nguyễn Duy Thư – Trường THPT Lý Tự Trọng, Gia Lai
        </p>
      </div>
    </footer>
  );
};

export default Footer;