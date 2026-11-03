
import ModulePage from "./ModulePage"

const columns = [
  { key: "id", label: "Complaint ID" },
  { key: "resident", label: "Resident" },
  { key: "title", label: "Complaint Title" },
  { key: "category", label: "Category" },
  { key: "priority", label: "Priority", status: true },
  { key: "status", label: "Status", status: true },
  { key: "assignedStaff", label: "Assigned Staff" }
]

export default function Complaints({ role, resident }) {
  const isResident = role === "Resident"

  const fields = [
    ...(!isResident
      ? [
          {
            key: "residentId",
            label: "Resident ID",
            type: "number",
            placeholder: "Enter an existing resident ID"
          }
        ]
      : []),
    ...(!isResident
      ? [
          {
            key: "staffId",
            label: "Assigned Staff ID (optional)",
            type: "number",
            required: false,
            placeholder: "Leave blank if unassigned"
          }
        ]
      : []),
    {
      key: "title",
      label: "Complaint Title",
      placeholder: "Enter complaint title"
    },
    {
      key: "description",
      label: "Description",
      placeholder: "Describe the complaint",
      required: false
    },
    {
      key: "category",
      label: "Category",
      options: [
        "Plumbing",
        "Electrical",
        "Cleaning",
        "Security",
        "Maintenance",
        "Other"
      ]
    },
    ...(!isResident
      ? [
          {
            key: "priority",
            label: "Priority",
            options: ["Low", "Medium", "High"]
          },
          {
            key: "status",
            label: "Status",
            options: [
              "Open",
              "In Progress",
              "Resolved",
              "Closed"
            ]
          }
        ]
      : [])
  ]

  return (
    <ModulePage
      title="Complaints"
      description="Track resident complaints, priorities, and resolution status."
      initialData={[]}
      columns={columns}
      searchKeys={[
        "id",
        "resident",
        "title",
        "category",
        "priority",
        "status",
        "assignedStaff"
      ]}
      addLabel="Add Complaint"
      apiEndpoint="/complaints"
      role={role}
      resident={resident}
      allowAdd={role === "Secretary" || isResident}
      allowEdit={role === "Secretary" || role === "Staff"}
      allowDelete={role === "Secretary"}
      fields={fields}
    />
  )
}
