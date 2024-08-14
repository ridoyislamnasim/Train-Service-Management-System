import 'dotenv/config';

const {
  NODE_ENV,
  SERVER_VERSION,
  PORTV1,
  PORTV2,
  HOST,
  LOCAL_DB_URL,
  LOCAL_DB_NAME,
  LOCAL_DB_NAME_V1,
  LOCAL_DB_NAME_V2,
  LOCAL_DB_USER,
  LOCAL_DB_PASS,
  REMOTE_DB_URL,
  REMOTE_DB_NAME,
  REMOTE_DB_USER,
  REMOTE_DB_PASS,
  JWT_ACCESS_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY,
  UPLOAD_FOLDER,
  UPLOAD_PATH,
  SMTP_SERVICE,
  SMTP_USER,
  SMTP_PASS,
  SMS_API_KEY,
  SMS_API_URL,
  SMS_SENDER_ID,
  REDIS_HOST,
  REDIS_PORT
} = process.env;

const config = {
  port: SERVER_VERSION === 'v1' ? PORTV1 : PORTV2,
  host: HOST,
  databaseName: SERVER_VERSION === 'v1' ? LOCAL_DB_NAME_V1 : LOCAL_DB_NAME_V2,
  // databaseName: NODE_ENV === 'dev' ? LOCAL_DB_NAME : REMOTE_DB_NAME,
  databaseUser: NODE_ENV === 'dev' ? LOCAL_DB_USER : REMOTE_DB_USER,
  databasePass: NODE_ENV === 'dev' ? LOCAL_DB_PASS : REMOTE_DB_PASS,
  databaseUrl: NODE_ENV === 'dev' ? LOCAL_DB_URL : REMOTE_DB_URL,
  jwtAccessSecretKey: JWT_ACCESS_SECRET_KEY,
  jwtRefreshSecretKey: JWT_REFRESH_SECRET_KEY,
  uploadFolder: UPLOAD_FOLDER,
  uploadPath: UPLOAD_PATH,
  smtpService: SMTP_SERVICE,
  smtpUser: SMTP_USER,
  smtpPass: SMTP_PASS,
  smsKey: SMS_API_KEY,
  smsUrl: SMS_API_URL,
  smsSenderId: SMS_SENDER_ID,
  redisHost: REDIS_HOST,
  redisPort: REDIS_PORT

};

export default config;
