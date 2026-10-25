
import { Search, Plus, Inbox, Pencil, Trash2 } from "lucide-react"
import { useMemo, useState } from "react"
import StatusBadge from "./StatusBadge"

const renderCellValue = (value) => {
  if (value == null || value === "") return "—"

  if (typeof value === "object") {
    if (Array.isArray(value)) {
      return value.map((item) => String(item)).join(", ") || "—"
    }

    return value.name ?? value.label ?? value.title ?? "—"
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No"
  }

  return value
}

export default function DataTable({
  title,
  description,
  columns,
  data,
  searchKeys = [],
  onAdd,
  addLabel = "Add Record",
  onEdit,
  onDelete,
  deletingId
}) {
  const [search, setSearch] = useState("")

  const filteredData = useMemo(() => {
    const term = search.toLowerCase().trim()

    if (!term) return data

    return data.filter((row) =>
      searchKeys.some((key) => {
        const value = row[key]

        if (value == null) return false

        const searchableValue =
          typeof value === "object"
            ? JSON.stringify(value)
            : String(value)

        return searchableValue.toLowerCase().includes(term)
      })
    )
  }, [data, search, searchKeys])

  const hasActions = Boolean(onEdit || onDelete)
  const totalColumns = columns.length + (hasActions ? 1 : 0)

  return (
    <section className="overflow-hidden rounded-2xl border border-[#e5efed] bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-[#edf3f1] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-bold text-[#183b37]">{title}</h2>
          <p className="mt-1 text-sm text-[#78918c]">{description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <label className="flex items-center gap-2 rounded-xl border border-[#e5efed] bg-[#f8fcfb] px-3 py-2">
            <Search size={16} className="text-[#78918c]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search records..."
              className="w-36 bg-transparent text-sm outline-none sm:w-44"
            />
          </label>

          {onAdd && (
            <button
              type="button"
              onClick={onAdd}
              className="flex items-center gap-2 rounded-xl bg-[#16a995] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#118575]"
            >
              <Plus size={17} />
              {addLabel}
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="bg-[#f8fcfb] text-xs text-[#78918c]">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="whitespace-nowrap px-5 py-4 font-semibold"
                >
                  {column.label}
                </th>
              ))}

              {hasActions && (
                <th className="whitespace-nowrap px-5 py-4 font-semibold">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row, index) => (
              <tr
                key={
                  row.id ??
                  row.resident_id ??
                  row.apartment_id ??
                  row.parking_id ??
                  row.amenity_id ??
                  index
                }
                className="border-t border-[#edf3f1] transition hover:bg-[#f8fcfb]"
              >
                {columns.map((column) => {
                  const value = row[column.key]

                  return (
                    <td
                      key={column.key}
                      className="px-5 py-4 text-[#53776e]"
                    >
                      {column.render ? (
                        column.render(value, row)
                      ) : column.status ? (
                        <StatusBadge status={renderCellValue(value)} />
                      ) : (
                        renderCellValue(value)
                      )}
                    </td>
                  )
                })}

                {hasActions && (
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {onEdit && (
                        <button
                          type="button"
                          onClick={() => onEdit(row)}
                          title="Edit record"
                          aria-label={`Edit record ${row.id ?? ""}`}
                          className="rounded-lg border border-[#dcebe7] p-2 text-[#53776e] transition hover:bg-[#eaf8f5] hover:text-[#118575]"
                        >
                          <Pencil size={16} />
                        </button>
                      )}

                      {onDelete && (
                        <button
                          type="button"
                          onClick={() => onDelete(row)}
                          disabled={deletingId === row.id}
                          title="Delete record"
                          aria-label={`Delete record ${row.id ?? ""}`}
                          className="rounded-lg border border-red-100 p-2 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingId === row.id ? (
                            <span className="text-xs">...</span>
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}

            {filteredData.length === 0 && (
              <tr>
                <td
                  colSpan={totalColumns}
                  className="px-5 py-14 text-center"
                >
                  <Inbox size={28} className="mx-auto text-[#91a6a1]" />
                  <p className="mt-3 text-sm font-medium text-[#53776e]">
                    No matching records found
                  </p>
                  <p className="mt-1 text-xs text-[#91a6a1]">
                    Try another search term.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-[#edf3f1] px-5 py-3 text-xs text-[#78918c]">
        <span>{filteredData.length} record(s)</span>
        <span></span>
      </div>
    </section>
  )
}
