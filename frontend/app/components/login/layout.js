import "./login.css";

export default function LoginLayout({ children }) {
  return (
    <div className="login-container">
      <div className="login-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="login-content">
        <div className="login-card">{children}</div>
      </div>
    </div>
  );
}
