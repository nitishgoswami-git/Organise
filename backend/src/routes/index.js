import { Router } from "express";

const indexRouter = Router();

const routes = [
  {
    path: "/auth",
    route: (await import("./Auth/index.js")).default,
  },
  {
    path: "/boards",
    route: (await import("./Board/index.js")).default,
  },
  {
    path: "/cards",
    route: (await import("./Cards/index.js")).default,
  },
  {
    path: "/lists",
    route: (await import("./Lists/index.js")).default,
  },
];

routes.forEach((cur_route) => {
  indexRouter.use(cur_route.path, cur_route.route);
});

export default indexRouter;
