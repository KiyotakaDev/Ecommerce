import FormLayout from "@/components/FormLayout";
import { addAdminFields } from "@/constants";

const AddProduct = () => {
  return (
    <>
      <FormLayout
        formProps={{
          id: "products",
          pTitle: "New Product",
          pMapper: addAdminFields,
        }}
      />
    </>
  );
};

export default AddProduct;
