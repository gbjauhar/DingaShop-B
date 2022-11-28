import express from 'express';
import routerUser from './user.routes.js';
import routerSales from './sales.routes.js';
import routerSessions from './sessions.routes.js';
import routerProducts from './products.routes.js';

const routes = express.Router();

routes.use(routerProducts);
routes.use(routerUser);
routes.use(routerSessions);
routes.use(routerSales);

export default routes;
