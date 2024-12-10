const mysql = require('mysql2/promise');
require('dotenv').config();

// async function initializeDatabase() {
//   try {
//     // Create a connection without specifying a database
//     const connection = await mysql.createConnection({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASS,
//       multipleStatements: true  // Enable multiple statement support
//     });

//     // First, create the database
//     await connection.query('CREATE DATABASE IF NOT EXISTS test001');

//     // Then, connect to the specific database
//     await connection.query('USE test001');

//     // Create the table
//     await connection.query(`
//       CREATE TABLE IF NOT EXISTS user_list (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         username VARCHAR(50) NOT NULL UNIQUE,
//         email VARCHAR(100) NOT NULL UNIQUE,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `);

//     // Insert dummy users
//     await connection.query(`
//       INSERT INTO user_list (username, email) VALUES 
//       ('johndoe', 'johndoe@example.com'),
//       ('janesmirth', 'janesmirth@example.com'),
//       ('bobwilson', 'bobwilson@example.com'),
//       ('alicegreen', 'alicegreen@example.com'),
//       ('charliebrown', 'charliebrown@example.com'),
//       ('davidlee', 'davidlee@example.com'),
//       ('emilywang', 'emilywang@example.com'),
//       ('frankmartin', 'frankmartin@example.com'),
//       ('gracepark', 'gracepark@example.com'),
//       ('henrytaylor', 'henrytaylor@example.com')
//     `);

//     console.log('Database initialized successfully');
//     await connection.end();
//   } catch (error) {
//     console.error('Error initializing database:', error);
//     process.exit(1);
//   }
// }

// module.exports = initializeDatabase;


async function initializeDatabase() {
  try {
    const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            multipleStatements: true  // Enable multiple statement support
          });
    // Create the database if it does not exist
    await connection.query('CREATE DATABASE IF NOT EXISTS test001');
    
    // Use the `test001` database
    await connection.query('USE test001');

    // Check if the table `user_list` exists
    const [tables] = await connection.query(`
      SELECT COUNT(*) AS count 
      FROM information_schema.tables 
      WHERE table_schema = 'test001' AND table_name = 'user_list'
    `);

    if (tables[0].count === 0) {
      // Table does not exist, create it
      await connection.query(`
        CREATE TABLE user_list (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(50) NOT NULL UNIQUE,
          email VARCHAR(100) NOT NULL UNIQUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Insert dummy users
      await connection.query(`
        INSERT INTO user_list (username, email) VALUES 
        ('johndoe', 'johndoe@example.com'),
        ('janesmirth', 'janesmirth@example.com'),
        ('bobwilson', 'bobwilson@example.com'),
        ('alicegreen', 'alicegreen@example.com'),
        ('charliebrown', 'charliebrown@example.com'),
        ('davidlee', 'davidlee@example.com'),
        ('emilywang', 'emilywang@example.com'),
        ('frankmartin', 'frankmartin@example.com'),
        ('gracepark', 'gracepark@example.com'),
        ('henrytaylor', 'henrytaylor@example.com')
      `);

      console.log('Table `user_list` created and data inserted successfully');
    } else {
      console.log('Table `user_list` already exists. No action taken.');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

module.exports = initializeDatabase;
