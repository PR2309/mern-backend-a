// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import userRouter from './Routes/userRoute.js'; // userRoute is a variable in this file

// dotenv.config(); // loads environment variables from .env file

// const app=express();

// app.use(cors());
// app.use(express.json());
// app.use(express.static('public')); // serves static files from public folder

// const PORT=process.argv[2] || 8080;
// // const dbuser=encodeURIComponent(process.env.DBUSER);
// // const dbpass=encodeURIComponent(process.env.DBPASS);

// const dbuser=encodeURIComponent(process.env.MONGO_USER);
// const dbpass=encodeURIComponent(process.env.MONGO_PASS);

// // const dbuser = encodeURIComponent(process.env.MONGO_USER || process.env.DBUSER);
// // const dbpass = encodeURIComponent(process.env.MONGO_PASS || process.env.DBPASS);
// const merndb = "merndb"; //DB NAME

// // creates a database named lpu1
// // and connects to it using the provided credentials
// // authsource=admin is used to authenticate the user against the admin database

// // mongoose.connect(`mongodb://${dbuser}:${dbpass}@localhost:/lpu1?authsource=admin`) // for MongoDB Compass
// // .then( () =>{ // returns a promise
// //     app.listen(PORT,()=>{ // first connect to database then run the server
// //         console.log(`Server is running at http://localhost:${PORT}`);
// //     });
// // });

// // mongoose.connect(`mongodb+srv://${dbuser}:${dbpass}@cluster0.db4tdjc.mongodb.net/${merndb}?retryWrites=true&w=majority&appName=Cluster0`) // for MongoDB Atlas
// // .then( () =>{ // returns a promise
// //     app.listen(PORT,()=>{ // first connect to database then run the server
// //         console.log(`Server is running live at vercel`);
// //     });
// // });

// // For Testing
// mongoose.connect(`mongodb://localhost:27017/mernCafe`) // for MongoDB Atlas
// .then( () =>{ // returns a promise
//     app.listen(8080,()=>{ // first connect to database then run the server
//         console.log(`Server is running at http://localhost:8080`);
//     });
// });


// // connection checking
// app.get("/",(req,res)=>{
//     res.send("Backend Connected");
// });
// // Routes
// app.use('/api/users',userRouter); // for user related APIs


import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './Routes/userRoute.js'; // userRoute is a variable in this file

dotenv.config(); // loads environment variables from .env file

const app = express();

// --- CORS Configuration ---
const allowedOrigins = [
    'http://localhost:5173',
    'https://mern-frontend-a-snowy.vercel.app', // ✅ replace with actual frontend Vercel URL
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        } else {
        callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
}));
// --- End CORS Configuration ---

app.use(express.json());
app.use(express.static('public')); // serves static files from public folder

const PORT = process.argv[2] || 8080;
const dbuser = encodeURIComponent(process.env.MONGO_USER);
const dbpass = encodeURIComponent(process.env.MONGO_PASS);
const merndb = "merndb"; //DB NAME

// For Testing
mongoose.connect(`mongodb://localhost:27017/mernCafe`) // for MongoDB Atlas
.then(() => { // returns a promise
    app.listen(8080, () => { // first connect to database then run the server
        console.log(`Server is running at http://localhost:8080`);
    });
});

// connection checking
app.get("/", (req, res) => {
    res.send("Backend Connected");
});
// Routes
app.use('/api/users', userRouter); // for user related