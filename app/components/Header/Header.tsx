"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import logo from "@/public/assets/cinemaximum-main.png";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    // Client-side check for localStorage in Next.js
    const userMail = localStorage.getItem("user");
    setUser(userMail ? JSON.parse(userMail) : null);
  }, []);

  const handleSearch = () => {
    setSearch(!search);
  };

  const handleLogout = () => {
    // Perform logout logic here
    // Clear localStorage or perform necessary logout actions
    // For example:
    localStorage.removeItem("user");
    setUser(null);
    router.push("/"); // Redirect to home page after logout
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link href="/">
            <div className="navbar-brand">
              <Image
                src={logo}
                alt={t("Cinemaximum Logo")}
                width={100}
                height={50}
              />
            </div>
          </Link>
          {/* Rest of your navigation */}
          {/* ... */}
          {!search ? (
            <>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link href="/films">
                    <div className="nav-link">{t("Films")}</div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/cinemas">
                    <div className="nav-link">{t("Cinemas")}</div>
                  </Link>
                </li>
              </ul>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="search-icon"
                onClick={handleSearch}
              />
            </>
          ) : (
            <div className="search">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="search-icon-1"
              />
              <input type="text" placeholder={t("Search..")} />
              <FontAwesomeIcon
                icon={faXmark}
                onClick={handleSearch}
                className="search-icon-2"
              />
            </div>
          )}
          {/* User profile/register/login buttons */}
          {user ? (
            <>
              <button
                type="button"
                className="btn cs-header-btn-1"
                onClick={handleLogout}
              >
                {t("Logout")}
              </button>
              <div className="user">{user.name}</div>
            </>
          ) : (
            <Link href="/login">
              <button type="button" className="btn cs-header-btn-2">
                {t("Login")}
              </button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
