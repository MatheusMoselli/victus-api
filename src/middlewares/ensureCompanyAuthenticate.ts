import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureCompanyAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if(!authToken) {
    return res.status(401).json({ message: "Access denied" });
  };

  const [, token] = authToken.split(" ");
  
  try {
    const { sub } = verify(token, process.env.JWT_SECRET_COMPANY) as IPayload;
    req.id = sub;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Access denied" });
  }
}