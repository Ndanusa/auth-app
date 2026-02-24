import { Router } from "express";

const subscriptionsRouter = Router();

subscriptionsRouter.get("/api/v1/auth", (req, res) => {
  res.send("this is a get route for the subscriptions");
});

subscriptionsRouter.post("/api/v1/auth", (req, res) => {
  res.send("this is a post route for the subscriptions");
});

subscriptionsRouter.put("/api/v1/auth", (req, res) => {
  res.send("this is a put route for the subscriptions");
});

subscriptionsRouter.delete("/api/v1/auth", (req, res) => {
  res.send("this is a delete route for the subscriptions");
});
export default subscriptionsRouter;
