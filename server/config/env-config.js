const dotenv = require("dotenv");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;

module.exports = {
    JWT_SECRET,
    PORT,
};
