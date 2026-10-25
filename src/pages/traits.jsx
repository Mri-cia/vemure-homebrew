import { useState } from "react";
import FilterTabs from "../elements/tabs";
import TraitsData from "../../data/gurps_traits.json";
import { CardRender } from "../elements/cards";
import FloatAddButton from "../elements/float-button";
import { Status } from "../../lib/states";
import Modal from "../components/modal";

const TABS = ["Advantage", "Disadvantage", "Quirk"];
const TYPES = ["Physical", "Mental", "Social"];
const EMPTY_FORM = { trait_name: "", category: TABS[0], type: TYPES[0] };

function validateTrait(form, existingTraits) {
  const errors = {};
  const name = form.trait_name.trim();

  if (!name) {
    errors.trait_name = "Name is required.";
  } else if (name.length < 2) {
    errors.trait_name = "Name must be at least 2 characters.";
  } else if (name.length > 50) {
    errors.trait_name = "Name must be 50 characters or fewer.";
  } else if (
    existingTraits.some(
      (t) => t.trait_name.toLowerCase() === name.toLowerCase()
    )
  ) {
    errors.trait_name = "A trait with this name already exists.";
  }

  if (!TABS.includes(form.category)) {
    errors.category = "Choose a valid category.";
  }

  if (!TYPES.includes(form.type)) {
    errors.type = "Choose a valid type.";
  }

  return errors;
}

export default function TraitsPage() {
  const [tab, setTab] = useState(TABS[0]);
  const [modal, setModal] = useState(Status.CLOSED);
  const [traits, setTraits] = useState(TraitsData);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const filteredTraits = traits.filter(
    (t) => t.category.toLowerCase() === tab.toLowerCase()
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const closeModal = () => {
    setModal(Status.CLOSED);
    setForm(EMPTY_FORM);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const found = validateTrait(form, traits);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return; 
    }

    const newTrait = {
      trait_name: form.trait_name.trim(),
      type: form.type,
      category: form.category.toLowerCase(), 
      notes: "",
    };

    setTraits((prev) => [...prev, newTrait]);
    setTab(form.category); 
    closeModal();
  };

  return (
    <div className="relative min-h-[calc(100vh-83px)]">
      <div className="py-5">
        <FilterTabs tabs={TABS} active={tab} tabChange={setTab} />
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,210px)] gap-4 justify-center">
        {filteredTraits.map((t) => (
          <CardRender key={t.trait_name}>
            <p className="text-base">{t.trait_name}</p>
            <p className="text-base italic">{t.type}</p>
          </CardRender>
        ))}
      </div>

      <FloatAddButton onClick={() => setModal(Status.OPEN)} />

      <Modal status={modal} onClose={closeModal}>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full h-full flex flex-col justify-center px-5"
        >
          <p className="py-5 text-2xl font-semibold">Add Trait</p>

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
          </div>

          <div className="w-full h-20 flex justify-end items-center gap-5">
            <button
              type="button"
              onClick={closeModal}
              className="border border-(--border) p-2"
            >
              Cancel
            </button>
            <button type="submit" className="border border-(--border) p-2">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}