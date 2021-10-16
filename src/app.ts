import * as express from 'express';
import * as cors from 'cors';
import Memo from './interfaces/Memo.interface';
import * as morgan from 'morgan';
import { Request, Response, NextFunction } from 'express-serve-static-core';
 
// database dependency injection
export default function (database) {
    const app: express.Application = express();
    const path: string = '/api/memo'; 

    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('/',(req:Request,res:Response) => res.send('<h1>Memo API Server</h1>'))

    app.get(path, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const messages: Memo[] = await database.getAllMessages();
            console.log(messages);
            res.json({
                messages
            })
        } catch (error) {
            next(error);
        }
    }); 

    app.post(path, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const content: string = req.body.content;
            if (!content) return res.sendStatus(400);
            await database.postMessage(content);
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    }); 

    app.put(path, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newContent: string = req.body.newContent;
            const id: number = parseInt(req.body.id);
            if (!newContent || !id || isNaN(id)) return res.sendStatus(400);
            await database.putMessage(newContent,id);
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    });

    app.delete(path, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: number = parseInt(req.body.id);
            if (!id || isNaN(id)) return res.sendStatus(400);
            await database.deleteMessage(id);
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    });

    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        console.log(error)
        res.json({ error })
    });

    return app;
}
