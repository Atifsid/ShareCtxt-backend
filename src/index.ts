import { Hono } from 'hono'
import { cors } from 'hono/cors';

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', cors());

app.get('/', (c) => {
  return c.text('Wong Server Works!')
});

app.get("/doc", async (c) => {
  try {
    let { results } = await c.env.DB.prepare(`SELECT * FROM Documents`).all()
    return c.json(results)
  } catch (e) {
    return c.json({ err: e }, 500)
  }
});

export default app
