
import { useEffect, useState } from "react"
import ModulePage from "./ModulePage"

const API_BASE = "http://localhost:5000/api"

const columns = [
  { key: "id", label: "Bill ID" },
  { key: "apartment", label: "Apartment" },
  { key: "resident", label: "Resident" },
  { key: "month", label: "Billing Month" },
  { key: "amount", label: "Bill Amount" },
  { key: "lateFee", label: "Late Fee" },
  { key: "totalPaid", label: "Total Paid" },
  { key: "outstandingBalance", label: "Outstanding Balance" },
  { key: "overpaymentAmount", label: "Overpayment" },
  { key: "dueDate", label: "Due Date", date: true },
  { key: "status", label: "Calculated Status", status: true }
]

const getApartmentId = (apartment) =>
  apartment.id ?? apartment.apartmentId ?? apartment.apartment_id

const getResidentApartmentId = (resident) =>
  resident.apartmentId ?? resident.apartment_id

const getApartmentLabel = (apartment) =>
  apartment.apartmentNumber ??
  apartment.apartmentNo ??
  apartment.flatNumber ??
  apartment.flat_no ??
  apartment.name ??
  `Apartment ${getApartmentId(apartment)}`

const createMonthOptions = () => {
  const options = []
  const currentDate = new Date()
  currentDate.setDate(1)

  for (let offset = -6; offset <= 6; offset++) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + offset,
      1
    )

    const value = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0")
    ].join("-")

    const label = date.toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric"
    })

    options.push({ label, value })
  }

  return options
}

export default function Maintenance({ role, resident }) {
  const isSecretary = role === "Secretary"

  const [apartments, setApartments] = useState([])
  const [residents, setResidents] = useState([])
  const [apartmentError, setApartmentError] = useState("")

  useEffect(() => {
    if (!isSecretary) return

    const fetchDropdownData = async () => {
      try {
        const [apartmentResponse, residentResponse] = await Promise.all([
          fetch(`${API_BASE}/apartments`),
          fetch(`${API_BASE}/residents`)
        ])

        const apartmentData = await apartmentResponse.json()
        const residentData = await residentResponse.json()

        if (!apartmentResponse.ok) {
          throw new Error("Unable to load apartments.")
        }

        if (!residentResponse.ok) {
          throw new Error("Unable to load residents.")
        }

        setApartments(
          Array.isArray(apartmentData) ? apartmentData : []
        )

        setResidents(
          Array.isArray(residentData) ? residentData : []
        )

        setApartmentError("")
      } catch (error) {
        setApartmentError(
          error.message || "Unable to load apartment information."
        )
      }
    }

    fetchDropdownData()
  }, [isSecretary])


const apartmentOptions = apartments.map((apartment) => {
  const apartmentId = getApartmentId(apartment)

  const apartmentResidents = residents.filter(
    (item) =>
      String(item.apartment).trim().toLowerCase() ===
      String(apartment.apartment).trim().toLowerCase()
  )

  const residentNames = apartmentResidents
    .map((item) => item.name)
    .filter(Boolean)

  const residentLabel = residentNames.length
    ? residentNames.join(", ")
    : "No resident listed"

  return {
    label: `${apartment.apartment} (ID: ${apartmentId}) — ${residentLabel}`,
    value: String(apartmentId)
  }
})


  const fields = [
    {
      key: "apartmentId",
      label: "Apartment — Resident",
      options: apartmentOptions,
      placeholder: "Select an apartment"
    },
    {
      key: "month",
      label: "Billing Month",
      options: createMonthOptions(),
      placeholder: "Select billing month"
    },
    {
      key: "amount",
      label: "Bill Amount",
      type: "number",
      placeholder: "Enter maintenance amount"
    }
  ]

  return (
    <div>
      {apartmentError && (
        <p className="mb-3 text-sm text-red-600" role="alert">
          {apartmentError}
        </p>
      )}

      <ModulePage
        title="Maintenance"
        description="Track monthly maintenance bills, payments and outstanding dues."
        apiEndpoint="/maintenance"
        columns={columns}
        searchKeys={[
          "id",
          "apartment",
          "resident",
          "month",
          "status"
        ]}
        addLabel="Generate Bill"
        role={role}
        resident={resident}
        allowAdd={isSecretary}
        allowEdit={isSecretary}
        allowDelete={isSecretary}
        fields={fields}
      />
    </div>
  )
}
