import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import NotificationsController from '../controllers/NotificationsController';

const subscriptionRouter = Router();
const notificationsController = new NotificationsController();
subscriptionRouter.use(ensureAuthenticated);

subscriptionRouter.post('/', notificationsController.create);

export default subscriptionRouter;
