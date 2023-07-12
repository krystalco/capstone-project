const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const config = require("./config")
const authRoutes = require("./routes/auth")
const db = require("./db")
const app = express()


app.use(cors())
// parse incoming requests with JSON payloads
app.use(express.json())
// log requests info
app.use(morgan("tiny"))

//enabling the /auth route - using the imported auth routes
app.use("/auth", authRoutes)



app.get("/", function (req, res) {
    return res.status(200).json({
      ping: "pong",
    })
  })
 
  /** Generic error handler; anything unhandled goes here. */
  app.use(function (err, req, res, next) {
    if (!config.IS_TESTING) console.error(err.stack)
    const status = err.status || 500
    const message = err.message
  
    return res.status(status).json({
      error: { message, status },
    })
  })
  


module.exports = app