
import ModulePage from "./ModulePage";
import { staff } from "../data/demoData";

const columns = [
  { key: "id", label: "Staff ID" },
  { key: "name", label: "Staff Name" },
  { key: "role", label: "Designation" },
  { key: "department", label: "Department" },
  { key: "phone", label: "Phone" },
  { key: "status", label: "Status", status: true },
];

export default function Staff() {
  return (
    <ModulePage
      title="Staff"
      description="Manage society staff, departments and contact information."
      initialData={staff}
      columns={columns}
      searchKeys={["id", "name", "role", "department", "phone"]}
      addLabel="Add Staff"
      fields={[
        { key: "name", label: "Full Name" },
        { key: "role", label: "Designation" },
        { key: "department", label: "Department", options: ["Maintenance", "Security", "Cleaning", "Administration"] },
        { key: "phone", label: "Phone Number", type: "tel" },
        { key: "status", label: "Status", options: ["Active", "Inactive"] },
      ]}
    />
  );
}
