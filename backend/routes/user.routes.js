
const userController=require('../controllers/user.controller')
async function userRoutes(fastify, options) {
    fastify.get('/usercount', userController.getUserCounts);
  }
  
module.exports = userRoutes;