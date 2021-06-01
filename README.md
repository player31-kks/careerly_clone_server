# 커리어리 클론코딩 - Backend <br>

Hoxy~🤔 함께 성장할 동료(Coworkers) 찾으시나요👀<br>

기획자, 개발자, 디자이너 동료들을 모코모코(MocoMoco)에서 찾아보세요✨<br>

모코모코는 함께 스터디 또는 프로젝트 등을 하면서 성장할 동료를 찾는 어플리케이션입니다!<br><br>
![커리어리 목업](https://user-images.githubusercontent.com/71073823/120266720-7156b180-c2dd-11eb-8b78-6318d87ef133.jpg)


## 🤔 기획 의도
복수 전공생으로서 같이 코딩을 공부하고, 고민을 나눌 사람에 대한 필요성을 느껴왔습니다.

혼자 하는 공부도 중요하지만, 같이 목표를 세우고 달려가는 페이스 메이커도 중요하다고 생각합니다.

함께하는 동지를 만들어 보는 것은 어떨까요? 여러분의 동료를 만들어 드릴께요👊🏻

함께해요 모코모코!!!
<hr>

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

## ⚒️개발 스펙
**✨Node.js✨**<br>

개발 언어 : **javascript**

데이터베이스 : **MongoDB**

배포 : **AWS , S3(이미지)**
![커리어리](https://user-images.githubusercontent.com/57718605/120266994-078ad780-c2de-11eb-82eb-f408464e811c.PNG)

## ✨프로젝트 중 고민한 부분✨
### 1. 오프라인 상태에서 채팅보내기

소켓이 연결된 상태에서 메세지를 저장하게 된다면 오프라인 상태에서는 소켓이 연결되지 않으므로 메세지를 받기 힘들다.

따라서 API를 통해 채팅 기록을 데이터베이스에 저장하게 된다면 오프라인 상태에서도 message를 나중에 열람이 가능하다.

```tsx
private createChat: RequestHandler = async (req, res, next) => {
    const userId = res.locals.user;
    const chatData: Chat = req.body;
    const { roomId } = req.params;
    if (!Types.ObjectId.isValid(roomId)) next(new Error("오브젝트 아이디가 아닙니다"));

    try {
      const chat = await this.chatService.creatChat(chatData, userId, roomId);
      // 여기를 통해 소켓에서 메세지를 보낸다.
      req.app.get("io").of("/chat").to(roomId).emit("chat", chat);
      return res.send({ result: "success" });
    } catch (err) {
      next(err);
    }
  };
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
