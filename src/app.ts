import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import { Application } from 'express-serve-static-core';


dotenv.config();
const app: Application = express();
const port: number | string = process.env.PORT || "3000";

app.use(express.json());

const show = (req: Request, res: Response) => {
  res.status(200).send('hihiihihihhihhihhihihhihihihihohi')
}
app.get('/', show);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});