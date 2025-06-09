# Используем официальный Node.js образ
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Если нужно — прогоняем сборку (если используешь TypeScript)
# RUN npm run build

EXPOSE 80

# Команда запуска
CMD ["npm", "run", "start"]
