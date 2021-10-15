import * as express from 'express';
import * as cors from 'cors';
import * as database from './database';
import Post from './post.interface';
import * as morgan from 'morgan';
import { NextFunction } from 'connect';
import { Request, Response } from 'express-serve-static-core';
const app: express.Application  = express();

app.use(cors()); 
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/message',async (req: Request,res: Response,next: NextFunction)=>{
    try{
        const messages: Post[] = await database.getAllMessages();
        console.log(messages);
        res.json({
            messages
        })
    } catch(error){
        next(error); 
    }
})

app.post('/api/message', async (req: Request,res: Response,next: NextFunction)=>{
    try{
        const content:string = req.body.content;
        await database.postMessage(content);
        res.sendStatus(200);
    } catch(error){
        next(error); 
    }
})

app.put('/api/message', async (req: Request,res: Response,next: NextFunction)=> {
    try{
        const newContent:string = req.body.newContent;
        await database.putMessage(newContent);
        res.sendStatus(200);
        
    }
     catch(error){
        next(error); 
    }
})

app.delete('/api/message',async (req: Request,res: Response,next: NextFunction)=>{
    try{
        const id:number = parseInt(req.body.id);
        await database.deleteMessage(id); 
        res.sendStatus(200);
    } catch(error){
        next(error); 
    }
})

app.use((error: Error,req:Request,res: Response,next: NextFunction)=>{
    console.log(error)
    res.json({error})
}); 

app.listen(3000,()=> console.log(`server listening on http://localhost:3000`))