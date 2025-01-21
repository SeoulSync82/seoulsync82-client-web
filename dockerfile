FROM node:lts-slim

WORKDIR /app
COPY . .
RUN npm install

EXPOSE 5005
ENTRYPOINT ["npm", "run", "dev", "--", "--host", "0.0.0.0"]