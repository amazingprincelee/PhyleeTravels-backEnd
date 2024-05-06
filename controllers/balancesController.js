// userController.js

import User from "../models/user.js";




const balancesController = {
  // Other controller methods...

  getNacBalance: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      return res.status(200).json({ NacBalance: user.NacBalance });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Unexpected error during NAC balance retrieval' });
    }
  },

  getDaiBalance: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      return res.status(200).json({ DaiBalance: user.DaiBalance });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Unexpected error during DAI balance retrieval' });
    }
  },

  getAmountStaked: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      return res.status(200).json({ AmountStaked: user.AmountStaked });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Unexpected error during Amount Staked retrieval' });
    }
  },

  getStakeCount: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      return res.status(200).json({ stakeCount: user.stakeCount });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Unexpected error during stake count retrieval' });
    }
  },

  getDaiRewardBalance: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      return res.status(200).json({ DaiRewardBalance: user.DaiRewardBalance });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Unexpected error during DAI reward balance retrieval' });
    }
  },

  getNacRewardBalance: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      return res.status(200).json({ NacRewardBalance: user.NacRewardBalance });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Unexpected error during NAC reward balance retrieval' });
    }
  },

};

export default balancesController;
