
import ModulePage from "./ModulePage";
import { visitors } from "../data/demoData";

const columns = [
  { key: "id", label: "Visitor ID" },
  { key: "name", label: "Visitor Name" },
  { key: "apartment", label: "Visiting Apartment" },
  { key: "purpose", label: "Purpose" },
  { key: "entry", label: "Entry Time" },
  { key: "exit", label: "Exit Time" },
  { key: "status", label: "Status", status: true },
];

export default function Visitors() {
  return (
    <ModulePage
      title="Visitors"
      description="View visitor registrations, entry times and exit records."
      initialData={visitors}
      columns={columns}
      searchKeys={["id", "name", "apartment", "purpose", "status"]}
      addLabel="Register Visitor"
      fields={[
        { key: "name", label: "Visitor Name" },
        { key: "apartment", label: "Visiting Apartment" },
        { key: "purpose", label: "Purpose of Visit" },
        { key: "entry", label: "Entry Time", placeholder: "e.g. 2:30 PM" },
        { key: "exit", label: "Exit Time", required: false, placeholder: "Leave blank if still inside" },
        { key: "status", label: "Status", options: ["Active", "Completed"] },
      ]}
    />
  );
}
