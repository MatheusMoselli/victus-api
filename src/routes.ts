import { Router } from "express";

// Validations
import ensureAuthenticated from "./middlewares";
// Controllers
import userController from "./controllers/UserController";
import companyController from "./controllers/CompanyController";
import pointController from "./controllers/PointController";
import eventController from "./controllers/EventController";

const router = Router();

// Routes
router.get("/user", ensureAuthenticated.user, userController.get);
router.get("/user/my_events", ensureAuthenticated.user, userController.myEvents);
router.put("/user/edit", ensureAuthenticated.user, userController.update);
router.delete("/user/delete", ensureAuthenticated.user, userController.delete);
router.post("/user/create", userController.create);
router.post("/user/login", userController.authenticate);

router.get("/company", ensureAuthenticated.company, companyController.get);
router.get("/company/my_events", ensureAuthenticated.company, companyController.myEvents);
router.post("/company/create", companyController.create);
router.post("/company/login", companyController.authenticate);
router.post("/company/events/create", ensureAuthenticated.company, companyController.createEvent);

router.post("/events/ticket", ensureAuthenticated.user, userController.buyTicket);
router.get("/events/:creator_id", eventController.listByCreator);
router.get("/events/type/:event_type", eventController.listByType);
router.get("/events", eventController.listAll);

router.get("/point", ensureAuthenticated.point, pointController.get);
router.post("/point/transaction", ensureAuthenticated.point, pointController.transaction);
router.put("/point/edit", ensureAuthenticated.point, pointController.update);
router.post("/point/create", pointController.create);
router.post("/point/login", pointController.authenticate);

router.post("/event-types", eventController.createTypes);

export { router };