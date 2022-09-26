# Specify base image
FROM node:16.15.1-alpine

# Setup working diretory
WORKDIR /usr/app

# Copy package.json and package-lock.json
COPY ./package*.json .

# install deps
RUN npm install

# Copy stuff from build context to work directory in container
COPY . .

# Expose PORT 3030
EXPOSE 3030

# Setup env variables
ENV NODE_ENV production
ENV PORT 3030

# specify startup command
CMD ["npm", "start"]