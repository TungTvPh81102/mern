import api from "@/api";
import brandReducer from "@/reducers/brandReducer";
import { IBrands } from "@/types";
import { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export type BrandContextType = {
  state: { brands: IBrands[] };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: React.Dispatch<any>;
  handleSubmit: (brand: IBrands) => void;
  handleRemove: (id: string) => void;
  handleChangeStatus: (id: string, status: boolean) => void;
  isSubmit: boolean;
};

export const BrandContext = createContext({} as BrandContextType);

const BrandProvider = ({ children }: { children: React.ReactNode }) => {
  const nav = useNavigate();
  const [state, dispatch] = useReducer(brandReducer, { brands: [] });
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/brands");
      dispatch({ type: "GET_BRANDS", payload: data.data });
    })();
  }, []);

  const handleSubmit = async (brand: IBrands) => {
    setIsSubmit(true);

    try {
      if (brand._id) {
        const { _id, ...dataUpdate } = brand;
        const { data } = await api.patch(`/brands/${_id}`, dataUpdate);
        dispatch({
          type: "UPDATE_BRANDS",
          payload: data.data,
        });
      } else {
        const { data } = await api.post("/brands", brand);
        dispatch({
          type: "ADD_BRANDS",
          payload: data.data,
        });
      }
      toast.success("Thao tác thành công");
      nav("/manager/brands");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setTimeout(() => {
        setIsSubmit(false);
      }, 1000);
    }
  };

  const handleRemove = async (id: string) => {
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
          api.delete(`/brands/${id}`);
          dispatch({
            type: "REMOVE_BRANDS",
            payload: id,
          });
          toast.success("Thao tác thành công");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatus = async (id: string, status: boolean) => {
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
          const { data } = await api.put(`/brands/${id}/status`, {
            status: !status,
          });
          console.log(data);
          const updateBrand = data.data;

          dispatch({
            type: "CHANGE_STATUS",
            payload: updateBrand,
          });
          toast.success("Cập nhật trạng thái thành công");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BrandContext.Provider
      value={{
        state,
        dispatch,
        handleSubmit,
        handleRemove,
        handleChangeStatus,
        isSubmit,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};

export default BrandProvider;
