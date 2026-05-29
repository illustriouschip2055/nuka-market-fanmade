import express from "express";
import cors from 'cors'

import nukaProductsRoutes from './routes/nukaProducts.routes.js'
import nukaAuthRoutes from './routes/nukaAuth.routes.js'
import nukaVisitsRoutes from './routes/nukaVisits.routes.js'
import nukaOrdersRoutes from './routes/nukaOrders.routes.js'

const app = express();
app.use(cors())
app.use(express.json())

app.get("/", (_req, res) => {
  res.send("ok");
});

app.use('/api/nuka-products', nukaProductsRoutes)
app.use('/api/nuka-auth', nukaAuthRoutes)
app.use('/api/nuka-visits', nukaVisitsRoutes)
app.use('/api/nuka-orders', nukaOrdersRoutes)

export default app;