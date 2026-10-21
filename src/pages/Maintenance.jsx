
import ModulePage from "./ModulePage";
import { maintenance } from "../data/demoData";

const columns = [
  { key: "id", label: "Bill ID" },
  { key: "apartment", label: "Apartment" },
  { key: "resident", label: "Resident" },
  { key: "month", label: "Billing Month" },
  { key: "amount", label: "Amount" },
  { key: "dueDate", label: "Due Date" },
  { key: "status", label: "Status", status: true },
];

export default function Maintenance() {
  return (
    <ModulePage
      title="Maintenance"
      description="Track monthly maintenance bills and outstanding dues."
      initialData={maintenance}
      columns={columns}
      searchKeys={["id", "apartment", "resident", "month", "status"]}
      addLabel="Generate Bill"
      fields={[
        { key: "apartment", label: "Apartment Number" },
        { key: "resident", label: "Resident Name" },
        { key: "month", label: "Billing Month" },
        { key: "amount", label: "Amount" },
        { key: "dueDate", label: "Due Date" },
        { key: "status", label: "Payment Status", options: ["Pending", "Paid", "Overdue"] },
      ]}
    />
  );
}
