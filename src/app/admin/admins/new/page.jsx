import FormLayout from "@/components/FormLayout";
import { addAdminFields } from "@/constants";

const AddAdmin = () => {
  return (
    <>
      <FormLayout
        formProps={{
          id: "admins",
          pTitle: "New Admin",
          pMapper: addAdminFields,
        }}
      />
    </>
  );
};

export default AddAdmin;
