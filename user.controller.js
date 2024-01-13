const chalk = require('chalk')
const User = require('./models/User')
const bcrypt = require('bcrypt')

async function addUser(email, password) {
  const passordHash=await bcrypt.hash(password, 10)
  await User.create({email, password})

  console.log(chalk.bgGreen('User was added!'))
}


module.exports = {
  addUser
}
