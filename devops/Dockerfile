# Build application
FROM node:18-alpine as builder
WORKDIR /usr/src/app
COPY . .
RUN yarn --ignore-scripts && \
    yarn add -D handpick --ignore-scripts && \
    yarn run handpick --target=devDependencies --filter=lintDependencies --filter=testDependencies && \
    yarn run build

# Build production image
FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app 
COPY --from=builder /usr/src/app/public public 
COPY --from=builder /usr/src/app/views views 
COPY --from=builder /usr/src/app/dist/src ./dist
COPY --from=builder /usr/src/app/package.json /usr/src/app/yarn.lock /usr/src/app/.npmrc ./
RUN yarn install --production && \
    yarn cache clean
EXPOSE 3001
CMD ["node", "dist/main.js"]