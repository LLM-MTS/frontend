# # Стадия сборки
# FROM node:lts AS builder

# WORKDIR /usr/src/app

# # 1. Копируем только файлы зависимостей
# COPY package*.json ./

# # 2. Устанавливаем зависимости
# RUN npm ci

# # 3. Копируем исходный код
# COPY . .

# # 4. Собираем проект
# RUN npm run build

# # Финальный образ
# FROM node:lts-alpine

# WORKDIR /usr/src/app

# # Копируем только собранные файлы
# COPY --from=builder /usr/src/app/build ./build

# # Устанавливаем serve (лучше конкретную версию)
# RUN npm install -g serve@14.2.0

# EXPOSE 3000

# # Используем правильный путь к билду
# CMD ["serve", "-s", "build", "-l", "3000"]

# → builder stage:
FROM node:lts AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build       # now this should succeed

# → final stage unchanged
FROM node:lts-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/build ./build
RUN npm install -g serve@14.2.0
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
    