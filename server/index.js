import { config } from 'dotenv'
import app from './app.js'
import os from 'os'
import cluster from 'cluster'

config()

const port = process.env.PORT || 5000

const CPU = os.cpus().length
if (cluster.isPrimary) {
  for (let i = 0; i < CPU; i++) {
    cluster.fork()
  }
}
else {

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
}