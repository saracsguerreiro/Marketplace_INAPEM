import { useEffect, useState } from "react";
import { allProducts, Product } from "../data/products";

const HISTORY_KEY = "inapem_viewed_products";
const MAX_HISTORY = 10;

export function trackProduct(productId: string, category: string) {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const history: { id: string; category: string }[] = raw ? JSON.parse(raw) : [];
    const filtered = history.filter((h) => h.id !== productId);
    const updated = [{ id: productId, category }, ...filtered].slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch {}
}

export function useRecommendations(excludeId?: string, limitCategory?: string) {
  const [recommended, setRecommended] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      const history: { id: string; category: string }[] = raw ? JSON.parse(raw) : [];

      // Conta frequência de categorias visitadas
      const categoryCount: Record<string, number> = {};
      history.forEach(({ category }) => {
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      });

      const viewedIds = new Set(history.map((h) => h.id));
      if (excludeId) viewedIds.add(excludeId);

      let candidates = allProducts.filter((p) => !viewedIds.has(p.id));

      if (limitCategory) {
        // Para "também compraram": mesma categoria primeiro
        candidates = [
          ...allProducts.filter((p) => p.id !== excludeId && p.category === limitCategory),
          ...allProducts.filter((p) => p.id !== excludeId && p.category !== limitCategory),
        ].slice(0, 4);
      } else if (Object.keys(categoryCount).length > 0) {
        // Ordena por relevância de categoria
        candidates.sort((a, b) => {
          const scoreA = categoryCount[a.category] || 0;
          const scoreB = categoryCount[b.category] || 0;
          return scoreB - scoreA;
        });
        candidates = candidates.slice(0, 4);
      } else {
        // Sem histórico: mostra os melhor avaliados
        candidates = [...allProducts]
          .filter((p) => p.id !== excludeId)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 4);
      }

      setRecommended(candidates);
    } catch {
      setRecommended(allProducts.slice(0, 4));
    }
  }, [excludeId, limitCategory]);

  return recommended;
}
