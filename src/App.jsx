// src/App.jsx
import React from "react";
import "./App.css";

function App() {
  return (
    <div style={{
      backgroundColor: "#000",
      color: "#FFD700",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>Direito Descomplicado</h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem", color: "#fff" }}>
        Assessoria Jurídica Trabalhista para Funcionários
      </p>
      <a href="#" style={{
        backgroundColor: "#FFD700",
        color: "#000",
        padding: "0.8rem 1.5rem",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: "bold"
      }}>
        Consultar seus direitos
      </a>
    </div>
  );
}

export default App;
