FROM node:14-alpine as builder
ENV NODE_ENV=development
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src src
RUN npm run build

FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY --from=builder /app/dist dist
CMD [ "npm", "run", "start" ]
