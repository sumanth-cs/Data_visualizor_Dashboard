import express, { json } from "express";
import bodyParser from "body-parser"; // Correct way to import body-parser
import cors from "cors";
import * as dotenv from "dotenv";
import { connect } from "mongoose";
import userRoutes from "./routes/user.route.js";
import dataRoutes from "./routes/data.route.js";

// Configuration
dotenv.config();
const app = express();

// Middleware
app.use(json()); // express.json
app.use(cors());
app.use(bodyParser.json()); // body-parser JSON
app.use(bodyParser.urlencoded({ extended: false })); // body-parser URL encoded

// Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", dataRoutes);

// DB Connection
const port = process.env.PORT || 8080;

connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log("Listening on port " + port);
        });

        // Uncomment to add JSON data to MongoDB
        /*
        const insertData = async () => {
            try {
                const docs = await Data.insertMany(data);
                return Promise.resolve(docs);
            } catch (err) {
                return Promise.reject(err);
            }
        };

        insertData()
            .then((docs) => console.log(docs))
            .catch((err) => console.log(err));
        */
    })
    .catch((e) => {
        console.log(`${e} did not connect`);
    });
