FROM node:18

RUN mkdir /my-onsen-book-next
WORKDIR /my-onsen-book-next

ADD package.json /my-onsen-book-next/package.json
ADD yarn.lock /my-onsen-book-next/yarn.lock

RUN yarn install

ADD . /my-onsen-book-next
