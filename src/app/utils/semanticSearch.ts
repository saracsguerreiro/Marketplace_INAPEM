import { Product } from "../data/products";

// Mapa de conceitos: termos naturais → palavras-chave que pontuam produtos
const conceptMap: Record<string, string[]> = {
  // Gestão e software
  "gerir pessoal": ["rh", "recursos humanos", "erp", "gestão"],
  "gerir equipa": ["rh", "recursos humanos", "erp", "gestão"],
  "gerir funcionários": ["rh", "recursos humanos", "erp"],
  "gestão de empresa": ["erp", "sistema", "gestão", "crm"],
  "controlar vendas": ["crm", "vendas", "gestão", "software"],
  "gerir clientes": ["crm", "clientes", "software", "gestão"],
  "contabilidade": ["erp", "contabilidade", "gestão", "sistema"],
  "faturação": ["erp", "sistema", "gestão", "software"],
  "inventário": ["erp", "sistema", "gestão", "inventário"],
  "stock": ["erp", "sistema", "gestão", "inventário"],

  // Tecnologia
  "computador": ["computador", "dell", "tecnologia", "hardware"],
  "laptop": ["computador", "dell", "tecnologia", "hardware"],
  "portátil": ["computador", "dell", "tecnologia"],
  "informática": ["tecnologia", "computador", "software", "sistema"],
  "digitalizar": ["tecnologia", "software", "sistema", "digital"],
  "cloud": ["cloud", "software", "sistema", "crm"],
  "online": ["cloud", "software", "digital", "crm"],

  // Transporte e logística
  "transportar mercadoria": ["logística", "transporte", "frota"],
  "entrega": ["logística", "transporte", "frota"],
  "distribuição": ["logística", "transporte", "frota"],
  "frete": ["logística", "transporte", "frota"],
  "carregar": ["logística", "transporte"],
  "camião": ["logística", "transporte", "frota"],

  // Construção
  "construir": ["construção", "materiais", "obras"],
  "obra": ["construção", "materiais", "cimento"],
  "cimento": ["construção", "materiais"],
  "betão": ["construção", "materiais"],
  "ferro": ["construção", "materiais"],
  "edifício": ["construção", "materiais"],
  "casa": ["construção", "materiais"],

  // Saúde
  "hospital": ["saúde", "médico", "equipamento"],
  "clínica": ["saúde", "médico", "equipamento"],
  "médico": ["saúde", "médico", "equipamento"],
  "enfermagem": ["saúde", "médico", "equipamento"],
  "saúde": ["saúde", "médico", "equipamento"],

  // Agronegócio
  "agricultor": ["agronegócio", "agrícola", "equipamento"],
  "fazenda": ["agronegócio", "agrícola"],
  "campo": ["agronegócio", "agrícola"],
  "colheita": ["agronegócio", "agrícola", "equipamento"],
  "semear": ["agronegócio", "agrícola"],
  "irrigação": ["agronegócio", "agrícola"],
  "plantação": ["agronegócio", "agrícola"],

  // Marketing e serviços
  "publicidade": ["marketing", "digital", "serviços"],
  "redes sociais": ["marketing", "digital", "serviços"],
  "instagram": ["marketing", "digital", "serviços"],
  "facebook": ["marketing", "digital", "serviços"],
  "promover": ["marketing", "digital", "serviços"],
  "visibilidade": ["marketing", "digital", "serviços"],
  "marca": ["marketing", "digital", "serviços"],

  // Consultoria
  "ajuda": ["consultoria", "serviços"],
  "conselho": ["consultoria", "serviços"],
  "estratégia": ["consultoria", "serviços", "gestão"],
  "crescer": ["consultoria", "serviços", "marketing"],
  "melhorar negócio": ["consultoria", "serviços", "gestão"],

  // Equipamentos gerais
  "máquina": ["equipamento", "industrial", "ferramentas"],
  "ferramenta": ["ferramentas", "equipamento", "industrial"],
  "oficina": ["ferramentas", "equipamento", "industrial"],
  "fábrica": ["equipamento", "industrial"],

  // Escritório
  "escritório": ["escritório", "material", "office"],
  "secretária": ["escritório", "material", "mobiliário"],
  "impressora": ["escritório", "material", "office"],
};

// Sinónimos directos de palavras
const synonyms: Record<string, string[]> = {
  "software": ["sistema", "programa", "aplicação", "app", "plataforma"],
  "sistema": ["software", "programa", "erp", "crm"],
  "erp": ["sistema", "gestão", "software", "contabilidade"],
  "crm": ["clientes", "vendas", "sistema", "software"],
  "tecnologia": ["informática", "digital", "software", "computador"],
  "equipamento": ["máquina", "ferramenta", "hardware"],
  "serviço": ["consultoria", "apoio", "suporte"],
  "logística": ["transporte", "entrega", "distribuição"],
  "saúde": ["médico", "hospital", "clínica"],
  "construção": ["obras", "edifício", "civil"],
  "agronegócio": ["agricultura", "campo", "fazenda"],
  "marketing": ["publicidade", "digital", "comunicação"],
};

function normalise(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function tokenise(text: string): string[] {
  return normalise(text).split(/\s+/).filter(Boolean);
}

function expandQuery(query: string): string[] {
  const norm = normalise(query);
  const tokens = tokenise(query);
  const expanded = new Set<string>(tokens);

  // Conceitos multi-palavra
  for (const [concept, keywords] of Object.entries(conceptMap)) {
    if (norm.includes(normalise(concept))) {
      keywords.forEach((k) => expanded.add(normalise(k)));
    }
  }

  // Sinónimos palavra a palavra
  for (const token of tokens) {
    for (const [word, syns] of Object.entries(synonyms)) {
      if (token === normalise(word)) {
        syns.forEach((s) => expanded.add(normalise(s)));
      }
      if (syns.map(normalise).includes(token)) {
        expanded.add(normalise(word));
        syns.forEach((s) => expanded.add(normalise(s)));
      }
    }
  }

  return Array.from(expanded);
}

function scoreProduct(product: Product, terms: string[]): number {
  const fields = [
    { text: product.name, weight: 4 },
    { text: product.category, weight: 3 },
    { text: product.description, weight: 2 },
    { text: product.supplier, weight: 1 },
    { text: product.type, weight: 1 },
    { text: product.features.join(" "), weight: 1 },
  ];

  let score = 0;
  for (const term of terms) {
    for (const { text, weight } of fields) {
      if (normalise(text).includes(term)) {
        score += weight;
      }
    }
  }
  return score;
}

export interface SearchResult {
  product: Product;
  score: number;
}

export function semanticSearch(query: string, products: Product[]): SearchResult[] {
  if (!query.trim()) return products.map((p) => ({ product: p, score: 1 }));

  const terms = expandQuery(query);

  const results: SearchResult[] = products
    .map((p) => ({ product: p, score: scoreProduct(p, terms) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  return results;
}

// Devolve sugestão do que foi "entendido" pela pesquisa
export function getSearchIntent(query: string): string | null {
  const norm = normalise(query);
  for (const [concept] of Object.entries(conceptMap)) {
    if (norm.includes(normalise(concept))) {
      return concept;
    }
  }
  return null;
}
