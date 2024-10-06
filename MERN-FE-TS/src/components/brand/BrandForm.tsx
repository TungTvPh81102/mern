import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BrandContext, BrandContextType } from "@/contexts/BrandContext";
import { IBrands } from "@/types";
import api from "@/api";

// const formSchema = z.object({
//   name: z.string().min(3, {
//     message: "Tên khóa học phải có ít nhất 3 ký tự",
//   }),
//   thumbnail: z.instanceof(File, {
//     message: "File không được để trống",
//   }),
//   status: z.boolean(),
// });

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Tên thương hiệu phải có ít nhất 3 ký tự",
  }),
  thumbnail: z
    .string({
      message: "Logo thương hiệu là bắt buộc",
    })
    .url({
      message: "Vui lòng điền đường dẫn ảnh",
    }),
  status: z.boolean(),
});

const BrandForm = () => {
  const { handleSubmit, isSubmit } = useContext(
    BrandContext
  ) as BrandContextType;

  const { id } = useParams();
  const form = useForm<IBrands>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      thumbnail: undefined,
      status: true,
    },
  });

  useEffect(() => {
    if (id) {
      const fetchBrand = async () => {
        try {
          const { data } = await api.get(`/brands/${id}`);
          const brand = data.data;
          form.reset({
            ...brand,
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchBrand();
    }
  }, [id, form]);

  // Handle file input change
  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0]; // Access the first selected file
  //   if (file) {
  //     form.setValue("thumbnail", file); // Update the form value for 'thumbnail'
  //   }
  // };

  const onSubmit = (data: IBrands) => {
    if (id) {
      handleSubmit({ ...data, _id: id });
    } else {
      handleSubmit(data);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-6 mt-10">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên thương hiệu*</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên thương hiệu..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo thương hiệu*</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    className="p-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo thương hiệu*</FormLabel>
                <FormControl>
                  <Input placeholder="Đường dẫn ảnh..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trạng thái</FormLabel>
              <Select
                value={field.value ? "true" : "false"}
                onValueChange={(value) => field.onChange(value === "true")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn trạng thái" {...field} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Inactive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button
          isLoading={isSubmit}
          disabled={isSubmit}
          className="w-[100px]"
          variant="primary"
          type="submit"
        >
          Tạo mới
        </Button>
        <Link
          className="rounded-md px-4 py-2 bg-gray-600 text-white ml-2"
          to="/manager/brands"
        >
          Quay lại trang danh sách
        </Link>
      </form>
    </Form>
  );
};

export default BrandForm;
