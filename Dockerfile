# 基础镜像
FROM node:14.18  as builder

WORKDIR /
COPY package.json package-lock.json /

RUN npm install

COPY . /
RUN npm run build