import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import cors from 'cors';


/************************************************************************************************
 *                                           Configurations
*************************************************************************************************/
const app = express();
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Inventory Management System API',
      version: '1.0.0',
      description: 'A simple Inventory Management System API'
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`
      }
    ]
  },
  apis: ["./routes/*.js"],
}

const swaggerDcos = swaggerJSDoc(swaggerOptions);

app.set('PORT', process.env.PORT || 3000);
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDcos));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));


app.listen(app.get('PORT'), () => {
  console.log(`Server is running on port ${app.get('PORT')}`);
});
