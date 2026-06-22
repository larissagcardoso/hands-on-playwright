FROM mcr.microsoft.com/playwright:v1.61.0-noble

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV CI=true
ENV ENV=qa

CMD ["npm", "test"]
