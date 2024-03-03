import { app } from '../src';

app.handle(new Request('http://localhost/')).then((response) => {
  console.log(response);
});
