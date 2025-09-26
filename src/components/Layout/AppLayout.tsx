import { useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "./Navbar";
import MainNavbar from "./MainNavbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  const isPublicPage = ["/", "/login", "/signup", "/notfound"].includes(
    location.pathname.toLowerCase()
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Show Navbar if logged in, else MainNavbar on public pages */}
      {user ? <Navbar /> : isPublicPage && <MainNavbar />}

      {/* Page content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
