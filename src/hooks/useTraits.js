import { useState, useEffect, useCallback } from "react";
import { getTraits, getTraitByCategory, createTrait, updateTrait, removeTrait } from "../api/trait";


export function useTraits({ category = null }) {
  const [traits, setTraits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    if (category) {
      getTraitByCategory(category)
        .then((data) => {
          setTraits(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      getTraits()
        .then((data) => {
          setTraits(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }

    setIsReload(false);
  }, [category, isReload]);

  const reloadTraits = () => {
    setIsReload(true);
    setLoading(true);
    setError(null);
  }

  const addTrait = useCallback(async (data) => {
    const created = await createTrait(data);
    reloadTraits();
    return created;
  }, []);

  const editTrait = useCallback(async (id, data) => {
    const updated = await updateTrait(id, data);
    reloadTraits();
    return updated;
  }, []);

  const deleteTrait = useCallback(async (id) => {
    const deleted = await removeTrait(id);
    reloadTraits();
    return deleted;
  }, []);

  return { traits, loading, error, reloadTraits, addTrait, editTrait, deleteTrait };
}
