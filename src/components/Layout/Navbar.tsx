import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Vote, LogOut, Shield, User, Settings } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    logout();
    setTimeout(() => {
      navigate("/login");
      setIsLoggingOut(false);
    }, 300);
  };

  if (!user) return null; // only show navbar if logged in

  return (
    <nav className="w-full bg-primary text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Vote className="h-6 w-6" />
          <span className="font-bold text-lg">VoteSecure</span>
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-4">
          {user.role === "user" && (
            <>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link to="/notfound" className="hover:underline">
                Profile
              </Link>
              <Link to="/notfound" className="hover:underline">
                Voting History
              </Link>
            </>
          )}
          {user.role === "admin" && (
            <Link to="/admin" className="flex items-center space-x-1 hover:underline">
              <Shield className="h-4 w-4" />
              <span>Admin Panel</span>
            </Link>
          )}

          {/* Logout */}
          <Button size="sm" onClick={handleLogout} disabled={isLoggingOut}>
            {isLoggingOut ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </div>
    </nav>
  );
}
