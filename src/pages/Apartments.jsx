
import ModulePage from "./ModulePage"

const columns = [
  { key: "id", label: "Apartment ID" },
  { key: "apartment", label: "Apartment Number" },
  { key: "block", label: "Block" },
  { key: "floor", label: "Floor" },
  { key: "type", label: "Type" },
  { key: "area", label: "Area (sq. ft.)" },
  { key: "status", label: "Status", status: true }
]

export default function Apartments() {
  return (
    <ModulePage
      title="Apartments"
      description="Manage apartment details, occupancy, and property information."
      initialData={[]}
      columns={columns}
      searchKeys={["apartment", "block", "type", "status"]}
      addLabel="Add Apartment"
      apiEndpoint="/apartments"
      fields={[
        {
          key: "apartment",
          label: "Apartment Number",
          placeholder: "e.g. C-301"
        },
        {
          key: "block",
          label: "Block",
          placeholder: "e.g. C"
        },
        {
          key: "floor",
          label: "Floor",
          type: "number"
        },
        {
          key: "type",
          label: "Apartment Type",
          options: ["1 BHK", "2 BHK", "3 BHK", "4 BHK"]
        },
        {
          key: "area",
          label: "Area (sq. ft.)",
          type: "number",
          required: false
        },
        {
          key: "status",
          label: "Status",
          options: [
            "Occupied",
            "Vacant",
            "Under Maintenance"
          ]
        }
      ]}
    />
  )
}
