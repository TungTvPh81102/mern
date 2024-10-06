import BrandForm from "@/components/brand/BrandForm";
import Heading from "@/components/typography/Heading";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CreateBrand = () => {
  return (
    <div>
      <Heading>Quản lý thương hiệu</Heading>
      <BrandForm />
    </div>
  );
};

export default CreateBrand;
