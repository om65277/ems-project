import React, { useEffect } from "react";

function ScreenLoaderComponent() {
  useEffect(() => {
    // Inject CSS once
    const styleId = "screen-loader-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        .screen-loader-backdrop {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.85);
          z-index: 9999;
        }

        .screen-loader {
          width: 48px;
          height: 48px;
          border: 5px solid rgba(0,0,0,0.12);
          border-top-color: rgba(59,130,246,1); /* blue */
          border-radius: 50%;
          animation: screen-loader-spin 0.9s linear infinite;
          box-sizing: border-box;
        }

        @keyframes screen-loader-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* optional: small accessibility text hidden visually but readable by screen readers */
        .sr-only {
          position: absolute !important;
          width: 1px !important;
          height: 1px !important;
          padding: 0 !important;
          margin: -1px !important;
          overflow: hidden !important;
          clip: rect(0, 0, 0, 0) !important;
          white-space: nowrap !important;
          border: 0 !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className="screen-loader-backdrop" role="status" aria-live="polite" aria-busy="true">
      <div className="screen-loader" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export default ScreenLoaderComponent;
