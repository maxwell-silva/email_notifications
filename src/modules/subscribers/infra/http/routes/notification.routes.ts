import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import NotificationsController from '../controllers/NotificationsController';

const subscriptionRouter = Router();
const notificationsController = new NotificationsController();
subscriptionRouter.use(ensureAuthenticated);
/**
 * Implementar rota com validação do id da lista de distribuição -> agendar apenas quando ainda não enviado
 */
subscriptionRouter.post('/', notificationsController.create);

export default subscriptionRouter;
