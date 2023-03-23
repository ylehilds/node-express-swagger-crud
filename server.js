const express = require('express')
const app = express();
import bodyParser from 'body-parser';
import { getUserList, findUserById} from './users'
const userList = getUserList() // dummy database layer

// Configuring body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// GET all users
app.get('/users', (req, res) => {
  return res.status(200).send({
    success: 'true',
    message: 'users',
    users: userList
  })
})

// GET specific user
app.get('/user/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({success: 'false', message: 'id is required',})
  }
  const id = parseInt(req.params.id, 10)
  return res.status(200).send({
    success: 'true',
    message: 'user',
    user: findUserById(id)
  })
})

// Add user
app.post('/user', (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({success: 'false', message: 'name is required',})
  } else if (!req.body.companies) {
    return res.status(400).send({success: 'false', message: 'companies is required',})
  }
  const user = {
    id: userList.length + 1,
    isPublic: req.body.isPublic,
    name: req.body.name,
    companies: req.body.companies,
    books: req.body.books
  }
  userList.push(user)
  return res.status(201).send({success: 'true', message: 'user added successfully', user,})
})

// Update user
app.put('/user/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  const updatedUser = {
    id: id,
    isPublic: req.body.isPublic,
    name: req.body.name,
    companies: req.body.companies,
    books: req.body.books
  }
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].id === id) {
      userList[i] = updatedUser
      return res.status(200).send({
        success: 'true',
        message: 'user added successfully',
        updatedUser
      })
    }
  }
  return res.status(404).send({
    success: 'true',
    message: 'error in update'
  })
})

// Delete user
app.delete('/user/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].id === id) {
      userList.splice(i, 1)
      return res.status(204).send({
        success: 'true',
        message: 'user deleted successfully'
      })
    }
  }
  return res.status(404).send({
    success: 'true',
    message: 'error in delete'
  })
})

// Run App
app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
})