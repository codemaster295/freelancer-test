
const db = require('../config/db')
const fastify = require('fastify')
const getUserCounts=async(request, reply)=>{
    try {
        const [rows] = await db.execute('SELECT COUNT(*) as total FROM user_list');
        return { 
          totalUsers: rows[0].total 
        };
      } catch (error) {
        fastify.log.error(error);
        reply.status(500).send({ 
          error: 'Database query failed', 
          details: error.message 
        });
      }
}

module.exports = {getUserCounts}