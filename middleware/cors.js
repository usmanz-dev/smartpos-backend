const cors = require('cors');
app.use(cors({
  origin: 'https://pos-frontend-silk-nine.vercel.app/', // Allow requests from this origin
}));