import { Link } from "react-router-dom";
import { IconEye, IconStar } from "@/components/icons";

const courseInfo = [
  {
    title: "5.0",
    icon: <IconStar />,
  },
  {
    title: "5000",
    icon: <IconEye />,
  },
];

const CourseItem = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl dark:bg-grayDarkest  dark:border-gray-700">
      <Link to="" className="block h-[180px] relative">
        <img
          alt=""
          className="w-full h-full object-cover rounded-lg "
          width={300}
          height={200}
          src="https://images.unsplash.com/photo-1488751045188-3c55bbf9a3fa?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y291cnNlfGVufDB8fDB8fHww"
          sizes="@media (min-width: 640px) 380px 100vw"
        />
        <span className="inline-block px-3 py-1 rounded-full absolute top-3 right-3 z-10 text-white font-me bg-green-500 text-xs">
          New
        </span>
      </Link>
      <div className=" p-4 ">
        <h3 className="font-bold text-lg mb-3 w-full">
          Khóa học NextJS Pro - Xây dựng E-Learning system hoàn chỉnh
        </h3>
        <div className="flex items-center gap-3 mb-5 text-xs text-gray-500 dark:text-gray-300">
          {courseInfo.map((item, index) => (
            <div
              className="flex items-center gap-2 text-base font-bold"
              key={index}
            >
              {item.icon}
              <span>{item.title}</span>
            </div>
          ))}
          <span className="font-bold text-secondary ml-auto text-base">
            799.000
          </span>
        </div>
        <Link
          to="#"
          className="flex items-center justify-center w-full bg-primary rounded-lg text-white font-semibold h-10"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default CourseItem;
