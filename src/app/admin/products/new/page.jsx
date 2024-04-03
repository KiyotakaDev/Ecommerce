import FormLayout from "@/components/FormLayout";
import { productFields } from "@/constants";

const AddProduct = () => {
  return (
    <>
      <FormLayout
        formProps={{
          id: "product",
          pTitle: "New Product",
          pMapper: productFields,
        }}
      />
    </>
  );
};

export default AddProduct;
