// ! This file is a sample controller file that demonstrates how to write CRUD operations with SQL queries.

/*
Advanced CRUD with JOIN queries
This file handles advanced operations with joins between users and orders.
*/

// import sql from 'mssql';
// import { config } from '../config/dbConfig.js';

// // Get users with their orders (JOIN example)
// export const getUsersWithOrders = async (req, res) => {
//   try {
//     await sql.connect(config);
//     const result = await sql.query(`
//       SELECT u.id, u.name, o.orderDate, o.amount 
//       FROM Users u
//       JOIN Orders o ON u.id = o.userId
//     `); // Join Users and Orders tables
//     res.json(result.recordset); // Return the result set
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to retrieve users with orders' });
//   }
// };


// // Get users with their orders and ordered products (multi-level JOIN example)
// export const getUsersWithOrdersAndProducts = async (req, res) => {
//   try {
//     await sql.connect(config);
//     const result = await sql.query(`
//       SELECT u.id, u.name, o.orderDate, o.amount, p.productName, p.price
//       FROM Users u
//       JOIN Orders o ON u.id = o.userId
//       JOIN OrderDetails od ON o.id = od.orderId
//       JOIN Products p ON od.productId = p.id
//     `); // Join Users, Orders, OrderDetails, and Products tables
//     res.json(result.recordset); // Return the result set
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to retrieve users with orders and products' });
//   }
// };


// // Get total amount spent by each user (GROUP BY)
// export const getTotalAmountSpentByUsers = async (req, res) => {
//   // TO DO: Implement the SQL query that sums the total amount spent by each user.
// };


// // Get the most frequently ordered product per user (Subquery)
// export const getMostOrderedProductPerUser = async (req, res) => {
//   // TO DO: Implement the SQL query that identifies the most frequently ordered product per user.
// };

