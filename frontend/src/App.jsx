import { useState, useRef } from "react";

export default function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const handleFile = (file) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const analyze = async () => {
    if (!image) return;
    setLoading(true);
    const form = new FormData();
    form.append("file", image);
    try {
      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      alert("Error connecting to backend.");
    } finally {
      setLoading(false);
    }
  };

  const alertColor = {
    LOW: "#00e5b4",
    MEDIUM: "#ffd24d",
    HIGH: "#ff4d4d",
    CRITICAL: "#ff4d4d",
  };

  return (
    <div
      style={{
        background: "#0a0c10",
        minHeight: "100vh",
        color: "#e0e8f0",
        fontFamily: "monospace",
        padding: "2rem",
      }}
    >
      <h1 style={{ color: "#00e5b4", marginBottom: "0.25rem" }}>
        ⬡ Robot Vision System
      </h1>
      <p style={{ color: "#6b7a90", marginBottom: "2rem" }}>
        AI-powered object detection & behavior engine
      </p>

      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files[0]);
        }}
        style={{
          border: "1.5px dashed #2a2f3a",
          borderRadius: 12,
          padding: "2rem",
          textAlign: "center",
          cursor: "pointer",
          marginBottom: "1rem",
          background: "#11141a",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => handleFile(e.target.files[0])}
        />
        {preview ? (
          <img
            src={preview}
            alt="preview"
            style={{ maxHeight: 300, borderRadius: 8, maxWidth: "100%" }}
          />
        ) : (
          <p style={{ color: "#6b7a90" }}>Drop image or click to upload</p>
        )}
      </div>

      <button
        onClick={analyze}
        disabled={!image || loading}
        style={{
          width: "100%",
          padding: "12px",
          background: "#00e5b4",
          color: "#000",
          border: "none",
          borderRadius: 10,
          fontFamily: "monospace",
          fontSize: 14,
          fontWeight: 700,
          cursor: "pointer",
          marginBottom: "1.5rem",
        }}
      >
        {loading ? "ANALYZING..." : "⬡ ANALYZE SCENE"}
      </button>

      {result && (
        <div>
          <h3 style={{ color: "#00e5b4", marginBottom: "0.75rem" }}>
            DETECTED OBJECTS
          </h3>
          {result.objects?.length === 0 && (
            <p style={{ color: "#6b7a90" }}>No objects detected.</p>
          )}
          {result.objects?.map((obj, i) => (
            <div
              key={i}
              style={{
                background: "#11141a",
                border: "1px solid #2a2f3a",
                borderRadius: 8,
                padding: "10px 14px",
                marginBottom: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{obj.name}</span>
              <span style={{ fontSize: 12, color: "#6b7a90" }}>
                {Math.round(obj.confidence * 100)}%
              </span>
              <span
                style={{
                  fontSize: 11,
                  padding: "3px 8px",
                  borderRadius: 4,
                  background:
                    obj.risk === "danger"
                      ? "#3a1111"
                      : obj.risk === "warn"
                      ? "#3a2f00"
                      : "#0a2a20",
                  color:
                    obj.risk === "danger"
                      ? "#ff4d4d"
                      : obj.risk === "warn"
                      ? "#ffd24d"
                      : "#00e5b4",
                }}
              >
                {obj.risk.toUpperCase()}
              </span>
            </div>
          ))}

          <h3 style={{ color: "#00e5b4", margin: "1.5rem 0 0.75rem" }}>
            BEHAVIOR DECISION
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: "1rem",
            }}
          >
            {[
              { label: "MOVEMENT", value: result.movement },
              {
                label: "ALERT LEVEL",
                value: result.alert_level,
                color: alertColor[result.alert_level],
              },
              { label: "PRIMARY ACTION", value: result.primary_action },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: "#11141a",
                  border: "1px solid #2a2f3a",
                  borderRadius: 10,
                  padding: "12px 14px",
                }}
              >
                <div
                  style={{ fontSize: 10, color: "#6b7a90", marginBottom: 4 }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: item.color || "#e0e8f0",
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ color: "#00e5b4", marginBottom: "0.75rem" }}>
            COMMAND QUEUE
          </h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {result.command_queue?.map((cmd, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: "1px solid #00e5b4",
                  color: "#00e5b4",
                  background: "rgba(0,229,180,0.07)",
                }}
              >
                {String(i + 1).padStart(2, "0")} {cmd}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
