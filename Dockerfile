FROM node:22
WORKDIR /app

COPY . .
RUN npm install

ARG PORT
ENV PORT=${PORT}
EXPOSE ${PORT}

RUN npm run build

CMD ["npm", "run", "preview"]
