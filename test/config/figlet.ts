import { greenBright, yellowBright } from 'colorette';

export const startMessage = () => {
  var figlet = require('figlet');
  console.log(greenBright('='.repeat(117)));
  console.log(
    greenBright(
      figlet.textSync('Stating Test!', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        whitespaceBreak: true,
      }),
    ),
  );
  console.log(greenBright('='.repeat(117)));
};

export const niceWorkMessage = () => {
  var figlet = require('figlet');
  console.log(yellowBright('='.repeat(95)));
  console.log(
    yellowBright(
      figlet.textSync('Nice Work!', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        whitespaceBreak: true,
      }),
    ),
  );
  console.log(yellowBright('='.repeat(95)));
};
