FROM node:18-alpine

WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci

# Монтируем остальной код
COPY frontend/ /app/

# Запускаем CRA-сервер
CMD ["npm", "start"]
