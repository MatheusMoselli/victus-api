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
router.get(
  "/user/my_events",
  ensureAuthenticated.user,
  userController.myEvents
);
router.put("/user/edit", ensureAuthenticated.user, userController.update);
router.delete("/user/delete", ensureAuthenticated.user, userController.delete);
router.post(
  "/user/save-event",
  ensureAuthenticated.user,
  userController.saveEvent
);
router.get(
  "/user/save-event",
  ensureAuthenticated.user,
  userController.getAllSavedEvents
);
router.post("/user/create", userController.create);
router.post("/user/login", userController.authenticate);

router.get("/company", ensureAuthenticated.company, companyController.get);
router.put(
  "/company/edit",
  ensureAuthenticated.company,
  companyController.update
);
router.get(
  "/company/my_events",
  ensureAuthenticated.company,
  companyController.myEvents
);
router.post("/company/create", companyController.create);
router.delete(
  "/company/delete",
  ensureAuthenticated.company,
  companyController.delete
);
router.post("/company/login", companyController.authenticate);
router.post(
  "/company/events/create",
  ensureAuthenticated.company,
  companyController.createEvent
);
router.put(
  "/company/events/edit/:event_id",
  ensureAuthenticated.company,
  companyController.editEvent
);

router.post(
  "/events/ticket",
  ensureAuthenticated.user,
  userController.buyTicket
);
router.get("/events/top_events", eventController.topEvents);
router.get("/events/type/:event_type", eventController.listByType);
router.get("/event/:id", eventController.eventById);
router.get("/events/:creator_id", eventController.listByCreator);

router.get("/events", eventController.listAll);

router.get("/point", ensureAuthenticated.point, pointController.get);
router.get("/point/recent", ensureAuthenticated.point, pointController.recent);
router.post(
  "/point/transaction",
  ensureAuthenticated.point,
  pointController.transaction
);
router.put("/point/edit", ensureAuthenticated.point, pointController.update);
router.post("/point/create", pointController.create);
router.post("/point/login", pointController.authenticate);
router.get(
  "/transactions",
  ensureAuthenticated.point,
  pointController.allTransactions
);

router.post("/event-types", eventController.createTypes);
router.get("/event-types", eventController.getAllTypes);

export { router };
