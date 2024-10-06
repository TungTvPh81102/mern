import api from "@/api";
import cateogryReducer from "@/reducers/categoryReducer";
import { ICategories } from "@/types";
import { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export type CategoryContextType = {
  state: { categories: ICategories[] };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: React.Dispatch<any>;
  handleRemove: (id: string | undefined) => void;
  handleChangeStatus: (id: string | undefined, status: boolean) => void;
  handleSubmit: (category: ICategories) => void;
  isSubmit: boolean;
};

export const CategoryContext = createContext({} as CategoryContextType);

const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const nav = useNavigate();
  const [state, dispatch] = useReducer(cateogryReducer, { categories: [] });
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    (async () => {
      const { data } = await api.get("/categories");
      dispatch({
        type: "GET_CATEGORIES",
        payload: data.data,
      });
    })();
  }, []);

  const handleSubmit = async (category: ICategories) => {
    setIsSubmit(true);
    try {
      if (category._id) {
        const { _id, ...dataUpdate } = category;
        const { data } = await api.patch(`/categories/${_id}`, dataUpdate);
        dispatch({
          type: "UPDATE_CATEGORY",
          payload: data.data,
        });
      } else {
        const { data } = await api.post("/categories", category);
        dispatch({
          type: "ADD_CATEGORY",
          payload: data.data,
        });
      }
      toast.success("Thao tác thành công");
      nav("/manager/categories");
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setTimeout(() => {
        setIsSubmit(false);
      }, 1000);
    }
  };

  const handleRemove = async (id: string | undefined) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          api.delete(`/categories/${id}`);
          dispatch({
            type: "REMOVE_CATEGORY",
            payload: id,
          });
          toast.success("Thao tác thành công");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatus = async (
    id: string | undefined,
    status: boolean
  ) => {
    try {
      Swal.fire({
        title: "Are update status?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await api.put(`/categories/${id}/status`, {
            status: !status,
          });
          console.log(data);
          const updatedCategory = data.data;

          dispatch({
            type: "CHANGE_STATUS",
            payload: updatedCategory,
          });
          toast.success("Cập nhật trạng thái thành công");
        }
      });
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui loại thực hiện");
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        state,
        dispatch,
        handleRemove,
        handleChangeStatus,
        handleSubmit,
        isSubmit,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
