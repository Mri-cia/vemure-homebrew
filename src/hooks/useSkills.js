import { useState, useEffect } from "react";
import { getSkills } from "../api/skill";

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

  return { skills, loading, error, reloadSkill}
}
