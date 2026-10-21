
import ModulePage from "./ModulePage";
import { apartments } from "../data/demoData";

const columns = [
  { key: "apartmentNo", label: "Apartment No." },
  { key: "block", label: "Block" },
  { key: "floor", label: "Floor" },
  { key: "type", label: "Type" },
  { key: "area", label: "Area" },
  { key: "status", label: "Status", status: true },
];

export default function Apartments() {
  return (
    <ModulePage
      title="Apartments"
      description="Manage apartment units, occupancy and property details."
      initialData={apartments}
      columns={columns}
      searchKeys={["apartmentNo", "block", "type", "status"]}
      addLabel="Add Apartment"
      fields={[
        { key: "apartmentNo", label: "Apartment Number" },
        { key: "block", label: "Block" },
        { key: "floor", label: "Floor", type: "number" },
        { key: "type", label: "Apartment Type", options: ["1 BHK", "2 BHK", "3 BHK", "4 BHK"] },
        { key: "area", label: "Area" },
        { key: "status", label: "Status", options: ["Occupied", "Available"] },
      ]}
    />
  );
}
