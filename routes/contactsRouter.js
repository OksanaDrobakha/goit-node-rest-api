import express from "express";
import ctrl from "../controllers/contactsControllers.js";
import isValidId from "../middlewares/isValidId.js";
import validateBody from "../helpers/validateBody.js";
import * as schema from "../schemas/contactsSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const contactsRouter = express.Router();
contactsRouter.use(authenticate);

contactsRouter.get("/", ctrl.listContacts);

contactsRouter.get("/:id", isValidId, ctrl.getContactById);

contactsRouter.delete("/:id", isValidId, ctrl.removeContact);

contactsRouter.post(
  "/",
  validateBody(schema.createContactSchema),
  ctrl.createContact
);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(schema.updateContactSchema),
  ctrl.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schema.updateFavoriteSchema),
  ctrl.updateFavorite
);

export default contactsRouter;
