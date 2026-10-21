
import ModulePage from "./ModulePage";
import { parking } from "../data/demoData";

const columns = [
  { key: "slot", label: "Parking Slot" },
  { key: "location", label: "Location" },
  { key: "vehicle", label: "Vehicle Number" },
  { key: "resident", label: "Resident" },
  { key: "type", label: "Vehicle Type" },
  { key: "status", label: "Status", status: true },
];

export default function Parking() {
  return (
    <ModulePage
      title="Parking"
      description="View parking slots, vehicle assignments and availability."
      initialData={parking}
      columns={columns}
      searchKeys={["slot", "location", "vehicle", "resident", "type", "status"]}
      addLabel="Add Parking Slot"
      fields={[
        { key: "slot", label: "Slot Number" },
        { key: "location", label: "Location" },
        { key: "vehicle", label: "Vehicle Number", required: false },
        { key: "resident", label: "Resident Name", required: false },
        { key: "type", label: "Vehicle Type", options: ["Car", "Bike", "Other"] },
        { key: "status", label: "Status", options: ["Available", "Occupied"] },
      ]}
    />
  );
}
