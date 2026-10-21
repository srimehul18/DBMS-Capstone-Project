
import { useState } from "react";
import { Plus } from "lucide-react";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";

export default function ModulePage({
  title,
  description,
  initialData,
  columns,
  searchKeys,
  fields,
  addLabel,
}) {
  const [records, setRecords] = useState(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({});

  function openForm() {
    setForm({});
    setModalOpen(true);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newRecord = {
      id: `${title.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-5)}`,
      ...form,
    };

    setRecords((current) => [newRecord, ...current]);
    setModalOpen(false);
    setForm({});
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

      <DataTable
        title={`All ${title.toLowerCase()}`}
        description="Browse and search your society records."
        columns={columns}
        data={records}
        searchKeys={searchKeys}
      />

      {modalOpen && (
        <Modal title={addLabel || `Add ${title}`} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.key}>
                <label className="mb-1.5 block text-sm font-medium text-[#53776e]">
                  {field.label}
                </label>

                {field.options ? (
                  <select
                    required={field.required !== false}
                    value={form[field.key] || ""}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        [field.key]: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-[#dcebe7] bg-white px-3 py-2.5 text-sm text-[#183b37]"
                  >
                    <option value="">Select {field.label.toLowerCase()}</option>
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
                    placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                    value={form[field.key] || ""}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        [field.key]: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-[#dcebe7] bg-white px-3 py-2.5 text-sm text-[#183b37] placeholder:text-[#9aada8]"
                  />
                )}
              </div>
            ))}

            <div className="flex justify-end gap-3 border-t border-[#edf3f1] pt-4">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-xl border border-[#dcebe7] px-4 py-2.5 text-sm font-semibold text-[#53776e] hover:bg-[#f5fbfa]"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-[#16a995] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#118575]"
              >
                Save Record
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
