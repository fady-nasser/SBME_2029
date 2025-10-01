// src/hooks/useCSVData.js
import { useEffect, useState } from "react";
import Papa from "papaparse";

export default function useCachedCSV(url, options = {}) {
  const { cacheKey = "csv-cache" } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function parseCSV(text) {
      return new Promise((resolve, reject) => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (h) => h.trim(),
          transform: (v) => (typeof v === "string" ? v.trim() : v),
          complete: (results) => resolve(results.data),
          error: (err) => reject(err),
        });
      });
    }

    async function load() {
      setLoading(true);
      setError(null);

      // 1) Load cached first (if any)
      try {
        const cachedJSON = localStorage.getItem(cacheKey);
        const cachedTime = localStorage.getItem(`${cacheKey}-time`);
        if (cachedJSON) {
          const parsed = JSON.parse(cachedJSON);
          setData(parsed);
          if (cachedTime) setLastUpdated(new Date(cachedTime));
          setLoading(false);
        }
      } catch (e) {
        console.warn("Cache error", e);
      }

      // 2) Fetch fresh in background
      try {
        const resp = await fetch(url, { cache: "no-store" });
        if (!resp.ok) throw new Error(`Network error ${resp.status}`);
        const text = await resp.text();
        if (cancelled) return;

        const parsed = await parseCSV(text);
        const now = new Date();

        setData(parsed);
        setLastUpdated(now);
        localStorage.setItem(cacheKey, JSON.stringify(parsed));
        localStorage.setItem(`${cacheKey}-time`, now.toISOString());
        setLoading(false);
      } catch (err) {
        console.warn("Fetch error", err);
        if (!data) setError(err.message);
        setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [url, cacheKey]);

  return { data, loading, error, lastUpdated };
}
