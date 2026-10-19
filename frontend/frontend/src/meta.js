import { useCallback, useState } from 'react';

// O backend só guarda título, conclusão e data. "Lista" e "importante" ficam no navegador.
const KEY = 'taskflow:meta';
export const LISTS = [
  { name: 'Trabalho', color: '#2f7bff' },
  { name: 'Estudos', color: '#18c07a' },
  { name: 'Pessoal', color: '#a259ff' },
  { name: 'Projetos', color: '#ff7a1a' },
];
export const listColor = (n) => LISTS.find((l) => l.name === n)?.color || '#2f7bff';

const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };

export function useMeta() {
  const [meta, setMeta] = useState(read);
  const patch = useCallback((id, p) => setMeta((m) => {
    const next = { ...m, [id]: { ...m[id], ...p } };
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* sem armazenamento */ }
    return next;
  }), []);
  const get = (id) => ({ important: false, list: 'Pessoal', ...meta[id] });
  return { meta, get, patch };
}
