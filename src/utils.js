// Utils + construcción de preguntas
export const API =
  "https://restcountries.com/v3.1/all?fields=name,capital,flags,cca3,region,population";

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sample(arr, n) {
  const a = shuffle(arr);
  return a.slice(0, n);
}

function buildQuestionTemplates(country, pool) {
  const distractors = (selector, correctValue) => {
    const values = [];
    const seen = new Set([String(correctValue)]);
    for (const c of shuffle(pool)) {
      const v = selector(c);
      if (v && !seen.has(String(v))) {
        seen.add(String(v));
        values.push(v);
      }
      if (values.length >= 3) break;
    }
    return values;
  };

  const name = country?.name?.common;
  const capital = Array.isArray(country?.capital) ? country.capital[0] : country?.capital;
  const region = country?.region;
  const flag = country?.flags?.svg || country?.flags?.png;

  const qs = [];

  // 1) Capital
  if (capital) {
    const opts = [capital, ...distractors(c => (Array.isArray(c.capital) ? c.capital[0] : c.capital), capital)];
    if (opts.length === 4) {
      qs.push({
        type: "capital",
        prompt: `¿Cuál es la capital de ${name}?`,
        mediaFlag: flag,
        correct: capital,
        options: shuffle(opts),
      });
    }
  }

  // 2) Bandera → País
  if (flag && name) {
    const opts = [name, ...distractors(c => c.name?.common, name)];
    if (opts.length === 4) {
      qs.push({
        type: "flag",
        prompt: "¿A qué país pertenece esta bandera?",
        mediaFlag: flag,
        correct: name,
        options: shuffle(opts),
      });
    }
  }

  // 3) Región
  if (region) {
    const opts = [region, ...distractors(c => c.region, region)];
    if (opts.length === 4) {
      qs.push({
        type: "region",
        prompt: `¿A qué región pertenece ${name}?`,
        mediaFlag: flag,
        correct: region,
        options: shuffle(opts),
      });
    }
  }

  return qs;
}

export function buildQuizQuestions(countries, total = 10) {
  const basePool = countries.filter(
    (c) => c?.name?.common && (c?.flags?.svg || c?.flags?.png)
  );
  const picked = sample(basePool, Math.min(basePool.length, 40));

  const candidates = [];
  for (const c of picked) {
    candidates.push(...buildQuestionTemplates(c, countries));
  }

  const unique = [];
  const seen = new Set();
  for (const q of shuffle(candidates)) {
    const key = `${q.type}|${q.prompt}|${q.correct}`;
    if (!seen.has(key)) {
      unique.push(q);
      seen.add(key);
    }
    if (unique.length >= total) break;
  }
  return unique.slice(0, total);
}
