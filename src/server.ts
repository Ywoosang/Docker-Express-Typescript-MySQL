import * as database from './database';
import makeApp from './app'

// express application
const app = makeApp(database);

// server start
app.listen(3000,()=> console.log("http://localhost:3000"))