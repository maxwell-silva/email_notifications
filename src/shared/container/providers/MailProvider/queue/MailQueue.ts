import Queue from 'bull';

const MailQueue = new Queue('Mail');

export default MailQueue;
