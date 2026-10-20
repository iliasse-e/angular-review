import { Component, signal, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkerResult, ProductRow } from './csv-parser.worker';

@Component({
  selector: 'app-csv-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="demo-container">
      <h1>⚙️ Web Worker Lab — Performance & Thread Isolation</h1>
      
      <!-- Indicateurs Pédagogiques du Main Thread -->
      <div class="metrics-grid">
        <div class="metric-card" [class.danger]="fps() < 30">
          <span class="label">Santé du Main Thread (UI)</span>
          <span class="value">{{ fps() }} FPS</span>
          <small>{{ fps() < 30 ? '⚠️ UI GELÉE / BLOQUÉE' : '✅ Interface fluide à 60 FPS' }}</small>
        </div>

        <div class="metric-card">
          <span class="label">Testeur d'Interaction UI</span>
          <button class="pulse-btn" (click)="clickCount.set(clickCount() + 1)">
            Cliquez pendant le calcul : {{ clickCount() }}
          </button>
          <small>Si le bouton ne réagit pas, le thread principal est bloqué !</small>
        </div>
      </div>

      <!-- Commandes de traitement -->
      <div class="control-panel">
        <label class="file-upload">
          📁 Charger le fichier CSV
          <input type="file" (change)="onFileSelected($event)" accept=".csv" />
        </label>

        <div class="mode-selector">
          <label>
            <input type="radio" name="mode" [value]="true" [checked]="useWorker()" (change)="useWorker.set(true)" />
            <strong>Avec Web Worker</strong> (Thread Séparé)
          </label>
          <label>
            <input type="radio" name="mode" [value]="false" [checked]="!useWorker()" (change)="useWorker.set(false)" />
            <strong>Sans Worker</strong> (Main Thread UI - Freeze Garanti)
          </label>
        </div>

        <button class="run-btn" [disabled]="!csvContent() || isProcessing()" (click)="processCsv()">
          {{ isProcessing() ? 'Traitement en cours...' : 'Lancer l’Analyse' }}
        </button>
      </div>

      <!-- Loader Visuel Animé -->
      @if (isProcessing()) {
        <div class="spinner-box">
          <div class="spinner"></div>
          <p>Traitement des données en cours... Observez si le spinner s'arrête de tourner !</p>
        </div>
      }

      <!-- Résultats -->
      @if (result(); as res) {
        <div class="results-card">
          <h3>📊 Résultats du traitement</h3>
          <p><strong>Temps d'exécution :</strong> {{ res.executionTimeMs }} ms</p>
          <p><strong>Lignes valides :</strong> {{ res.validProducts.length }} / {{ res.validProducts.length + res.errors.length }}</p>

          @if (res.errors.length > 0) {
            <div class="error-log">
              <h4>Erreurs détectées ({{ res.errors.length }}) :</h4>
              <ul>
                @for (err of res.errors.slice(0, 5); track err.line) {
                  <li>Ligne {{ err.line }} : {{ err.reason }}</li>
                }
              </ul>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .demo-container { max-width: 800px; margin: 2rem auto; font-family: sans-serif; }
    .metrics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
    .metric-card { padding: 1rem; border-radius: 8px; background: #f4f4f9; border: 2px solid #00c853; }
    .metric-card.danger { border-color: #d50000; background: #ffebee; }
    .metric-card .value { display: block; font-size: 1.8rem; font-weight: bold; }
    .pulse-btn { margin-top: 0.5rem; padding: 0.5rem 1rem; background: #6200ea; color: white; border: none; border-radius: 4px; cursor: pointer; }
    .control-panel { background: #fff; border: 1px solid #ddd; padding: 1.5rem; border-radius: 8px; display: flex; flex-direction: column; gap: 1rem; }
    .file-upload { display: inline-block; padding: 0.8rem 1.2rem; background: #eceff1; border-radius: 4px; cursor: pointer; text-align: center; font-weight: bold; }
    .file-upload input { display: none; }
    .run-btn { padding: 0.8rem; background: #0288d1; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; }
    .run-btn:disabled { background: #cfd8dc; cursor: not-allowed; }
    .spinner-box { margin-top: 1rem; text-align: center; }
    .spinner { margin: 0 auto; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #0288d1; border-radius: 50%; animation: spin 1s linear infinite; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .results-card { margin-top: 1.5rem; padding: 1rem; background: #e8f5e9; border-radius: 8px; }
    .error-log { background: #fff; padding: 0.5rem 1rem; border-radius: 4px; margin-top: 0.5rem; color: #c62828; }
  `]
})
export class CsvDemoComponent implements OnInit, OnDestroy {
  fps = signal(60);
  clickCount = signal(0);
  useWorker = signal(true);
  isProcessing = signal(false);
  csvContent = signal<string | null>(null);
  result = signal<WorkerResult | null>(null);

  private worker?: Worker;
  private lastFrameTime = performance.now();
  private frameCount = 0;
  private animFrameId?: number;

  ngOnInit(): void {
    this.startFpsTracker();
    this.initWorker();
  }

  private initWorker(): void {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('./csv-parser.worker', import.meta.url), { type: 'module' });
      this.worker.onmessage = ({ data }: { data: WorkerResult }) => {
        this.result.set(data);
        this.isProcessing.set(false);
      };
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const reader = new FileReader();
    reader.onload = (e) => this.csvContent.set(e.target?.result as string);
    reader.readAsText(input.files[0]);
  }

  processCsv(): void {
    const content = this.csvContent();
    if (!content) return;

    this.isProcessing.set(true);
    this.result.set(null);

    if (this.useWorker() && this.worker) {
      // 🚀 Mode Web Worker : Le thread UI reste fluide
      this.worker.postMessage(content);
    } else {
      // ⚠️ Mode Main Thread : On force l'exécution synchrone sur l'UI thread
      setTimeout(() => {
        const startTime = performance.now();
        const lines = content.split('\n');
        const validProducts: ProductRow[] = [];
        const errors: { line: number; reason: string }[] = [];

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i]?.trim();
          if (!line) continue;
          const [sku, name, rawPrice, rawVat] = line.split(',');
          const price = parseFloat(rawPrice);
          const vatRate = parseFloat(rawVat);

          // Même boucle factice d'alourdissement
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
        this.result.set({ validProducts, errors, executionTimeMs: Math.round(endTime - startTime) });
        this.isProcessing.set(false);
      }, 50);
    }
  }

  private startFpsTracker(): void {
    const loop = () => {
      const now = performance.now();
      this.frameCount++;
      if (now - this.lastFrameTime >= 1000) {
        this.fps.set(this.frameCount);
        this.frameCount = 0;
        this.lastFrameTime = now;
      }
      this.animFrameId = requestAnimationFrame(loop);
    };
    this.animFrameId = requestAnimationFrame(loop);
  }

  ngOnDestroy(): void {
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    this.worker?.terminate();
  }
}