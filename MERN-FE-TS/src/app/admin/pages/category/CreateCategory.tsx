import CategoryForm from "@/components/category/CategoryForm";
import Heading from "@/components/typography/Heading";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CreateCategory = () => {
  return (
    <div>
      <Heading>Quản lý danh mục</Heading>
      <CategoryForm />
    </div>
  );
};

export default CreateCategory;
