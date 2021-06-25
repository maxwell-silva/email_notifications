import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import DistributionsController from '../controllers/DistributionsController';

const subscriptionRouter = Router();
const distributionsController = new DistributionsController();
subscriptionRouter.use(ensureAuthenticated);

subscriptionRouter.post('/', distributionsController.create);

export default subscriptionRouter;
