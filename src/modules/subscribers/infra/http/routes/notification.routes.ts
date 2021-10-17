import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import NotificationByJSONController from '../controllers/NotificationByJSONController';
import NotificationsController from '../controllers/NotificationsController';

const subscriptionRouter = Router();
const notificationsController = new NotificationsController();
const notificationByJSONController = new NotificationByJSONController();

subscriptionRouter.use(ensureAuthenticated);

subscriptionRouter.post('/', notificationsController.create);
subscriptionRouter.post(
  '/json',
  celebrate({
    [Segments.BODY]: {
      key: Joi.string().required(),
      subject: Joi.string().required(),
      viewId: Joi.string().uuid().required(),
      from: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
      }).required(),
      contacts: Joi.array()
        .items(
          Joi.object()
            .keys({
              name: Joi.string().required(),
              email: Joi.string().required(),
              variables: Joi.object(),
            })
            .required(),
        )
        .required(),
    },
  }),
  notificationByJSONController.create,
);

export default subscriptionRouter;
