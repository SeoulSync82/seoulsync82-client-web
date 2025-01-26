FROM node:lts-slim

WORKDIR /app
COPY . .
RUN npm install

EXPOSE 7011
ENTRYPOINT ["npm", "run", "dev", "--", "--host", "0.0.0.0"]