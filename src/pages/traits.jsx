import { useState } from "react";
import { useTraits } from "../hooks/useTraits";
import FilterTabs from "../elements/tabs";
import { CardRender } from "../elements/cards";
import FloatAddButton from "../elements/float-button";
import { Status } from "../../lib/states";
import Modal from "../components/modal";

const TABS = ["Advantage", "Disadvantage", "Quirk"];
const TYPES = ["Physical", "Mental", "Social"];
const EMPTY_FORM = { trait_name: "", category: TABS[0], type: TYPES[0], notes: "" };

function validateTrait(form) {
  const errors = {};
  const name = form.trait_name.trim();

  if (!name) {
    errors.trait_name = "Name is required.";
  } else if (name.length < 2) {
    errors.trait_name = "Name must be at least 2 characters.";
  } else if (name.length > 80) {
    errors.trait_name = "Name must be 80 characters or fewer.";
  }

  if (!TABS.map((t) => t.toLowerCase()).includes(form.category.toLowerCase())) {
    errors.category = "Choose a valid category.";
  }

  if (!TYPES.includes(form.type)) {
    errors.type = "Choose a valid type.";
  }

  if (form.notes && form.notes.length > 200) {
    errors.notes = "Notes must be 200 characters or fewer.";
  }

  return errors;
}

export default function TraitsPage() {
  const [tab, setTab] = useState(TABS[0]);
  const [modal, setModal] = useState(Status.CLOSED);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    traits: filteredTraits,
    loading,
    error,
    reloadTraits,
    addTrait,
    editTrait,
    deleteTrait,
  } = useTraits({ category: tab.toLowerCase() });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const closeModal = () => {
    setModal(Status.CLOSED);
    setForm(EMPTY_FORM);
    setErrors({});
    setEditingId(null);
    setServerError(null);
    setIsSubmitting(false);
  };

  const openAdd = () => {
    setForm({ ...EMPTY_FORM, category: tab });
    setErrors({});
    setEditingId(null);
    setServerError(null);
    setModal(Status.OPEN);
  };

  const openEdit = (trait) => {
    setForm({
      trait_name: trait.trait_name,
      category: trait.category.charAt(0).toUpperCase() + trait.category.slice(1),
      type: trait.type,
      notes: trait.notes || "",
    });
    setErrors({});
    setEditingId(trait.id);
    setServerError(null);
    setModal(Status.OPEN);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setServerError(null);

    const found = validateTrait(form);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingId !== null) {
        const original = filteredTraits.find((t) => t.id === editingId);
        if (!original) {
          setServerError("Selected trait no longer exists.");
          return;
        }
        const normalizedForm = {
          trait_name: form.trait_name.trim(),
          type: form.type,
          category: form.category.toLowerCase(),
          notes: form.notes,
        };
        const changed = {};
        for (const key of ["trait_name", "type", "category", "notes"]) {
          if (normalizedForm[key] !== (original[key] ?? "")) {
            changed[key] = normalizedForm[key];
          }
        }
        if (Object.keys(changed).length > 0) {
          await editTrait(editingId, changed);
        }
      } else {
        await addTrait({
          trait_name: form.trait_name.trim(),
          type: form.type,
          category: form.category.toLowerCase(),
          notes: form.notes || undefined,
        });
      }
      setTab(form.category.charAt(0).toUpperCase() + form.category.slice(1));
      closeModal();
    } catch (err) {
      setServerError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (isDeleting) return;
    setDeleteError(null);
    setIsDeleting(true);
    try {
      await deleteTrait(id);
      setConfirmDelete(null);
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-83px)]">
      <div className="py-5">
        <FilterTabs tabs={TABS} active={tab} tabChange={setTab} />
      </div>

      {loading && (
        <div className="text-center">
          <p>Loading traits...</p>
        </div>
      )}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-red-500 text-center">{error}</p>
          <button
            className="bg-orange-800 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            onClick={reloadTraits}
          >
            Retry
          </button>
        </div>
      )}
      {!loading && !error && (
        filteredTraits.length === 0 ? (
          <p className="text-center text-(--text-muted)">No traits found.</p>
        ) : (
        <div className="grid grid-cols-[repeat(auto-fill,210px)] gap-4 justify-center">
          {filteredTraits.map((t) => (
            <CardRender key={t.id}>
              <div
                className="w-full h-full px-4 flex flex-col justify-center items-center text-center cursor-pointer"
                onClick={() => openEdit(t)}
              >
                <p className="text-base font-medium line-clamp-2 break-words">{t.trait_name}</p>
                <p className="text-sm italic text-(--text-muted)">{t.type}</p>
              </div>
              <button
                className="absolute top-1 right-2 text-red-500 text-xs hover:text-red-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteError(null);
                  setConfirmDelete(t.id);
                }}
              >
                ✕
              </button>
            </CardRender>
          ))}
        </div>
        )
      )}

      {confirmDelete !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="border border-(--secondary-color) bg-(--primary-color) p-6 flex flex-col gap-4">
            <p>Delete this trait?</p>
            {deleteError && <p className="text-sm text-red-500">{deleteError}</p>}
            <div className="flex justify-end gap-4">
              <button
                className="border border-(--border) p-2"
                disabled={isDeleting}
                onClick={() => { setConfirmDelete(null); setDeleteError(null); }}
              >
                Cancel
              </button>
              <button
                className="border border-(--border) p-2 text-red-500 disabled:opacity-50"
                disabled={isDeleting}
                onClick={() => handleDelete(confirmDelete)}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      <FloatAddButton onClick={openAdd} />

      <Modal status={modal} onClose={closeModal}>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full h-full flex flex-col justify-center px-5"
        >
          <p className="py-5 text-2xl font-semibold">
            {editingId !== null ? "Edit Trait" : "Add Trait"}
          </p>

          {serverError && (
            <p className="text-sm text-red-500 pb-2">{serverError}</p>
          )}

          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="trait_name">Name</label>
              <input
                name="trait_name"
                id="trait_name"
                type="text"
                value={form.trait_name}
                onChange={handleChange}
                placeholder="e.g. Fish"
                minLength={2}
                maxLength={80}
                required
                className="border border-(--border) p-2"
              />
              {errors.trait_name && (
                <p className="text-sm text-red-500">{errors.trait_name}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                value={form.category}
                onChange={handleChange}
                className="border border-(--border) p-2"
              >
                {TABS.map((c) => (
                  <option key={c} value={c} className="bg-(--primary-color)">
                    {c}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="type">Type</label>
              <select
                name="type"
                id="type"
                value={form.type}
                onChange={handleChange}
                className="border border-(--border) p-2"
              >
                {TYPES.map((t) => (
                  <option key={t} value={t} className="bg-(--primary-color)">
                    {t}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="notes">Notes</label>
              <textarea
                name="notes"
                id="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Optional notes"
                maxLength={200}
                className="border border-(--border) p-2"
              />
              {errors.notes && (
                <p className="text-sm text-red-500">{errors.notes}</p>
              )}
            </div>
          </div>

          <div className="w-full h-20 flex justify-end items-center gap-5">
            <button
              type="button"
              onClick={closeModal}
              disabled={isSubmitting}
              className="border border-(--border) p-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="border border-(--border) p-2 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Submit"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
