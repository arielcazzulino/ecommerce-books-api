import app from './src/app.js';

const port = process.env.PORT || 3001;

function main(){
    try {
      app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
      });
    } catch (error) {
      console.error(`index.js error -> ${error}`)
    }
    
  }
  
  main();