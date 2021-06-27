import { Router } from "express";

// Validations
import ensureAuthenticated from "./middlewares";
// Controllers
import userController from "./controllers/UserController";
import companyController from "./controllers/CompanyController";
import pointController from "./controllers/PointController";

const router = Router();

// Routes
router.get("/user", ensureAuthenticated.user, userController.get);
router.post("/user/create", userController.create);
router.post("/user/login", userController.authenticate);

router.get("/company", ensureAuthenticated.company, companyController.get);
router.post("/company/create", companyController.create);
router.post("/company/login", companyController.authenticate);

router.get("/point", ensureAuthenticated.point, pointController.get);
router.post("/point/create", pointController.create);
router.post("/point/login", pointController.authenticate);

export { router };