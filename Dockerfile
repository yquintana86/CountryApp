# Stage 1 - the install dependencies process
FROM node:22-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm install

# Stage 2 - the build process
FROM node:22-alpine AS build

WORKDIR /app

COPY --from=base /app/node_modules ./node_modules

COPY . .

RUN npx ng build --configuration production --base-href=/ --deploy-url=/


# Stage 3 - the production environment

FROM nginx:alpine

COPY --from=build /app/dist/country-app/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
