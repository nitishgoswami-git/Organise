import  {Router} from "express";

const indexRouter = Router();

const routes = [
    {
        path : "/auth",
        route : (await import("./Auth/index.js")).default
    },
    {
        path : "/board",
        route : (await import("./Board/index.js")).default
    },
     {
        path : "/card",
        route : (await import("./Cards/index.js")).default
    }
]

routes.forEach((cur_route) => {
    indexRouter.use(cur_route.path, cur_route.route)
})

export default indexRouter