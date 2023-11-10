import express from 'express';
import morgan from 'morgan';
import path from 'path';
import jsxRender from './utils/jsxRender';
import indexRouter from './routes/indexRouter';
import postsRouter from './routes/postsRouter';
import apiPostsRouter from './routes/apiPostsRouter';
import resLocals from './middlewares/resLocals';
import apiTableRouter from './routes/apiTableRouter';

require('dotenv').config();

const PORT = process.env.SERVER_PORT || 3000;
const app = express();

app.engine('jsx', jsxRender);
app.set('view engine', 'jsx');
app.set('views', path.join(__dirname, 'components'));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(resLocals);
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/api/posts', apiPostsRouter);
app.use('/api/tableform', apiTableRouter);

app.listen(PORT, () => console.log(`App has started on port ${PORT}`));
