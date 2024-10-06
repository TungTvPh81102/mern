import { TActiveLinkProps } from "@/types";
import { Link, useLocation } from "react-router-dom";

const ActiveLink = ({ url, children, exact = false }: TActiveLinkProps) => {
  const { pathname } = useLocation();

  const isActive = exact
    ? pathname === url
    : pathname.startsWith(url) && pathname !== `${url}/`;

  return (
    <Link
      to={url}
      className={`p-3 rounded-md flex items-center gap-3 mt-2 transition-all 
    ${
      isActive
        ? "text-white bg-primary svg-animation"
        : "hover:text-primary hover:bg-primary hover:bg-opacity-10"
    }`}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
