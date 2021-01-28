# 프론트엔드 취업 소식

프론트엔드 직군으로 취업을 준비하는 사람 혹은 이직을 준비하는 사람들끼리 구인 공고를 공유하는 사이트다. 사용자는 자신이 본 공고를 등록 혹은 수정할 수 있으며, 댓글로 다른 유저의 반응을 살필 수 있다. 또한, 검색과 태그를 통해 자신이 원하는 공고를 제한해서 볼 수 있다. 원하는 공고를 따로 저장할 수 있다.

## 실서버 링크

[www.fenews.tk](https://www.fenews.tk)

## 기능 설명

- 구글 Oauth 사용해서 로그인, 회원가입 구현
- React로 프론트 구성, Express로 백 구성
- styled-component, ant-design으로 웹 디자인 구성
- MongoDB로 데이터 관리, Express에서 mongoose로 쿼리 실행
- Redux 사용해서 전역에서 상태값 관리
- Redux-saga 사용해서 비동기 처리
- multer 라이브러리 사용해서 이미지 업로드 구현
- 검색과 태그 기능 구현
- 페이징 기능 구현으로 불필요한 데이터 절약
- emailjs 라이브러리를 통해 신고 기능 구현
- kakao map API 연동을 통한 위치기반 위치 등록
- letsencrypt 사용해서 https 적용 및 helmet 라이브러리, hpp 라이브러리를 사용해서 웹 보안 향상
- NGINX를 적용해서 다량 동시 접속 요청에 대비

## 영상

[영상 링크](https://youtu.be/jpMWMrHVrdk)
![caption](./FEnews.gif)

## 실행 방법

```
$ git clone https://github.com/geum-yong/FE_project.git

// 백 서버 실행
$ cd back
$ npm i && npm start

// 프론트 서버 실행
$ cd front
$ npm i && npm start
```

## 서버(DB&API) 명세서

- ### DB 명세
  - Users
    - id : 유저 고유값
    - email : google 이메일
    - joinDate : 가입년도
    - userLikes : 관심등록한 공고 객체가 들어있는 배열
  - Jobs
    - id : 공고 고유 id
    - userId : 공고를 등록한 유저 email
    - createDate : 공고 생성 날짜
    - updateDate: 공고를 수정한 날짜
    - imgPath : 로고 이미지 경로
    - companyName : 회사명
    - experienceLevel : 경력사항
    - introduce : 회사 소개
    - task : 담당 업무
    - condition : 자격 조건
    - preferentialTreatment : 우대 사항
    - skills : 기술 스택이 들어있는 배열
    - welfare : 복지
    - deadline : 마감일
    - address1 : 도로명까지의 주소
    - address2 : 나머지 상세 주소
    - source : 공고 원본이 있는 주소
    - other : 기타 추가 정보
    - cntLike : 관심 등록 숫자
    - deletedDate : 삭제 날짜
    - comments : 댓글 배열
  - counters
    - seq : job 고유 id
- ### API 명세
  - users
    - 유저 정보 등록
      - POST api/users
    - 유저 조회
      - GET api/users/:id
    - 유저 관심 등록
      - PUT api/users/like
    - 유저 관심 등록 취소
      - PUT api/users/unlike
  - jobs
    - 공고 리스트 조회
      - GET api/jobs
    - 공고 조회
      - GET api/jobs/:id
    - 공고 등록
      - POST api/jobs
    - 공고 수정
      - PUT api/jobs/:id
    - 공고 삭제
      - DELETE api/jobs/:id
    - 공고 검색
      - GET api/jobs/find/:companyName
    - 관심 숫자 증가
      - PUT api/jobs/like
    - 관심 숫자 감소
      - PUT api/jobs/unlike
    - 댓글 등록
      - PUT api/jobs/addComment
    - 댓글 등록
      - PUT api//jobs/addComment
    - 댓글 삭제
      - PUT api/jobs/replaceComment
    - tag 리스트 가져오기
      - GET api/jobs/tags
    - tag에 따른 job list 조회
      - GET api/jobs/tags/:tags
    - 이미지 업로드
      - POST api/jobs/upload

## References

- [페이지 기획서](https://whimsical.com/fe-frame-DEPMKETPLR6bPDR9Xq36V)
- [기능 설명서](https://www.notion.so/4a004c93e81143709f05bf1f7eacfded)
- [DB 명세서](https://www.notion.so/fenews/DB-2d77b95d1a344749a67fa9b6274c5129)
- [API 명세서](https://www.notion.so/fenews/API-54c5590308cc4c02a2ba0ec11cc72817)
- [개발 프로세스 칸반 보드](https://www.notion.so/fenews/86a7bd2377894a4a9ba70ae116957e40?v=4e2ae3b31b354d989716eb344b1987a1)
