FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# DEBUG: show env file
RUN echo "----- ENV FILE -----" && cat .env

RUN npm run build   # <-- env is read HERE

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
