import { useState, useEffect } from "react"
import { UserCircle } from "lucide-react"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import "./header.css"

const Header = () => {
  const [email, setEmail] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);

        setEmail(decoded.email || "Not Found");
      } catch (err) {
        console.error("Inavlid token", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();

    Navigate("/");
  }
  
  return (
    <header className={`header`}>
      <div className="logo">

      </div>
      <nav className="navigation">
        <ul>
          <li className="slx-profile">
            <span className="profile-icon">
              <UserCircle />
            </span>
            <span className="profile-name">{email}</span>
          </li>
          <li>
            <span className="slx-logout" onClick={handleLogout}>Logout</span>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
