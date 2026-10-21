
import ModulePage from "./ModulePage";
import { amenities } from "../data/demoData";

const columns = [
  { key: "id", label: "Amenity ID" },
  { key: "name", label: "Amenity Name" },
  { key: "location", label: "Location" },
  { key: "capacity", label: "Capacity" },
  { key: "fee", label: "Booking Fee" },
  { key: "status", label: "Status", status: true },
];

export default function Amenities() {
  return (
    <ModulePage
      title="Amenities"
      description="Manage community facilities, capacities and booking availability."
      initialData={amenities}
      columns={columns}
      searchKeys={["id", "name", "location", "status"]}
      addLabel="Add Amenity"
      fields={[
        { key: "name", label: "Amenity Name" },
        { key: "location", label: "Location" },
        { key: "capacity", label: "Capacity", type: "number" },
        { key: "fee", label: "Booking Fee" },
        { key: "status", label: "Status", options: ["Available", "Reserved", "Under Maintenance"] },
      ]}
    />
  );
}
