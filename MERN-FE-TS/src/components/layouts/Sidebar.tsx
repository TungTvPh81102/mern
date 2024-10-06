import ActiveLink from "../common/ActiveLink";
import {
  IconBar,
  IconComment,
  IconOrder,
  IconSetting,
  IconUser,
} from "../icons";
import { ModeToggle } from "../common/ModeToggle";
import { useContext } from "react";
import { AuthContext, AuthContextType } from "@/contexts/AuthContext";
import { ImenuItem } from "@/types";

const menuItems: ImenuItem[] = [
  {
    url: "/manager",
    title: "Dashboard",
    icon: <IconBar />,
  },
  {
    url: "/manager/categories",
    title: "Quản lý danh mục",
    icon: <IconBar />,
  },
  {
    url: "/manager/brands",
    title: "Quản lý thương hiệu",
    icon: <IconBar />,
  },
  {
    url: "/manager/products",
    title: "Quản lý sản phẩm",
    icon: <IconBar />,
  },
  {
    url: "/manager/users",
    title: "Quản lý thành viên",
    icon: <IconUser />,
  },
  {
    url: "/manager/orders",
    title: "Quản lý đơn hàng",
    icon: <IconOrder />,
  },
  {
    url: "/manager/comments",
    title: "Quản lý bình luận",
    icon: <IconComment />,
  },
  {
    url: "/manager/settings",
    title: "Quản lý cài đặt",
    icon: <IconSetting />,
  },
];

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext) as AuthContextType;

  return (
    <div className="p-5 border-r border-r-gray-200 dark:bg-grayDarkest dark:border-r-gray-600 bg-white flex flex-col">
      <a href="" className="font-bold text-3xl inline-block mb-5">
        <span className="text-primary font-bold">T</span>
        he Ciu Store
      </a>
      <ul>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            url={item.url}
            title={item.title}
            icon={item.icon}
          />
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-end gap-5">
        <ModeToggle />
        {user && (
          <>
            <button
              onClick={logout}
              className="size-10 rounded-lg bg-primary text-white flex items-center justify-center"
            >
              <IconUser />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

function MenuItem({ url = "", title = "", icon }: ImenuItem) {
  return (
    <li>
      <ActiveLink url={url} exact={url === "/manager"}>
        {icon}
        {title}
      </ActiveLink>
    </li>
  );
}

export default Sidebar;
