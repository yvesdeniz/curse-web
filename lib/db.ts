import mongoose from 'mongoose';

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

const cache = global._mongoose ?? { conn: null, promise: null };
global._mongoose = cache;

export async function connectDB(): Promise<typeof mongoose> {
  if (cache.conn) return cache.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');

  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, { dbName: 'shd' });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
