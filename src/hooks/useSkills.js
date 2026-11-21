import { useState, useEffect, useCallback } from "react";
import { getSkills, createSkill, updateSkill, removeSkill } from "../api/skill";

export function useSkills() {
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [resolvedKey, setResolvedKey] = useState(-1);

  const loading = resolvedKey !== reloadKey;

  useEffect(() => {
    let cancelled = false;

    getSkills()
      .then((data) => {
        if (cancelled) return;
        setSkills(data);
        setError(null);
        setResolvedKey(reloadKey);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
        setResolvedKey(reloadKey);
      });

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const reloadSkill = useCallback(() => {
    setError(null);
    setReloadKey((k) => k + 1);
  }, []);

  const addSkill = useCallback(async (data) => {
    const created = await createSkill(data);
    reloadSkill();
    return created;
  }, [reloadSkill]);

  const editSkill = useCallback(async (id, data) => {
    const updated = await updateSkill(id, data);
    reloadSkill();
    return updated;
  }, [reloadSkill]);

  const deleteSkill = useCallback(async (id) => {
    const deleted = await removeSkill(id);
    reloadSkill();
    return deleted;
  }, [reloadSkill]);

  return { skills, loading, error, reloadSkill, addSkill, editSkill, deleteSkill };
}
