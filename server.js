import express from 'express';
import dotenv from 'dotenv';
import routes from './src/routes/index.js'
import  cors from 'cors';
 dotenv.config();
const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(cors())
app.use(routes)


app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
