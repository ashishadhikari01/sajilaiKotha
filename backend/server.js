const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const userDetailRoute=require('./Routes/userDetailRoute')
const loginRoute=require('./Routes/loginRoute')
const user=require('./Routes/user')
const cookieParse=require('cookie-parser')
// const bodyParser=require('body-parser')
// const cloudinary=require('../backend/CloudinaryConfig/cloudinary')
// const uploadphoto=require('./Routes/uploadspace')
const uploadspace=require('./Routes/uploadspace')

const app=express()
// require('dotenv').config() 
// const lau=require('./Routes/loginRoute')

const port=5000

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
// app.use(express.json())
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParse())
app.use(userDetailRoute)
app.use(loginRoute)
app.use(user)
app.use(uploadspace)
app.use('/uploads', express.static('uploads'));
// app.use('/spaceuploads', express.static('spaceuploads'));
app.use('/spaceuploads', express.static('spaceuploads'));

// app.use(cloudinary)
// app.use(uploadphoto)

// mount by route prefix (not by path to file)



mongoose.connect('mongodb://localhost/outlook')
.then(()=>console.log('database connected'))
.catch((err)=>console.log('database connection error',err.message))



app.get('/',(req,res)=>{
    res.send("welcome to hood")
})


app.listen(port,()=>console.log(`port is running on http://localhost:${port}`))