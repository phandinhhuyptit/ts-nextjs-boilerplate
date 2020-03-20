import express from 'express';
import {NextPageContext} from 'next';
import {Store} from 'redux';

export interface ExpressReduxNextContext extends NextPageContext {
  req?: express.Request;
  res?: express.Response;
  store: Store;
  isServer?: boolean;
}
