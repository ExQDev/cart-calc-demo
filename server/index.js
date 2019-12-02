import methods from './gateway'
import express from 'express';
import cors from 'cors'

(async () => {  
  const app = express()

  app.use(express.json())
  app.use(cors())

  for(const method in methods){
    app.post(`/${method}`, async (req, res) => {
      const result = await methods[method](req.body);
      return res.status(200).send(result);
    })
  }
  
  app.get('/', (req, res) => {
    return res.send({'message': 'YAY! Congratulations! Your first endpoint is working'});
  })
  
  app.listen(3000)
  
  console.log('app running on port ', 3000);
})()