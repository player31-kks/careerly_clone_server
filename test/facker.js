const faker = require("faker")
faker.locale = "ko"
const { User } = require("../models")
const axios = require("axios")
const URI = "http://52.79.227.130"

generateFakeData = async (userCount, blogsPerUser, commentsPerUser) => {
  try {
    if (typeof userCount !== "number" || userCount < 1)
      throw new Error("userCount must be a positive integer")
    if (typeof blogsPerUser !== "number" || blogsPerUser < 1)
      throw new Error("blogsPerUser must be a positive integer")
    if (typeof commentsPerUser !== "number" || commentsPerUser < 1)
      throw new Error("commentsPerUser must be a positive integer")

    let users = []
    let blogs = []
    let comments = []

    for (let i = 0; i < userCount; i++) {
      users.push(
        new User({
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          role: faker.name.jobTitle(),
        })
      )
    }

    console.log("fake data inserting to database...")

    await User.insertMany(users)
    console.log(`${users.length} fake users generated!`)

    users.map((user) => {
      for (let i = 0; i < blogsPerUser; i++) {
        blogs.push(
          axios.post(`${URI}/post`, {
            content: faker.lorem.paragraphs(),
            url: faker.internet.url(),
            userId: user._id,
          })
        )
      }
    })

    let newBlogs = await Promise.all(blogs)
    console.log(`${newBlogs.length} fake blogs generated!`)

    users.map((user) => {
      for (let i = 0; i < commentsPerUser; i++) {
        let index = Math.floor(Math.random() * blogs.length)
        comments.push(
          axios.post(`${URI}/comment/${newBlogs[index].data.post._id}`, {
            content: faker.lorem.sentence(),
            userId: user._id,
          })
        )
      }
    })

    await Promise.all(comments)
    console.log(`${comments.length} fake comments generated!`)
    console.log("COMPLETE!!")
  } catch (err) {
    console.log(err)
  }
}

module.exports = generateFakeData
