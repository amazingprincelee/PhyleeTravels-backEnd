// routes.js

import express from "express";
import userController from "../controllers/balancesController.js";

const router = express.Router();

router.get("/balances/amount-staked/:userId", userController.getAmountStaked);
router.get("/balances/stake-count/:userId", userController.getStakeCount);
router.get("/balances/dai-reward/:userId", userController.getDaiRewardBalance);
router.get("/balances/nac-reward/:userId", userController.getNacRewardBalance);







export default router;
