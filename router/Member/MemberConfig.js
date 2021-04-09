// Member에 대한 정보를 선택적으로 구성하기 위해서 배열 생성
// model.select([...findUserByIdConfig])
const findUserByIdConfig = {
  email: 0,
  password: 0,
  createdAt: 0,
  updatedAt: 0,
  phone: 0,
  follower: 0,
  following: 0,
  __v: 0,
}

module.exports = {
  findUserByIdConfig,
}
