import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import GoogleFontLoader from "react-google-font-loader";
import { useEffect, useRef } from "react";
import Timer from "./Timer";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const headerRef = useRef([]);
  const snackRef = useRef([]);
  const trackRef = useRef([]);
  const stRef = useRef([]);
  const snackChildrenRef = useRef([]);
  const trackChildrenRef = useRef([]);
  const { pathname } = useLocation();

  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      const scroll = window.scrollY;
      const x = window.innerWidth / 2;
      const position = scroll / 3;
      const height = 75 - scroll / 10;

      snackRef.current.style.left = `${position}px`;
      trackRef.current.style.right = `${position}px`;

      if (height >= 55) {
        headerRef.current.style.height = `${height}px`;
      }

      for (const child of snackChildrenRef.current) {
        const childPosition = child.getBoundingClientRect();

        child.style.opacity = childPosition.x > x - 10 ? "0" : "1";
      }

      for (const child of trackChildrenRef.current) {
        const childPosition = child.getBoundingClientRect();

        child.style.opacity = childPosition.x < x ? "0" : "1";
      }
    };

    const handleAnimationFrame = () => {
      handleScroll();
      animationFrameId = window.requestAnimationFrame(handleAnimationFrame);
    };

    snackChildrenRef.current = [...snackRef.current.children];
    trackChildrenRef.current = [...trackRef.current.children];

    animationFrameId = window.requestAnimationFrame(handleAnimationFrame);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleClick = () => {
    logout();
  };

  const handleLogo = () => {
    if (pathname === "/") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-center py-0 bg-black"
      ref={headerRef}
    >
      <GoogleFontLoader
        fonts={[
          {
            font: "Bebas Neue",
            weights: [400, 700],
          },
          {
            font: "Oswald",
            weights: [300, 400, 500],
          },
        ]}
      />

      <div>
        <Link to="/" onClick={handleLogo}>
          <h1
            className="text-5xl text-white"
            style={{ fontFamily: "'Bebas Neue', sans-serif", marginTop: "5px" }}
            ref={stRef}
          >
            <div ref={snackRef} className="relative z-40 inline-block snack">
              <span>S</span>
              <span>N</span>
              <span>A</span>
              <span>C</span>
              <span>K</span>
            </div>
            <span className="relative z-50 inline-block bg-black st">
              S&amp;T
            </span>
            <div ref={trackRef} className="relative z-40 inline-block">
              <span>R</span>
              <span>A</span>
              <span>C</span>
              <span>K</span>
              <span>S</span>
            </div>
          </h1>
        </Link>
      </div>
      <nav className="absolute right-4" id="user">
        {user && (
          <div>
            <button
              onClick={handleClick}
              className="inline-block px-4 py-2 text-white hover:text-gray-200 hover:underline"
            >
              Log out
            </button>
          </div>
        )}
        {!user && (
          <div>
            <Link
              to="/login"
              className="inline-block px-4 py-2 text-white hover:text-gray-200 hover:underline"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="inline-block px-4 py-2 text-white hover:text-gray-200"
            >
              Register
            </Link>
          </div>
        )}
      </nav>
      <div
        style={{ gridTemplateColumns: "max-content auto" }}
        className="absolute grid justify-between w-full h-10 px-2 bg-white -bottom-10 grid-cols-max-content-auto place-items-center"
      >
        <nav className="block" id="links">
          <ul className="flex list-none font-['Oswald'] uppercase font-medium text-lg">
            <li className="px-2">
              <Link to="/">Blog</Link>
            </li>
            <li>
              <Link to="/recommended">Recommended</Link>
            </li>
          </ul>
        </nav>
        <div className="" id="search">
          <form onSubmit="" className="flex h-8 ">
            <input
              type="text"
              value="placeholder"
              onChange="placeholder"
              placeholder="Search..."
              className="w-64 p-2 border border-black pl-7"
            />
            <svg className="absolute" focusable="false" viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg" data-testid="iconSearch"><title>Search</title><path d="M14.5 10a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm5.249 8.335l4.458 4.458-1.414 1.414-4.458-4.458a6.5 6.5 0 1 1 1.414-1.414z" fill-rule="nonzero"></path></svg>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
