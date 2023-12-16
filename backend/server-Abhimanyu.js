const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/databse");
const cors = require("cors"); // Import the 'cors' middleware

app.use(cors())




// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err}`);
  console.log(`Shutting Down The Server Due to Uncaught Exception`);
  process.exit(1);
});

// Config
dotenv.config({ path: "backend/config/config.env" });

// Connecting to the database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});



// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down The Server Due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
