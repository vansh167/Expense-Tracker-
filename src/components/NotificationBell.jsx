import React, { useState } from "react";
import "../style/Notification.css";


const NotificationBell = ({ notifications }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ fontSize: "24px", cursor: "pointer",backgroundColor:"transparent", borderColor:"transparent" }}
        aria-label="Notifications"
      >
        🔔
        {notifications.length > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "12px",
            }}
          >
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "30px",
            background: "white",
            border: "1px solid #ccc",
            width: "300px",
            maxHeight: "200px",
            overflowY: "auto",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            zIndex: 100,
          }}
        >
          {notifications.length === 0 ? (
            <p style={{ padding: "10px" }}>No notifications.</p>
          ) : (
            notifications
              .slice()
              .reverse()
              .map((n, i) => (
                <div
                  key={i}
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #eee",
                    color: n.type === "success" ? "green" : "red",
                  }}
                >
                  {n.msg}
                  <br />
                  <small style={{ fontSize: "10px", color: "#666" }}>
                    {n.time.toLocaleTimeString()}
                  </small>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
