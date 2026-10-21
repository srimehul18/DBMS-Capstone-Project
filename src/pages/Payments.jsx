
import ModulePage from "./ModulePage";
import { payments } from "../data/demoData";

const columns = [
  { key: "id", label: "Payment ID" },
  { key: "resident", label: "Resident" },
  { key: "billId", label: "Bill ID" },
  { key: "date", label: "Payment Date" },
  { key: "amount", label: "Amount" },
  { key: "method", label: "Method" },
  { key: "status", label: "Status", status: true },
];

export default function Payments() {
  return (
    <ModulePage
      title="Payments"
      description="Review payment records, methods and transaction statuses."
      initialData={payments}
      columns={columns}
      searchKeys={["id", "resident", "billId", "method", "status"]}
      addLabel="Record Payment"
      fields={[
        { key: "resident", label: "Resident Name" },
        { key: "billId", label: "Bill ID" },
        { key: "date", label: "Payment Date", placeholder: "e.g. 21 Oct 2026" },
        { key: "amount", label: "Amount" },
        { key: "method", label: "Payment Method", options: ["UPI", "Cash", "Bank Transfer", "Card"] },
        { key: "status", label: "Status", options: ["Paid", "Pending"] },
      ]}
    />
  );
}
