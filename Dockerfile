FROM node:14
RUN mkdir /workspace
WORKDIR /workspace
COPY . .
RUN yarn install --production
CMD ["yarn", "start"]
