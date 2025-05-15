import { PlusCircle, BarChart3, Link } from "lucide-react"
import "./Sidebar.css"

const Sidebar = ({setActivePage}) => {
  // Sidebar menu items
  const menuItems = [
    { icon: <PlusCircle />, tooltip: "Create", page: "create" },
    { icon: <Link />, tooltip: "Connection", page: "connection" },
    { icon: <BarChart3 />, tooltip: "Analytics", page: "analytics" },
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">X</span>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item" data-tooltip={item.tooltip} onClick={() => setActivePage(item.page)}>
            <div className="menu-icon">{item.icon}</div>
          </div>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
