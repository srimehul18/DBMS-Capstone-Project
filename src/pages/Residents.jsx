import ModulePage from "./ModulePage";
import { residents } from "../data/demoData";

const columns = [
  { key: "id", label: "Resident ID" },
  { key: "name", label: "Resident Name" },
  { key: "apartment", label: "Apartment" },
  { key: "phone", label: "Phone" },
  { key: "role", label: "Role", status: true },
  { key: "status", label: "Status", status: true },
];

export default function Residents() {
  return (
    <ModulePage
      title="Residents"
      description="Maintain resident contact details and apartment assignments."
      initialData={residents}
      columns={columns}
      searchKeys={["name", "apartment", "phone", "email", "role"]}
      addLabel="Add Resident"
      apiEndpoint="/residents"
      fields={[
        { key: "name", label: "Full Name" },
        { key: "apartment", label: "Apartment Number" },
        { key: "phone", label: "Phone Number", type: "tel" },
        { key: "email", label: "Email", type: "email", required: false },
        { key: "role", label: "Resident Role", options: ["Owner", "Tenant"] },
        { key: "status", label: "Status", options: ["Active", "Inactive"] },
      ]}
    />
  );
}