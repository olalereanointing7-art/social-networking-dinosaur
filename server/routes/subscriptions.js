const express = require('express');
const Subscription = require('../models/Subscription');
const User = require('../models/User');
const router = express.Router();

// Get subscription plans
router.get('/plans', async (req, res) => {
  try {
    const plans = [
      {
        id: 'free',
        name: 'Free',
        price: 0,
        features: ['Basic profile', 'Post content', 'Comment on posts', 'View streams']
      },
      {
        id: 'premium',
        name: 'Premium',
        price: 9.99,
        features: ['All Free features', 'Ad-free experience', 'Priority support', 'Exclusive content', 'Early access to new features']
      }
    ];

    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user subscription
router.get('/:userId', async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ user: req.params.userId });

    if (!subscription) {
      return res.json({ plan: 'free' });
    }

    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create subscription (Stripe integration)
router.post('/create', async (req, res) => {
  try {
    const { userId, plan, stripeCustomerId } = req.body;

    const subscription = new Subscription({
      user: userId,
      plan,
      stripeCustomerId,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    });

    await subscription.save();

    // Update user subscription
    await User.findByIdAndUpdate(
      userId,
      { 'subscription.plan': plan, 'subscription.expiresAt': subscription.endDate }
    );

    res.status(201).json({ message: 'Subscription created', subscription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cancel subscription
router.put('/:subscriptionId/cancel', async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.subscriptionId,
      { status: 'cancelled' },
      { new: true }
    );

    res.json({ message: 'Subscription cancelled', subscription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
