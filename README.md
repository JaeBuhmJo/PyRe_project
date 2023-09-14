## 프로젝트명
**안전한 놀이터**
 - OAuth2.0 + JWT 기반으로 하여 소셜 로그인 외에 추가 개인정보를 요청하지 않는 웹게임 사이트입니다.


## 프로젝트 개요
 - 카카오 로그인 후 자신의 닉네임을 설정하여 웹게임 사이트를 이용할 수 있습니다.
 - OAuth2.0, Json Web Token 을 활용해보고자 만든 토이 프로젝트입니다.
 - React + Django구조의 RESTful한 사이트입니다.


## 기능 일람
- **회원 보안**
     - 카카오 소셜 로그인 only, 추가 요구 개인정보 0
     - 5분 유효기간의 Access Token과 30일 유효기간의 Refresh Token 발행
     - Refresh Token은 Httponly + Secure 쿠키로 발행하여 보안성 강화
     - 이를 위해 OpenSSL 인증서 발행하여 HTTPS 프로토콜 적용
     - 로그아웃 시 해당 Refresh Token은 잔여 수명만큼 Redis에 블랙리스트로 저장, 갱신요청 거부


- **웹게임 1pc 오목**
     - 웹에서 오목판 이미지 + JavaScript 소스로 만들어진 오목 게임 플레이 가능
     - 1pc 기준 흑, 백 차례 번갈아가며 플레이
     - 착수 시 승리 및 삼삼 금지는 정규식을 기반으로 필터링


## 사용 기술 스택
- Language : Python, JavaScript
- Database : SQLite, Redis
- Framework : React, Django, React Bootstrap
- Libraries : django-rest-framework, django-cors-headers, PyJWT, js-cookie, etc. 
- Version Control : Git


## 주요 참고 자료
- 카카오 로그인 REST API docs - [kakao developers](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api)
- PyJWT 라이브러리 - [PyJWT docs](https://pyjwt.readthedocs.io/en/stable/usage.html)
