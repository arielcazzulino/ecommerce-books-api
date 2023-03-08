import app from './src/app.js';

const port = process.env.PORT || 3001;

/* async */ function main(){
    try {
      /* await sequelize.sync({force: false})
      console.log('DB connection has been established successfully') */
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
      });
    } catch (error) {
      console.error(`index.js error -> ${error}`)
    }
    
  }
  
  main();