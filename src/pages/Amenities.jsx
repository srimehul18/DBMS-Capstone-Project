
import ModulePage from "./ModulePage"

const columns = [
  { key: "id", label: "Amenity ID" },
  { key: "name", label: "Amenity Name" },
  { key: "location", label: "Location" },
  { key: "capacity", label: "Capacity" },
  { key: "fee", label: "Booking Fee" },
  { key: "status", label: "Status", status: true }
]

export default function Amenities() {
  return (
    <ModulePage
      title="Amenities"
      description="Manage community facilities, capacities and booking availability."
      initialData={[]}
      apiEndpoint="/amenities"
      columns={columns}
      searchKeys={["id", "name", "location", "status"]}
      addLabel="Add Amenity"
      fields={[
        {
          key: "name",
          label: "Amenity Name"
        },
        {
          key: "description",
          label: "Description"
        },
        {
          key: "location",
          label: "Location"
        },
        {
          key: "capacity",
          label: "Capacity",
          type: "number"
        },
        {
          key: "fee",
          label: "Booking Fee",
          type: "number"
        },
        {
          key: "status",
          label: "Status",
          options: [
            "Available",
            "Unavailable",
            "Under Maintenance"
          ]
        }
      ]}
    />
  )
}
