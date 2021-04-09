test("배열의 구조 분해 확인을 위한 테스트", () => {
  const postSelect = [
    "user",
    "content",
    "url",
    "sharedCnt",
    "recommendedCnt",
    "commentCnt",
    "createdAt",
  ]
  const postSelectCheck = [
    "user",
    "content",
    "url",
    "sharedCnt",
    "recommendedCnt",
    "commentCnt",
    "createdAt",
    "recommended",
  ]
  expect(["recommended", ...postSelect]).toBe(postSelectCheck)
})
