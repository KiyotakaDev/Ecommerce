import FormLayout from "@/components/FormLayout";
import { addProductFields } from "@/constants";

const AddProduct = () => {
  return (
    <>
      <FormLayout
        formProps={{
          id: "products",
          pTitle: "New Product",
          pMapper: addProductFields,
        }}
      />
    </>
  );
};

export default AddProduct;
