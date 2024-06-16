import { greenBright } from 'colorette';

export const serverRunMessage = () => {
  var figlet = require('figlet');
  console.log(greenBright('='.repeat(117)));
  console.log(
    greenBright(
      figlet.textSync('Server Running!', {
        font: 'Larry 3D',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        whitespaceBreak: true,
      }),
    ),
  );
  console.log(greenBright('='.repeat(117)));
};
