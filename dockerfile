FROM node:lts-alpine as build
WORKDIR /chatkid-frontend
COPY . .
RUN yarn install
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]

FROM nginx:latest
COPY --from=build /chatkid-frontend/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]