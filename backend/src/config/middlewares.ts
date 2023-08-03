import { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

export const contentType = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.type('json');
  next();
};

export default (app: Express): void => {
  app.use(
    cors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      preflightContinue: true,
      allowedHeaders: [
        'Content-Type',
        'content-type',
        'Authorization',
        'Content-Length',
        'X-Requested-With',
        'Origin',
        'Accept',
        'x-access-token',
        'x-app',
      ],
      optionsSuccessStatus: 200,
      maxAge: 864000,
    }),
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(contentType);
  app.options('/.*/', (req, res, next) => {
    res.send(200);

    return next();
  });
};