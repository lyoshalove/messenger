export const getEnvFileName = () => {
  const mode = process.env.NODE_ENV.trim() || 'dev';

  return mode === 'dev' ? 'development.env' : 'production.env';
};
