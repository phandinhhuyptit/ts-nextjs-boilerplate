import express from 'express';
import next from 'next';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import proxy from 'http-proxy-middleware';

dotenv.config();

const port = process.env.PORT;

const server = express();
server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(
  '/api',
  proxy({
    target: process.env.BASE_API_URL,
    changeOrigin: true,
  }),
);

async function startServer() {
  const nextApp = next({dev: process.env.NODE_ENV !== 'production'});
  const nextHandler = nextApp.getRequestHandler();
  await nextApp.prepare();
  server.all('*', (req, res) => nextHandler(req, res));
  server.listen(port, () => {
    console.info(`Server started at ${process.env.BASE_URL}`);
  });
}

startServer();
