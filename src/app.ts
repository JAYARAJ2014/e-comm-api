import dotenv from 'dotenv'
import express, {Express, Request, Response} from 'express';
import { StatusCodes } from 'http-status-codes';


dotenv.config();

const PORT = process.env.PORT ||  3000;
const app:Express = express();  

app.use(express.json())
app.use('/',(req : Request, res:Response)=> {
    return res.status(StatusCodes.OK).json( {message: 'e-commerce API'})
})

const appStart = async ()=> {
    try {
        app.listen(PORT, ()=>{
            console.log(`Express Server listening at PORT: ${PORT}`)
        })    
    } catch (error) {
        console.log(`Exceptoin Occured at Startup : ${error}`)
    }
    
}

appStart();