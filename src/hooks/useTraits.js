import { useState, useEffect } from "react";
import { getTraits, getTraitByCategory } from "../api/trait";


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

  return { traits, loading, error, reloadTraits };
}