import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import customMorgan from './middlewares/customMorgan';
import authenticator from './middlewares/authenticator';
import authenticatorAPI from './middlewares/authenticatorAPI';


/************************************************************************************************
 *                                           Configurations
*************************************************************************************************/
const app = express();
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Inventory Management System API',
      version: '1.3.4',
      description: 'A simple Inventory Management System API'
    },
    servers: [
      {
        url: `http://${process.env.SERVER}:${process.env.PORT_SWAGGER}`
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          in: 'header',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [ { bearerAuth: [] } ],
  },
  apis: ["./controllers/*.ts", "./dataModels/*.ts"],
}

const swaggerDcos = swaggerJSDoc(swaggerOptions);

app.set('PORT', process.env.PORT || 3000);
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDcos));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(customMorgan);

// API
app.use('/api/auth', require('./controllers/authenticationController'));
app.use('/api/user', authenticator, require('./controllers/userController'));
app.use('/api/type', authenticatorAPI, require('./controllers/typeController'));
app.use('/api/workspace', authenticatorAPI, require('./controllers/workspaceController'));
app.use('/api/iam', authenticatorAPI, require('./controllers/iamController'));
app.use('/api/category', authenticatorAPI, require('./controllers/categoryController'));
app.use('/api/location', authenticatorAPI, require('./controllers/locationController'));
app.use('/api/item', authenticatorAPI, require('./controllers/itemController'));


app.listen(app.get('PORT'), () => {
  console.log(`Server is running on port ${app.get('PORT')}`);
});
