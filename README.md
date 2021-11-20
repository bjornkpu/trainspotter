# Trainspotter

# Trainspotter

My morning train sometimes gets canceled. I'm not going to stat checking the arrivaltimes every morning, so an automated system can do that for me.


## Features

- Fetch the train API every weekday morning at 06:00
- Checks for errors or deveating expectedStartTime
- If abnormalities are found a mail is sendt


## Run Locally

Clone the project

```bash
git clone https://github.com/bjornkpu/trainspotter.git
```

Go to the project directory

```bash
cd trainspotter
```

Install dependencies

```bash
npm install
```

Start the dev program

```bash
npm run dev
```

Start the compiled program

```bash
npm run build
npm run start
```


## Deployment

To deploy this project run this on your server

```bash
npm run docker:build
docker-compose up -d
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`CRON_TIME`

`MAIL_HOST`

`MAIL_USER`

`MAIL_PASS`


## Authors

- [@bjornkpu](https://www.github.com/bjornkpu)

