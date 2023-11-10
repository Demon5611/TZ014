import express from 'express';
import morgan from 'morgan';

import session from 'express-session';
import store from 'session-file-store';
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
const FileStore = store(session);

const sessionConfig = {
  name: 'user_sid',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

app.engine('jsx', jsxRender);
app.set('view engine', 'jsx');
app.set('views', path.join(__dirname, 'components'));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionConfig));
app.use(resLocals);
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/api/posts', apiPostsRouter);
app.use('/api/tableform', apiTableRouter);

app.listen(PORT, () => console.log(`App has started on port ${PORT}`));
