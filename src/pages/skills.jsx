import { useState } from "react";
import FloatAddButton from "../elements/float-button";
import { CardRender } from "../elements/cards";
import { useSkills } from "../hooks/useSkills";
import { Status } from "../../lib/states";
import Modal from "../components/modal";

const ATTRIBUTES = ["ST", "DX", "IQ", "HT", "Per", "Will"];
const DIFFICULTIES = ["Easy", "Average", "Hard", "Very Hard"];
const EMPTY_FORM = {
  skill_name: "",
  attribute: ATTRIBUTES[0],
  difficulty: DIFFICULTIES[0],
  notes: "",
  requires_specialization: false,
};

function validateSkill(form) {
  const errors = {};
  const name = form.skill_name.trim();

  if (!name) {
    errors.skill_name = "Name is required.";
  } else if (name.length < 2) {
    errors.skill_name = "Name must be at least 2 characters.";
  } else if (name.length > 60) {
    errors.skill_name = "Name must be 60 characters or fewer.";
  }

  if (!ATTRIBUTES.includes(form.attribute)) {
    errors.attribute = "Choose a valid attribute.";
  }

  if (!DIFFICULTIES.includes(form.difficulty)) {
    errors.difficulty = "Choose a valid difficulty.";
  }

  if (form.notes && form.notes.length > 200) {
    errors.notes = "Notes must be 200 characters or fewer.";
  }

  return errors;
}

export default function SkillsPage() {
  const { skills: SkillsData, loading, error, reloadSkill, addSkill, editSkill, deleteSkill } = useSkills();
  const [modal, setModal] = useState(Status.CLOSED);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
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
    setForm(EMPTY_FORM);
    setErrors({});
    setEditingId(null);
    setServerError(null);
    setModal(Status.OPEN);
  };

  const openEdit = (skill) => {
    setForm({
      skill_name: skill.skill_name,
      attribute: skill.attribute,
      difficulty: skill.difficulty,
      notes: skill.notes || "",
      requires_specialization: skill.requires_specialization || false,
    });
    setErrors({});
    setEditingId(skill.id);
    setServerError(null);
    setModal(Status.OPEN);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setServerError(null);

    const found = validateSkill(form);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingId !== null) {
        const original = SkillsData.find((s) => s.id === editingId);
        if (!original) {
          setServerError("Selected skill no longer exists.");
          return;
        }
        const normalizedForm = {
          skill_name: form.skill_name.trim(),
          attribute: form.attribute,
          difficulty: form.difficulty,
          notes: form.notes,
          requires_specialization: form.requires_specialization,
        };
        const changed = {};
        for (const key of ["skill_name", "attribute", "difficulty", "notes", "requires_specialization"]) {
          const originalValue = original[key] ?? (key === "requires_specialization" ? false : "");
          if (normalizedForm[key] !== originalValue) {
            changed[key] = normalizedForm[key];
          }
        }
        if (Object.keys(changed).length > 0) {
          await editSkill(editingId, changed);
        }
      } else {
        await addSkill({
          skill_name: form.skill_name.trim(),
          attribute: form.attribute,
          difficulty: form.difficulty,
          notes: form.notes || undefined,
          requires_specialization: form.requires_specialization || undefined,
        });
      }
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
      await deleteSkill(id);
      setConfirmDelete(null);
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-83px)] py-5">
      {loading && (
        <div className="text-center">
          <p>Loading skills...</p>
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-red-500 text-center">{error}</p>
          <button
            className="bg-orange-800 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            onClick={reloadSkill}
          >
            Retry
          </button>
        </div>
      )}
      {!loading && !error && (
        SkillsData.length === 0 ? (
          <p className="text-center text-(--text-muted)">No skills found.</p>
        ) : (
        <div className=" grid grid-cols-[repeat(auto-fill,210px)] gap-4 justify-center">
          {SkillsData.map((t, index) => (
            <CardRender key={t.id ?? index}>
              <div
                className="w-full h-full px-4 flex flex-col justify-center items-center text-center cursor-pointer"
                onClick={() => openEdit(t)}
              >
                <p className="text-base font-medium line-clamp-2 break-words">{t.skill_name}</p>
                <p className="text-sm italic text-(--text-muted)">
                  ({t.attribute}/{t.difficulty})
                </p>
                {t.requires_specialization && (
                  <span className="text-xs text-(--secondary-accent)">Spec. required</span>
                )}
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
            <p>Delete this skill?</p>
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
            {editingId !== null ? "Edit Skill" : "Add Skill"}
          </p>

          {serverError && (
            <p className="text-sm text-red-500 pb-2">{serverError}</p>
          )}

          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="skill_name">Name</label>
              <input
                name="skill_name"
                id="skill_name"
                type="text"
                value={form.skill_name}
                onChange={handleChange}
                placeholder="e.g. Acrobatics"
                minLength={2}
                maxLength={60}
                required
                className="border border-(--border) p-2"
              />
              {errors.skill_name && (
                <p className="text-sm text-red-500">{errors.skill_name}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="attribute">Attribute</label>
              <select
                name="attribute"
                id="attribute"
                value={form.attribute}
                onChange={handleChange}
                className="border border-(--border) p-2"
              >
                {ATTRIBUTES.map((a) => (
                  <option key={a} value={a} className="bg-(--primary-color)">
                    {a}
                  </option>
                ))}
              </select>
              {errors.attribute && (
                <p className="text-sm text-red-500">{errors.attribute}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="difficulty">Difficulty</label>
              <select
                name="difficulty"
                id="difficulty"
                value={form.difficulty}
                onChange={handleChange}
                className="border border-(--border) p-2"
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d} className="bg-(--primary-color)">
                    {d}
                  </option>
                ))}
              </select>
              {errors.difficulty && (
                <p className="text-sm text-red-500">{errors.difficulty}</p>
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

            <div className="flex items-center gap-2">
              <input
                name="requires_specialization"
                id="requires_specialization"
                type="checkbox"
                checked={form.requires_specialization}
                onChange={handleChange}
              />
              <label htmlFor="requires_specialization">Requires Specialization</label>
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
