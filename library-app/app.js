const express = require('express');
const chalk =  require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');


const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');
const nav = [
    { link: '/books', title: 'Book' },
    { link: '/authors', title: 'Author' }
  ];
  
  const bookRouter = require('./src/routes/bookRoutes')(nav);
  
  app.use('/books', bookRouter);
  app.get('/', (req, res) => {
    res.render(
      'index',
      {
        nav: [{ link: '/books', title: 'Books' },
        { link: '/authors', title: 'Authors' }],
        title: 'Library'
      }
    );
  });
  


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => debug(`Server Running at Port ${chalk.green(PORT)}`));