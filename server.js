import express from 'express';
import dotenv from 'dotenv';
import routes from './src/routes/index.js'
 dotenv.config();
const app = express();
const PORT = process.env.PORT

app.use(express.json());

app.use(routes)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
