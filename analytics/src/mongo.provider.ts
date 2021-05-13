export const mongoUriProvider = {
  provide: 'MONGO_URI',
  useValue: process.env.MONGODB_URI || null,
};
