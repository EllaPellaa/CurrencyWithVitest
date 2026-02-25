import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import currencyRoutes from './routes/currencyRoutes'

//Needed npm i --save-dev @types/cors and npm i --save-dev @types/express to work

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors());
app.use(express.json())

app.use('/api', currencyRoutes)

export { app }

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});