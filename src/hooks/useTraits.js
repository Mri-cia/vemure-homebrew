import { useState, useEffect, useCallback } from "react";
import { getTraits, getTraitByCategory, createTrait, updateTrait, removeTrait } from "../api/trait";

export function useTraits({ category = null } = {}) {
  const [traits, setTraits] = useState([]);
  const [errorState, setErrorState] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [resolvedRequest, setResolvedRequest] = useState(null);

  const requestKey = `${category ?? ""}:${reloadKey}`;
  const loading = resolvedRequest !== requestKey;
  const error = errorState?.key === requestKey ? errorState.message : null;

  useEffect(() => {
    let cancelled = false;
    const fetchTraits = category ? getTraitByCategory(category) : getTraits();

    fetchTraits
      .then((data) => {
        if (cancelled) return;
        setTraits(data);
        setErrorState(null);
        setResolvedRequest(requestKey);
      })
      .catch((err) => {
        if (cancelled) return;
        setErrorState({ key: requestKey, message: err.message });
        setResolvedRequest(requestKey);
      });

    return () => {
      cancelled = true;
    };
  }, [category, requestKey]);

  const reloadTraits = useCallback(() => {
    setErrorState(null);
    setReloadKey((k) => k + 1);
  }, []);

  const addTrait = useCallback(async (data) => {
    const created = await createTrait(data);
    reloadTraits();
    return created;
  }, [reloadTraits]);

  const editTrait = useCallback(async (id, data) => {
    const updated = await updateTrait(id, data);
    reloadTraits();
    return updated;
  }, [reloadTraits]);

  const deleteTrait = useCallback(async (id) => {
    const deleted = await removeTrait(id);
    reloadTraits();
    return deleted;
  }, [reloadTraits]);

  return { traits, loading, error, reloadTraits, addTrait, editTrait, deleteTrait };
}
