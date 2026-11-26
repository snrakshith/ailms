import client from 'prom-client';
import type { RequestHandler } from 'express';
import { timingSafeEqual } from 'node:crypto';
import { env } from '../../../config/env.js';

const registry = new client.Registry();
client.collectDefaultMetrics({register:registry, prefix:'sapling_api_'});
const duration = new client.Histogram({ name:'sapling_http_request_duration_seconds', help:'HTTP request duration', labelNames:['method','route','status'], buckets:[0.005,0.01,0.025,0.05,0.1,0.25,0.5,1,2.5,5], registers:[registry] });
export const metricsMiddleware: RequestHandler = (req,res,next) => {
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    const secs = Number(process.hrtime.bigint() - start) / 1e9;
    // Never use raw URLs or tenant IDs as Prometheus labels.
    const route = req.route?.path ? `${req.baseUrl}${String(req.route.path)}` : 'unmatched';
    duration.observe({method:req.method,route,status:String(res.statusCode)},secs);
  });
  next();
};
export const metricsHandler: RequestHandler = async (req,res) => {
  const supplied = req.header('authorization')?.replace(/^Bearer /i,'') ?? '';
  const expected = env.METRICS_TOKEN;
  if (supplied.length !== expected.length || !timingSafeEqual(Buffer.from(supplied),Buffer.from(expected))) {
    res.sendStatus(403); return;
  }
  res.setHeader('Content-Type',registry.contentType);
  res.send(await registry.metrics());
};
