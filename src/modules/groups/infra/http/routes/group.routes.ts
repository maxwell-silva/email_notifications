import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import GroupController from '../controllers/GroupController';

const groupRouter = Router();
const groupController = new GroupController();

groupRouter.use(ensureAuthenticated);
groupRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      email: Joi.string().email().required(),
      name: Joi.string().required(),
    },
  }),
  groupController.create,
);

export default groupRouter;
