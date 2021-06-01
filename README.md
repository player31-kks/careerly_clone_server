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
    ![](https://img.shields.io/badge/ReactNative-노화성-red?style=for-the-badge)
    
    https://github.com/delilah1004/Careerly_Clone
    
  - **BACKEND** 
     
     ![](https://img.shields.io/badge/Node.js-금교석-blue?style=for-the-badge)
     ![](https://img.shields.io/badge/Node.js-박현준-blue?style=for-the-badge)
<hr>

## 🎥 시연 영상
[![Video Label](http://img.youtube.com/vi/CHOEWGQJMfU/0.jpg)](https://www.youtube.com/watch?v=CHOEWGQJMfU)
<hr>

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

따라서 User document에 follwing follower field list 값으로 설정하면서 간단한 코드로 기능을 구현했습니다.

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

### 2. 비밀번호 찾기 구현
비밀번호 찾기를 할 시에 어떻게 비밀번호를 사용자에게 전달하는 방식이 고민되었습니다.

문자메세지로 보내고 싶었지만, 실제 돈이 들 수 있다는 사실 때문에 망설여졌습니다.

결과적으로 저희는 노드메일러를 사용하여 이메일로 비밀번호를 전송하는 방법을 선택했습니다.

```tsx

const nodemailer = require("nodemailer")

    let info = await transporter.sendMail({
      from: `"CC Team"`,
      to: `${user.email}`,
      subject: "커리어리 클론 코딩 비밀번호입니다",
      text: "ㅠㅠ",
      html: `<b>${user.password}</b>`,
    })
    console.log("Message sent: %s", info.messageId)
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Sent Auth Email",
    })
```

다음에 기회가 된다면 문자메세지로 전달하는 방식, 또는 비밀번호 수정페이지의 링크를 전달하는 방식 등을
적용해보고 싶다고 생각했습니다.


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
