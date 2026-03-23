FROM node:20-alpine

WORKDIR /app

# 只拷贝依赖相关文件用于构建缓存；代码本身通过 docker-compose 运行时挂载。
COPY frontend/package*.json ./
RUN npm ci --no-audit --no-fund

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]

