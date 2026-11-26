import mongoose from 'mongoose';
import { env } from '../../../config/env.js';
export async function connectDatabase() {
  await mongoose.connect(env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 20,
    autoIndex: env.NODE_ENV !== 'production',
  });
}
export function databaseReady() {
  return mongoose.connection.readyState === 1;
}
export async function closeDatabase() {
  await mongoose.disconnect();
}
