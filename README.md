# 커리어리 클론코딩 - Backend <br>

## 🤔 기획 의도
실제 서비스가 어떻게 동작하는지 알아보고 싶어 개발자들의 대표적인 커뮤니티인 커리어리를 클론코딩했습니다.<br>
1주일라는 짧은 시간동안 최대한 서비스를 분석하면서 구현하는 것을 목표로 삼았습니다.<br>

![커리어리 목업](https://user-images.githubusercontent.com/71073823/120266720-7156b180-c2dd-11eb-8b78-6318d87ef133.jpg)

## 📌 프로젝트 기간 및 팀원 소개
- 기간 : 2021년 4월 3일 ~ 2021년 4월 9일

- 팀원
  - **CLIENT**
    
    ![](https://img.shields.io/badge/ReactNative-이다은-red?style=for-the-badge)
    
    
  - **BACKEND** 
     
     ![](https://img.shields.io/badge/Node.js-금교석-blue?style=for-the-badge)
     ![](https://img.shields.io/badge/Node.js-박현준-blue?style=for-the-badge)
<hr>

## 🎥 시연 영상
https://www.youtube.com/watch?v=CHOEWGQJMfU&t=29s
<hr>

[![Video Label](http://img.youtube.com/vi/CHOEWGQJMfU/0.jpg)](https://www.youtube.com/watch?v=CHOEWGQJMfU)

## ⚒️개발 스펙
**✨Node.js✨**<br>

개발 언어 : **javascript**

데이터베이스 : **MongoDB**

![커리어리](https://user-images.githubusercontent.com/57718605/120266994-078ad780-c2de-11eb-82eb-f408464e811c.PNG)

## ✨프로젝트 중 고민한 부분✨
### 1. following follower 구현하기

처음 구현시 following follower 각각 document를 만들어서 userId에 대응하는 사람을 따로 관리하려 했지만 

following follower에 대해 클라이언트 측이 많은 필요로 했었고, 

2번이나 document를 접근하는 것이 불필요한 작업이라고 생각했습니다. 

따라서 User document에 follwing follower field list 값으로 설정하면서 간단한 코드로 기능을 구현했다.

```tsx

const UserSchema = new Schema(
		// ... 생략했습니다.
    // follower: 사용자를 팔로우하는 사용자 id
    // following: 사용자가 팔로우하는 사용자 id
    follower: { type: [{ type: Types.ObjectId, ref: "User" }] },
    following: { type: [{ type: Types.ObjectId, ref: "User" }] },
    // followerCnt, followingCnt: 각각 팔로워와 팔로잉의 수
    // 사용자가 팔로우를 할 때 본인의 팔로잉, 상대방의 팔로워 카운트를 올린다
    followerCnt: { type: Number, default: 0, required: true },
    followingCnt: { type: Number, default: 0, required: true },
  },
  {
    timestamps: true,
  }
)
```

### 2. UTC 타임 문제 (스케줄링 관련)
모임의 시작 시간과 종료 시간을 받고, 모임 시작일이 지난 게시물의 경우에는 스케줄링을 통하여 상태를 변경시켜야 했다.

Node.js에서는 기본적으로 **UTC-0**을 기준으로 작동을 하였기에, 우리가 원하는 스케줄링을 위해서는 이에 관련한 고려가 필요했다.

클라이언트와 백엔드 모두 UTC-0을 기준으로 로직을 전체적으로 가다듬고, 14:59에 스케줄링을 진행하는 것으로 문제를 해결했다.

![UTC-0](https://user-images.githubusercontent.com/61581033/120128458-fa49ec00-c1fc-11eb-8c72-1ebe7015a797.jpeg)



### 3. 타입 스크립트에서의 multer-s3-transform 
multer-s3-transform 을 쓰려고 했지만 npm에 node-js는 지원을 하지만 typescript는 지원을 하지 않는다.

일단 코드에 적용을 시켜보니까 해당 모듈의 타입 지정이 되어있지 않은 오류가 났기 때문에, 잘 작동하는 다른 모듈을 대조해서 타입을 지정하는 파일을 작성했다. 

해당 파일을 @Types폴더에 넣은 결과 정상적으로 작동이 되었다.

```jsx
interface Options {
    s3: AWS.S3;
    bucket: ((req: Express.Request, file: Express.Multer.File, callback: (error: any, bucket?: string) => void) => void) | string;
    key?(req: Express.Request, file: Express.Multer.File, callback: (error: any, key?: string) => void): void;
    acl?: ((req: Express.Request, file: Express.Multer.File, callback: (error: any, acl?: string) => void) => void) | string;
    contentType?(req: Express.Request, file: Express.Multer.File, callback: (error: any, mime?: string, stream?: NodeJS.ReadableStream) => void): void;
    shouldTransform?: ((req: Express.Request, file: Express.Multer.File, callback: (error: any, shouldTransform?: boolean) => void) => void) | boolean;
    transforms: [
        {
            id: string,
            key: (req: Express.Request, file: Express.Multer.File, callback: (error: any, key?: string) => void) => void,
            transform: (req: Express.Request, file: Express.Multer.File, callback: (error: any, key?: function) => void) => void
        }
    ]
    contentDisposition?: ((req: Express.Request, file: Express.Multer.File, callback: (error: any, contentDisposition?: string) => void) => void) | string;
    metadata?(req: Express.Request, file: Express.Multer.File, callback: (error: any, metadata?: any) => void): void;
    cacheControl?: ((req: Express.Request, file: Express.Multer.File, callback: (error: any, cacheControl?: string) => void) => void) | string;
    serverSideEncryption?: ((req: Express.Request, file: Express.Multer.File, callback: (error: any, serverSideEncryption?: string) => void) => void) | string;
}
```



<!-- start with
node server.js

insomnia, postman 사용 시
Header 
Authorization / Bearer token


git bash로 서버에서 실행
pm2 start server.js

종료
pm2 delete 0

로그 찍기
pm2 log

가동 확인
ps -ef | grep 'server.js' -->
