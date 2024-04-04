import Animation from "@/components/Animation";
import FormLayout from "@/components/FormLayout";
import { addAdminFields } from "@/constants";

const AddAdmin = () => {
  return (
    <Animation>
      <FormLayout
        formProps={{
          id: "admins",
          pTitle: "New Admin",
          pMapper: addAdminFields,
        }}
      />
    </Animation>
  );
};

export default AddAdmin;
