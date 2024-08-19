import React, { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/generate-qr",
        { url },
        { responseType: "blob" } // Set the response type to blob
      );

      const qrCodeUrl = URL.createObjectURL(response.data);
      setQrCode(qrCodeUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>QR Code Generator</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {loading ? "Generating..." : "Generate QR Code"}
        </button>
      </form>
      {qrCode && (
        <div style={styles.qrContainer}>
          <h2 style={styles.subTitle}>Your QR Code:</h2>
          <img src={qrCode} alt="Generated QR Code" style={styles.qrImage} />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "rgb(226, 191, 217)", // Updated background color
    padding: "20px",
  },
  title: {
    fontSize: "2.5em",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
  },
  input: {
    padding: "15px",
    width: "100%",
    fontSize: "1em",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  button: {
    padding: "15px 30px",
    fontSize: "1em",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  qrContainer: {
    marginTop: "30px",
    textAlign: "center",
  },
  subTitle: {
    fontSize: "1.5em",
    color: "#333",
    marginBottom: "15px",
  },
  qrImage: {
    width: "250px",
    height: "250px",
    border: "5px solid #333",
    borderRadius: "10px",
  },
};

export default App;
