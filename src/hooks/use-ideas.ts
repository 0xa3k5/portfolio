import { useEffect, useState } from "react";
import { Idea } from "../types";
import { MdStringObject } from "notion-to-md/build/types";

export const useIdeas = () => {
  const [ideas, setIdeas] = useState<{
    posts: Idea[];
    md: {
      [key: string]: {
        markdown: MdStringObject;
      };
    };
  }>({
    posts: [],
    md: {},
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/notion-data");

        if (!response.ok) {
          throw new Error("Failed to fetch ideas");
        }

        const data = await response.json();
        setIdeas(data.ideas);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  return { ideas, loading, error };
};
