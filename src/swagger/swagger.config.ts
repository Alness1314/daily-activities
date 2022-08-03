import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

export const initSwagger = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('Daily Activities')
        .setDescription('RestAPI for manage your activities in your work')
        .setVersion('0.0.1')
        .addSecurity('bearer',{
            type: 'http',
            scheme: 'bearer'
        })
        .addBearerAuth()
        .build();
    const options: SwaggerDocumentOptions = {
        ignoreGlobalPrefix: false,
    }
    const document = SwaggerModule.createDocument(app, config, options);

    SwaggerModule.setup('api', app, document);
};