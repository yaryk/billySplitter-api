import express from 'express';
import setupMiddleware from './middleware';
import { restRouter } from './api';
import dbConnect from './db';
import { notFound } from './api/modules/errors/errorHandler';

const app = express();

setupMiddleware(app);
dbConnect();

// routes
// app.use('/auth', authRouter);
app.use('/api', restRouter); // set guard from auth

app.use('*', notFound);

export default app;
