import FormLayout from "@/components/FormLayout";
import { registerFields } from "@/constants";

const AddAdmin = () => {
  return (
    <>
      <FormLayout
        formProps={{
          id: "register",
          pTitle: "New Admin",
          pMapper: registerFields,
        }}
      />
    </>
  );
};

export default AddAdmin;
