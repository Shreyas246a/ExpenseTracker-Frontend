FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM node:24-alpine
WORKDIR /app
RUN npm install -g serve
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder /app/dist ./dist
USER appuser
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]