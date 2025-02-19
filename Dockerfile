FROM node:18

WORKDIR /app

COPY langbara-express ./langbara-express

COPY langbara-nextjs ./langbara-nextjs

WORKDIR /app/langbara-express
RUN npm install

WORKDIR /app/langbara-nextjs
RUN npm install

WORKDIR /app

EXPOSE 3000 8000

RUN npm install -g concurrently

CMD ["concurrently", "npm --prefix ./langbara-express run dev", "npm --prefix ./langbara-nextjs run dev"]

