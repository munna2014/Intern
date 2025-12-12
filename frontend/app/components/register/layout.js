import "./register.css";

export default function RegisterLayout({ children }) {
  return (
    <div className="register-container">
      <div className="register-background">
        <div className="gradient-orb-reg orb-reg-1"></div>
        <div className="gradient-orb-reg orb-reg-2"></div>
        <div className="gradient-orb-reg orb-reg-3"></div>
      </div>

      <div className="register-content">
        <div className="register-card">{children}</div>
      </div>
    </div>
  );
}
