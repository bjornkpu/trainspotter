const config ={
  cronTime: process.env.CRON_TIME || "* * * * *",
  mail: {
    host: process.env.MAIL_HOST || '',
    port: Number(process.env.MAIL_PORT) || 587,
    secure: 
      (process.env.MAIL_SECURE?.toLowerCase() === 'true') 
        ? true 
        : false ,
    auth: {
      user: process.env.MAIL_USER || '',
      pass: process.env.MAIL_PASS || '',
    }
  }
}
export default config