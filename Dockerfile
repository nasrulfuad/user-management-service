FROM node:18-alpine AS develop
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
COPY . .
# Dont run migrations here, because it will run on every build
RUN npm run db:migrate
RUN npx prisma generate
RUN npm run build

FROM node:18-alpine AS production
WORKDIR /app
ENV NODE_ENV production
COPY --from=develop /app/node_modules ./node_modules
COPY --from=develop /app/prisma ./prisma
COPY --from=develop /app/package*.json ./
COPY --from=develop /app/dist ./dist
RUN npm install --omit=dev
EXPOSE 3000
CMD ["npm", "start"]
