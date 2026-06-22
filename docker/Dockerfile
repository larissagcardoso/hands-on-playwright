FROM mcr.microsoft.com/playwright:v1.49.1-noble

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV CI=true
ENV ENV=qa

CMD ["npm", "test"]
