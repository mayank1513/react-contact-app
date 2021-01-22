const getCtx = () => {
  return JSON.parse(localStorage.contacts || "[]");
};

export const getContacts = () =>
  new Promise((resolve, reject) => resolve(getCtx()));

export const getContact = (id: Number | String) => {
  const c = getCtx().filter((it) => it.id == id);
  return new Promise((resolve, reject) =>
    c.length ? resolve(c[0]) : reject("Contact Not Found")
  );
};

export const createContact = (body) => {
  const c = getCtx();
  const l = c.length;
  const id = (l == 0 ? 0 : c[l - 1].id) + 1;
  const contact = {
    ...body,
    id,
  };
  localStorage.contacts = JSON.stringify(c.concat([contact]));
  return new Promise((resolve, reject) => resolve(true));
};

export const updateContact = (contact) => {
  const c = getCtx().map((it) => (it.id == contact.id ? contact : it));
  localStorage.contacts = JSON.stringify(c);
  return new Promise((resolve, reject) => resolve(c));
};

export const removeContact = (id) => {
  localStorage.contacts = JSON.stringify(getCtx().filter((it) => it.id != id));
  new Promise((resolve, reject) => resolve(JSON.parse(localStorage.contacts)));
};
