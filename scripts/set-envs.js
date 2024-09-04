//esto son las instrucciones para crear el archivo de environments y enviar directamente mi proyecto
//para ejecutarlo hay que ir al package.json y se crea un nuevo script "envs": "node ./scripts/set-envs.js",
const { writeFileSync, mkdirSync} = require('fs');

require('dotenv').config()


const targetPath = './src/environments/environment.ts';

const envFileContent = `
export const environment = {
  mapbox_key: "${ process.env['MAPBOX_KEY'] }",
  otra: "PROPIEDAD",
};
`;

//creamos el directorio environments
mkdirSync('./src/environments', { recursive: true });

writeFileSync( targetPath, envFileContent);




