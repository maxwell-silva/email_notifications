import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import DistributionsController from '../controllers/DistributionsController';

const subscriptionRouter = Router();
const distributionsController = new DistributionsController();
subscriptionRouter.use(ensureAuthenticated);

subscriptionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      groups: Joi.array().required(),
      subject: Joi.string().required(),
      viewId: Joi.string().required(),
      excludSubscribersByGroup: Joi.array(),
    },
  }),
  distributionsController.create,
);

export default subscriptionRouter;
