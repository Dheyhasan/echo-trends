import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/iconmonstr-spotify-1.svg";
import { loginWithSpotify } from "../components/auth.js";
import { fetchUserProfile } from "../api/spotify.js";

const Header = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("spotifyAccessToken");
    if (token) {
      fetchUserProfile(token)
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("spotifyAccessToken");
    window.location.href = "/";
  };

  return (
    <header>
      <nav className="bg-white dark:bg-white px-4 py-3">
        <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
          <Link
            to={user ? "/dashboard" : "/"}
            className="flex items-center space-x-2 hover:opacity-80 transition"
          >
            <img src={logo} alt="Spotify Logo" className="h-6 sm:h-9" />
            <span className="text-xl font-semibold text-gray-900 dark:text-gray-900">
              EchoTrends
            </span>
          </Link>

          <div className="relative flex items-center space-x-4">
            {user && (
              <Link
                to="/dashboard"
                className="text-sm font-medium text-gray-900 hover:underline"
              >
                Dashboard
              </Link>
            )}

            {user ? (
              <>
                <img
                  src={user?.images?.[0]?.url}
                  alt="Profile"
                  className="h-8 w-8 rounded-full"
                />
                <button
                  className="text-gray-900 font-bold text-xl"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  ⋮
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-12 bg-white shadow rounded-md border text-sm z-10">
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-left hover:bg-gray-100 w-full"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={loginWithSpotify}
                className="bg-green-500 hover:bg-green-600 text-white font-medium text-sm px-4 py-2 rounded-lg"
              >
                Log in
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
