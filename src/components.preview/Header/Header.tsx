import { Link, useLocation } from "react-router";

const NAV_LINKS = [
  { name: "Components", href: "/" },
  // { name: "Classes", href: "classes" },
  // { name: "Components", href: "components" },
  { name: "Palettes", href: "/palettes/" },
  // { name: "Contribute", href: "contribute" },
];

const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky left-0 top-0 bg-header w-full backdrop-blur-sm z-50 h-16">
      <Link to="/">
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 cursor-pointer">
          <img
            src="logo64x64.svg"
            alt="Logo"
            className="h-10 w-auto"
          />
        </div>
      </Link>
      <nav className="flex items-center text-primary text-xl max-w-[1400px] mx-auto h-full">
        {NAV_LINKS.map(({ name, href }) => {
          const isActive = location.pathname === href;
          const activeClass = isActive ? "text-white" : "text-gray";

          return (
            <Link
              key={name}
              to={href}
              className={`text-primary py-3 px-6 hover:text-white transition-colors hover:bg-white/5 rounded-lg ${activeClass}`}
            >
              {name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
