import Animation from "@/components/Animation";
import FormLayout from "@/components/form/FormLayout";
import { addProductFields } from "@/constants";

const AddProduct = () => {
  return (
    <Animation>
      <FormLayout
        formProps={{
          id: "products",
          pTitle: "New Product",
          pMapper: addProductFields,
        }}
      />
    </Animation>
  );
};

export default AddProduct;
