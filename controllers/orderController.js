import {config, pool} from '../config/config.js';


export const createOrder = async (req, res) => {
    const { items } = req.body;
    try {
      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const orderResult = await pool.query(
        'INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING *',
        [req.user.id, total]
      );
      const order = orderResult.rows[0];
  
      const orderItemsQueries = items.map(item => {
        return pool.query(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
          [order.id, item.product_id, item.quantity, item.price]
        );
      });
  
      await Promise.all(orderItemsQueries);
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

export const getOrders = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM orders WHERE user_id = $1', [req.user.id]);
        res.json(result.rows);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

export const getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
      const result = await pool.query('SELECT * FROM orders WHERE id = $1 AND user_id = $2', [id, req.user.id]);
      if (result.rows.length === 0) return res.status(404).json({ message: 'Contact not found' });
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

