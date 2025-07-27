import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("token", token);
  if (!token) {
    return res.status(400).json({
      status: false,
      message: "You are not authenticated!",
    });
  }
  jwt.verify(token, process.env.PRIVATE_KEY, (error, user) => {
    if (error) {
      return res.status(401).json({
        status: false,
        message: "Token is not valid!",
      });
    }
    req.user = user;
    next();
  });
};

export const verifyUser = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({
        message: "You are not authorized!",
        status: false,
      });
    }
  });
};

export const verifyAdmin = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({
        message: "You are not authorized!",
        status: false,
      });
    }
  });
};
