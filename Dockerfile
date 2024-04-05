# node v18 버전 Base Image를 기반으로 실행
FROM node:18 AS development
# copy한 file이  root로 들어오는 것을 방지하기 위해 work dir를 분리
WORKDIR /usr/src/app
# local file을 도커로 복사

# package*.json으로 나눠놓은 이유
# 기존에 작성해놓으면, caching을 통해 효율이 더 높음
COPY package*.json ./
# package.json 내용 반영
RUN npm install
COPY ./ ./

# 노출 port
EXPOSE 3000
# 컨테이너 시작 시, 실행 명령어
CMD ["npm", "start"]

# 실행방법
## docker build . -t 이미지_이름
## docker run -p 3500:3000 -v /usr/src/app/node_modules -v $(pwd):/usr/src/app 이미지_이름
### https://velog.io/@kansun12/%EB%8F%84%EC%BB%A4%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%B0%B0%ED%8F%AC%ED%95%B4%EB%B3%B4%EA%B8%B0