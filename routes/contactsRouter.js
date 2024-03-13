import express from "express";
import {
  listContacts,
  getContactById,
  removeContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", listContacts);

contactsRouter.get("/:id", getContactById);

contactsRouter.delete("/:id", removeContact);

contactsRouter.post("/", createContact);

contactsRouter.put("/:id", updateContact);

export default contactsRouter;
