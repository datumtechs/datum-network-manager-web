# 基础镜像
FROM ubuntu:18.04

EXPOSE 80

#更新为国内的镜像仓库，因为从默认官源拉取实在太慢了
RUN cp /etc/apt/sources.list /etc/apt/sources.list.bak
COPY ./apt_src.ubuntu18.04 /etc/apt/sources.list
RUN apt-get update

#install 相关依赖
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash - \
    apt-get -y install nodejs \
    apt-get -y install nginx && \

WORKDIR /
COPY package.json /
RUN npm install 

RUN npm run build
