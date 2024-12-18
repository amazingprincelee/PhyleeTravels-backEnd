import Configuration from "../models/configuration.js";

export const getActiveGateway = async (req, res, next) => {
  try {
    const config = await Configuration.findOne();
    if (!config) {
      return res.status(500).json({ message: "Payment configuration not found." });
    }
    req.activeGateway = config.activeGateway;
    req.gatewayKeys = config[`${config.activeGateway}Keys`];
    next();
  } catch (error) {
    console.error("Error fetching payment configuration:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
