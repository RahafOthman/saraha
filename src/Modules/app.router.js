import connectDB from '../../DB/connection.js';
import AuthRouter from './Auth/Auth.router.js';
import MessageRouter from './Message/Message.router.js';
import UserRouter from './User/User.router.js';

const initApp = (app, port, express)=>{
    connectDB().then(()=>{
        app.listen(process.env.PORT || port,()=>{
            console.log(`server listening on ${port}`)
        })
    })
  
    app.use(express.json());
    app.get('/',(req, res)=>{
        return res.json({message: "Welcome !"})
    })
    app.use("/auth", AuthRouter);
    app.use('/message', MessageRouter);
    app.use('/user', UserRouter);
    app.use('/*', (req, res)=>{
        return res.json({message: "Page Not Found"});
    });
}

export default initApp; 