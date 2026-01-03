# ---------- BUILD STAGE ----------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# ---------- PRODUCTION STAGE ----------
FROM nginx:alpine

# Copy React build
COPY --from=build /app/dist /usr/share/nginx/html

# ✅ Copy NGINX config (THIS IS THE KEY FIX)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
