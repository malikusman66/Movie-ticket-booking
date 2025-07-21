import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { MenuIcon, SearchIcon, XIcon, TicketPlus } from "lucide-react";
import { UserButton, useClerk, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { user } = useUser();
  const { openSignIn } = useClerk();

  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.25rem 1.5rem",
      }}
    >
      <Link style={{ flex: isMobile ? 1 : "unset" }}>
        <img src={logo} alt="" style={{ width: "9rem", height: "auto" }} />
      </Link>

      {/* Desktop Nav */}
      {!isMobile && (
        <div
          style={{
            display: "flex",
            backgroundColor: "#1a1a1a",
            borderRadius: "9999px",
            padding: "0.5rem 1rem",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <Link style={linkStyle} to="/">
            Home
          </Link>
          <Link style={linkStyle} to="/movies">
            Movies
          </Link>
          <Link style={linkStyle} to="/">
            Theaters
          </Link>
          <Link style={linkStyle} to="/">
            Releases
          </Link>
          <Link style={linkStyle} to="/favorite">
            Favorites
          </Link>
        </div>
      )}

      {/* Right icons */}
      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <SearchIcon
            style={{
              width: "1.5rem",
              height: "1.5rem",
              cursor: "pointer",
              marginTop: "1rem",
            }}
          />
          {!user ? (
            <button
              onClick={openSignIn}
              style={{
                marginTop: "0.5rem",
                padding: "0.5rem 1.5rem",
                backgroundColor: "#FF5722",
                border: "none",
                borderRadius: "9999px",
                cursor: "pointer",
                fontWeight: "500",
                color: "#fff",
              }}
            >
              Login
            </button>
          ) : (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<TicketPlus width={15} />}
                  onClick={() => navigate("/my-bookings")}
                />
              </UserButton.MenuItems>
            </UserButton>
          )}
        </div>
      )}

      {/* Mobile Menu toggle */}
      {isMobile && (
        <>
          {menuOpen ? (
            <XIcon
              onClick={() => setMenuOpen(false)}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                width: "1.5rem",
                height: "1.5rem",
                cursor: "pointer",
              }}
            />
          ) : (
            <MenuIcon
              onClick={() => setMenuOpen(true)}
              style={{
                marginLeft: "1rem",
                width: "2rem",
                height: "2rem",
                cursor: "pointer",
              }}
            />
          )}
        </>
      )}

      {/* Mobile Nav */}
      {isMobile && menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "4rem",
            left: 0,
            right: 0,
            backgroundColor: "#1a1a1a",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            borderRadius: "0 0 1rem 1rem",
          }}
        >
          <Link style={linkStyle} to="/">
            Home
          </Link>
          <Link style={linkStyle} to="/movies">
            Movies
          </Link>
          <Link style={linkStyle} to="/">
            Theaters
          </Link>
          <Link style={linkStyle} to="/">
            Releases
          </Link>
          <Link style={linkStyle} to="/favorite">
            Favorites
          </Link>

          <SearchIcon
            style={{
              width: "1.5rem",
              height: "1.5rem",
              cursor: "pointer",
              marginTop: "1rem",
            }}
          />

          <button
            style={{
              marginTop: "0.5rem",
              padding: "0.5rem 1.5rem",
              backgroundColor: "#FF5722",
              border: "none",
              borderRadius: "9999px",
              cursor: "pointer",
              fontWeight: "500",
              color: "#fff",
            }}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

// Shared link style
const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "500",
};

export default Navbar;
