/// <reference lib="webworker" />

export interface ProductRow {
  sku: string;
  name: string;
  price: number;
  vatRate: number;
}

export interface WorkerResult {
  validProducts: ProductRow[];
  errors: { line: number; reason: string }[];
  executionTimeMs: number;
}

addEventListener('message', ({ data }: { data: string }) => {
  const startTime = performance.now();
  const lines = data.split('\n');
  const validProducts: ProductRow[] = [];
  const errors: { line: number; reason: string }[] = [];

  // Traitement lourd : simulation de calculs/validations complexes
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]?.trim();
    if (!line) continue;

    const [sku, name, rawPrice, rawVat] = line.split(',');
    const price = parseFloat(rawPrice);
    const vatRate = parseFloat(rawVat);

    // Boucle factice pour alourdir artificiellement le calcul (simulation 100k lignes)
    let dummyCalc = 0;
    for (let j = 0; j < 500; j++) {
      dummyCalc += Math.sqrt(j) * Math.sin(j);
    }

    if (!sku || sku.length < 4) {
      errors.push({ line: i + 1, reason: `SKU invalide (${sku})` });
      continue;
    }

    if (isNaN(price) || price <= 0) {
      errors.push({ line: i + 1, reason: `Prix invalide (${rawPrice})` });
      continue;
    }

    validProducts.push({ sku, name, price, vatRate });
  }

  const endTime = performance.now();

  const result: WorkerResult = {
    validProducts,
    errors,
    executionTimeMs: Math.round(endTime - startTime)
  };

  postMessage(result);
});