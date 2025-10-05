import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import { connectDB } from './config/db';
import urlRoutes from "./routes/urlRoutes";

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes setup
app.use('/api', urlRoutes);

connectDB();

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
