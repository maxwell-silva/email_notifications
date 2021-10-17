import IParseMailTemplateDTO, {
  ITemplateVariables,
} from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}

export interface IMessageJob {
  id: string;
  from: IMailContact;
  contact: IMailContact;
  subject: string;
  view: string;
  distributionId: string;
  variables?: ITemplateVariables;
}
