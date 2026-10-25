
import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import DataTable from "../components/DataTable"
import Modal from "../components/Modal"

const API_BASE = "http://localhost:5000/api"

export default function ModulePage({
  title,
  description,
  initialData = [],
  columns,
  searchKeys,
  fields,
  addLabel,
  apiEndpoint
}) {
  const [records, setRecords] = useState(initialData)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({})
  const [editingRecord, setEditingRecord] = useState(null)
  const [loading, setLoading] = useState(Boolean(apiEndpoint))
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!apiEndpoint) {
      setRecords(initialData)
      setLoading(false)
      return
    }

    const controller = new AbortController()

    async function fetchRecords() {
      setLoading(true)
      setError("")

      try {
        const response = await fetch(`${API_BASE}${apiEndpoint}`, {
          signal: controller.signal
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.message || "Unable to load records.")
        }

        setRecords(result)
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.")
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchRecords()

    return () => controller.abort()
  }, [apiEndpoint, initialData])

  function openForm() {
    setEditingRecord(null)
    setForm({})
    setError("")
    setModalOpen(true)
  }

  function openEditForm(record) {
    setEditingRecord(record)
    setForm(
      Object.fromEntries(
        fields.map((field) => [
          field.key,
          record[field.key] ?? ""
        ])
      )
    )
    setError("")
    setModalOpen(true)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError("")
    setSaving(true)

    try {
      if (!apiEndpoint) {
        if (editingRecord) {
          setRecords((current) =>
            current.map((record) =>
              record.id === editingRecord.id
                ? { ...record, ...form }
                : record
            )
          )
        } else {
          const newRecord = {
            id: `${title.slice(0, 3).toUpperCase()}-${Date.now()
              .toString()
              .slice(-5)}`,
            ...form
          }

          setRecords((current) => [newRecord, ...current])
        }

        setModalOpen(false)
        setForm({})
        setEditingRecord(null)
        return
      }

      const isEditing = Boolean(editingRecord)
      const url = isEditing
        ? `${API_BASE}${apiEndpoint}/${editingRecord.id}`
        : `${API_BASE}${apiEndpoint}`

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Unable to save record.")
      }

      if (isEditing) {
        setRecords((current) =>
          current.map((record) =>
            record.id === editingRecord.id ? result : record
          )
        )
      } else {
        setRecords((current) => [result, ...current])
      }

      setModalOpen(false)
      setForm({})
      setEditingRecord(null)
    } catch (err) {
      setError(err.message || "Something went wrong.")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(record) {
    const confirmed = window.confirm(
      `Are you sure you want to delete this ${title.toLowerCase()} record?`
    )

    if (!confirmed) return

    setError("")
    setDeletingId(record.id)

    try {
      if (!apiEndpoint) {
        setRecords((current) =>
          current.filter((item) => item.id !== record.id)
        )
        return
      }

      const response = await fetch(
        `${API_BASE}${apiEndpoint}/${record.id}`,
        { method: "DELETE" }
      )

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(result.message || "Unable to delete record.")
      }

      setRecords((current) =>
        current.filter((item) => item.id !== record.id)
      )
    } catch (err) {
      setError(err.message || "Something went wrong.")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm text-[#78918c]">Society management</p>
          <h1 className="mt-1 text-2xl font-bold text-[#183b37]">
            {title}
          </h1>
          <p className="mt-2 text-sm text-[#78918c]">
            {description}
          </p>
        </div>

        <button
          onClick={openForm}
          className="flex items-center gap-2 rounded-xl bg-[#16a995] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#118575]"
        >
          <Plus size={18} />
          {addLabel || "Add Record"}
        </button>
      </div>

      {loading && (
        <p className="text-sm text-[#78918c]" role="status">
          Loading records...
        </p>
      )}

      {error && !modalOpen && (
        <div
          className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          role="alert"
        >
          {error}
          {apiEndpoint && " Check that the backend is running and try again."}
        </div>
      )}

      {!loading && (
        <DataTable
          title={`All ${title.toLowerCase()}`}
          description="Browse and search your society records."
          columns={columns}
          data={records}
          searchKeys={searchKeys}
          onEdit={openEditForm}
          onDelete={handleDelete}
          deletingId={deletingId}
        />
      )}

      {modalOpen && (
        <Modal
          title={
            editingRecord
              ? `Edit ${title.replace(/s$/, "")}`
              : addLabel || `Add ${title}`
          }
          onClose={() => {
            if (!saving) {
              setModalOpen(false)
              setEditingRecord(null)
            }
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.key}>
                <label className="mb-1.5 block text-sm font-medium text-[#53776e]">
                  {field.label}
                </label>

                {field.options ? (
                  <select
                    required={field.required !== false}
                    value={form[field.key] ?? ""}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        [field.key]: event.target.value
                      }))
                    }
                    className="w-full rounded-xl border border-[#dcebe7] bg-white px-3 py-2.5 text-sm text-[#183b37]"
                  >
                    <option value="">
                      Select {field.label.toLowerCase()}
                    </option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    required={field.required !== false}
                    type={field.type || "text"}
                    placeholder={
                      field.placeholder ||
                      `Enter ${field.label.toLowerCase()}`
                    }
                    value={form[field.key] ?? ""}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        [field.key]: event.target.value
                      }))
                    }
                    className="w-full rounded-xl border border-[#dcebe7] bg-white px-3 py-2.5 text-sm text-[#183b37] placeholder:text-[#9aada8]"
                  />
                )}
              </div>
            ))}

            {error && modalOpen && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            <div className="flex justify-end gap-3 border-t border-[#edf3f1] pt-4">
              <button
                type="button"
                disabled={saving}
                onClick={() => {
                  setModalOpen(false)
                  setEditingRecord(null)
                }}
                className="rounded-xl border border-[#dcebe7] px-4 py-2.5 text-sm font-semibold text-[#53776e] hover:bg-[#f5fbfa] disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-[#16a995] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#118575] disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingRecord
                    ? "Update Record"
                    : "Save Record"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
