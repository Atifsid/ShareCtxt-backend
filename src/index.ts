import { Hono } from 'hono'
import { cors } from 'hono/cors';
import { BaseResponseDTO } from './utils/DTOs/BaseResponseDTO';
import { Doc } from './utils/DTOs/Doc';
import { v4 as uuidv4 } from 'uuid';

type Bindings = {
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', cors());

app.get('/', (c) => {
  return c.text('Wong Server Works!');
});

app.get("/doc", async (c) => {
  try {
    let { results } = await c.env.DB.prepare(`SELECT * FROM Documents`).all();
    const res: BaseResponseDTO<Record<string, unknown>[]> = {
      code: 200,
      message: 'Successfully fetched Documents',
      data: results
    }
    return c.json(res);
  } catch (e) {
    return c.json({ err: e }, 500);
  }
});

app.post("/doc", async (c) => {
  try {
    const doc: Doc = await c.req.json();
    const { duration } = (await c.env.DB.prepare('INSERT INTO Documents (id, title, content) VALUES (?1, ?2, ?3)').bind(uuidv4(), doc.title, doc.content).run()).meta;
    let res: BaseResponseDTO<any> = {
      code: 200,
      message: `Document Saved in ${duration} s`
    }
    return c.json(res);
  } catch (e) {
    return c.json({ err: e }, 500);
  }
});

export default app;
