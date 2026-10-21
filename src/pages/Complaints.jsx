
import ModulePage from "./ModulePage";
import { complaints } from "../data/demoData";

const columns = [
  { key: "id", label: "Complaint ID" },
  { key: "title", label: "Issue" },
  { key: "apartment", label: "Apartment" },
  { key: "category", label: "Category" },
  { key: "priority", label: "Priority", status: true },
  { key: "assignedTo", label: "Assigned Staff" },
  { key: "status", label: "Status", status: true },
];

export default function Complaints() {
  return (
    <ModulePage
      title="Complaints"
      description="Monitor resident complaints, priorities and resolution progress."
      initialData={complaints}
      columns={columns}
      searchKeys={["id", "title", "apartment", "category", "assignedTo", "status"]}
      addLabel="Add Complaint"
      fields={[
        { key: "title", label: "Complaint Title" },
        { key: "apartment", label: "Apartment Number" },
        { key: "category", label: "Category", options: ["Plumbing", "Electrical", "Cleaning", "Security", "Other"] },
        { key: "priority", label: "Priority", options: ["Low", "Medium", "High"] },
        { key: "assignedTo", label: "Assigned Staff" },
        { key: "status", label: "Status", options: ["Open", "In Progress", "Resolved"] },
      ]}
    />
  );
}
