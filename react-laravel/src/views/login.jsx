import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form>
          <h1 className="title">Login into your account</h1>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="btn btn-block">Login</button>
          <p className="message">
            Not registered? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
