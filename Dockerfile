FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY src ./src
COPY keys ./keys

ENV NODE_ENV=production
ENV PORT=3006

EXPOSE 3006

CMD ["npm", "start"]