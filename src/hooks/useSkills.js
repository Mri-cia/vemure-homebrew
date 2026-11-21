import { useState, useEffect, useCallback } from "react";
import { getSkills, createSkill, updateSkill, removeSkill } from "../api/skill";

export function useSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    getSkills()
      .then((data) => {
        setSkills(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    setIsReload(false);
  }, [isReload]);

  const reloadSkill = () => {
    setIsReload(true);
    setLoading(true);
    setError(null);
  };

  const addSkill = useCallback(async (data) => {
    const created = await createSkill(data);
    reloadSkill();
    return created;
  }, []);

  const editSkill = useCallback(async (id, data) => {
    const updated = await updateSkill(id, data);
    reloadSkill();
    return updated;
  }, []);

  const deleteSkill = useCallback(async (id) => {
    const deleted = await removeSkill(id);
    reloadSkill();
    return deleted;
  }, []);

  return { skills, loading, error, reloadSkill, addSkill, editSkill, deleteSkill };
}
