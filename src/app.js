import express from "express"
import cors from "cors"
import router from "./routes/indexRoute.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

const PORT = 5000
app.listen(PORT, () => console.log(`Servidor está rodando na porta ${PORT}`))