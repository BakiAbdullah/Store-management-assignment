import mongoose from 'mongoose'
import config from './app/config'
import { app } from './app'

async function server() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('DB Connected')
    app.listen(config.port, () => {
      console.log(`Store app is listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

server().catch((err) => console.log(err))
