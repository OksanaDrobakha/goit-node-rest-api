import Contact from "../models/Contact.js";

export const listContacts = (filter = {}) => Contact.find(filter);

export const getContactById = (id) => Contact.findOne(id);

export const createContact = (data) => Contact.create(data);

export const updateContactById = (id, data) =>
  Contact.findOneAndUpdate(id, data);

export const removeContact = (id) => Contact.findOneAndDelete(id);

export const updateStatusContact = (id, data) =>
  Contact.findOneAndUpdate(id, data);
