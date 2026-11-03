
import { useEffect, useState } from "react"
import ModulePage from "./ModulePage"

const API_BASE = "http://localhost:5000/api"

const columns = [
  { key: "id", label: "Booking ID" },
  { key: "resident", label: "Resident" },
  { key: "amenity", label: "Amenity" },
  { key: "startTime", label: "Start Time" },
  { key: "endTime", label: "End Time" },
  { key: "purpose", label: "Purpose" },
  { key: "amountPaid", label: "Amount Paid" },
  { key: "status", label: "Status", status: true }
]

export default function AmenityBookings({ role, resident }) {
  const [amenities, setAmenities] = useState([])
  const [amenityError, setAmenityError] = useState("")

  const isResident = role === "Resident"
  const isSecretary = role === "Secretary"

  useEffect(() => {
    async function fetchAmenities() {
      try {
        const response = await fetch(`${API_BASE}/amenities`)
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.message || "Unable to load amenities.")
        }

        const availableAmenities = (Array.isArray(result) ? result : [])
          .filter(
            (amenity) =>
              String(amenity.status).toLowerCase() === "available"
          )
          .map((amenity) => ({
            label: `${amenity.name} (ID: ${amenity.id})`,
            value: String(amenity.id)
          }))

        setAmenities(availableAmenities)
        setAmenityError("")
      } catch (error) {
        setAmenityError(error.message || "Unable to load amenities.")
      }
    }

    fetchAmenities()
  }, [])

  const fields = [
    ...(!isResident
      ? [
          {
            key: "residentId",
            label: "Resident ID",
            type: "number",
            placeholder: "Enter an existing Resident ID"
          }
        ]
      : []),
    {
      key: "amenityId",
      label: "Available Amenity",
      options: amenities,
      placeholder: "Select an available amenity"
    },
    {
      key: "startTime",
      label: "Start Date and Time",
      dateTime: true
    },
    {
      key: "endTime",
      label: "End Date and Time",
      dateTime: true
    },
    {
      key: "purpose",
      label: "Purpose",
      placeholder: "Enter booking purpose"
    },
    {
      key: "amountPaid",
      label: "Amount Paid",
      type: "number",
      required: false,
      placeholder: "Enter amount paid"
    },
    {
      key: "status",
      label: "Booking Status",
      options: ["Pending", "Confirmed", "Completed", "Cancelled"]
    }
  ]

  return (
    <div>
      {amenityError && (
        <p className="mb-3 text-sm text-red-600" role="alert">
          {amenityError}
        </p>
      )}

      <ModulePage
        title="Amenity Bookings"
        description="Manage amenity reservations, booking times and payment records."
        apiEndpoint="/amenity-bookings"
        columns={columns}
        searchKeys={[
          "id",
          "resident",
          "amenity",
          "purpose",
          "status"
        ]}
        addLabel="Add Booking"
        fields={fields}
        role={role}
        resident={resident}
        allowAdd={isSecretary || isResident}
        allowEdit={isSecretary || isResident}
        allowDelete={isSecretary || isResident}
      />
    </div>
  )
}
