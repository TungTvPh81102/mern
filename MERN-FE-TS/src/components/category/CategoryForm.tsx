import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import slugify from "slugify";

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
import { useContext, useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CategoryContext,
  CategoryContextType,
} from "@/contexts/CategoryContext";
import { Link, useParams } from "react-router-dom";
import api from "@/api";
import { ICategories } from "@/types";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Tên khóa học phải có ít nhất 3 ký tự",
  }),
  slug: z.string().optional(),
  status: z.boolean(),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CategoryForm = () => {
  const { handleSubmit, isSubmit } = useContext(
    CategoryContext
  ) as CategoryContextType;
  const { id } = useParams();
  const form = useForm<ICategories>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      status: true,
    },
  });
  const { setValue, watch } = form;

  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        try {
          const { data } = await api.get(`/categories/${id}`);
          const category = data.data;
          form.reset({
            ...category,
            slug: slugify(category.name, { lower: true, locale: "vi" }),
          });
        } catch (error) {
          console.error(error);
        }
      };
      fetchCategory();
    }
  }, [id, form]);

  const nameValue = watch("name");

  useEffect(() => {
    if (nameValue) {
      const slug = slugify(nameValue, { lower: true, locale: "vi" });
      setValue("slug", slug);
    }
  }, [nameValue, setValue]);

  const onSubmit = (data: ICategories) => {
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
                <FormLabel>Tên danh mục*</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên danh mục..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
        </div>

        <Button
          isLoading={isSubmit}
          disabled={isSubmit}
          className="w-[100px]"
          variant="primary"
          type="submit"
        >
          {id ? "Cập nhật" : "Tạo mới"}
        </Button>
        <Link
          className="rounded-md px-4 py-2 bg-gray-600  text-white ml-2"
          to="/manager/categories"
        >
          Quay lại trang danh sách
        </Link>
      </form>
    </Form>
  );
};

export default CategoryForm;
