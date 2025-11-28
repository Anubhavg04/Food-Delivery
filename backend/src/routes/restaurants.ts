import { Router } from 'express';
import Restaurant from '../models/Restaurant';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// GET /api/restaurants?search=&veg=&minRating=&sort=&page=&limit=
router.get('/', async (req, res) => {
  try {
    const { search, veg, minRating, sort, page = 1, limit = 20 } = req.query;
    const q: any = {};
    if (search) {
      const s = String(search).trim();
      q.$or = [
        { name: { $regex: s, $options: 'i' } },
        { cuisine: { $regex: s, $options: 'i' } },
        { location: { $regex: s, $options: 'i' } }
      ];
    }
    if (veg === 'true') q.isVeg = true;
    if (minRating) q.rating = { $gte: Number(minRating) };

    let query = Restaurant.find(q);
    if (sort === 'rating') query = query.sort({ rating: -1 });
    else if (sort === 'price') query = query.sort({ priceForTwo: 1 });
    else if (sort === 'time') query = query.sort({ deliveryTime: 1 });

    const p = Number(page);
    const lim = Number(limit);
    const total = await Restaurant.countDocuments(q);
    const results = await query.skip((p - 1) * lim).limit(lim).exec();
    res.json({ total, page: p, limit: lim, results });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single
router.get('/:id', async (req, res) => {
  try {
    const r = await Restaurant.findById(req.params.id);
    if (!r) return res.status(404).json({ message: 'Not found' });
    res.json(r);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected create/edit/delete (demo purpose)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const r = new Restaurant(req.body);
    await r.save();
    res.json(r);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
