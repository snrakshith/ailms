import type { NodeSDK } from '@opentelemetry/sdk-node';
let sdk: NodeSDK | undefined;
export async function startTelemetry(): Promise<void> {
  if (process.env.OTEL_ENABLED !== 'true') return;
  const {NodeSDK} = await import('@opentelemetry/sdk-node');
  const {getNodeAutoInstrumentations} = await import('@opentelemetry/auto-instrumentations-node');
  const {OTLPTraceExporter} = await import('@opentelemetry/exporter-trace-otlp-http');
  sdk = new NodeSDK({
    traceExporter: new OTLPTraceExporter({url: `${(process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? 'http://localhost:4318').replace(/\/$/,'')}/v1/traces`}),
    instrumentations:[getNodeAutoInstrumentations()],
  });
  sdk.start();
}
export async function stopTelemetry(): Promise<void> { await sdk?.shutdown(); }
