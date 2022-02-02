export default {
  btn: {
    contactActions: (index) => `[data-test='btn-actions-${index}-datable']`,
    sectionDataContact: "[data-test='title-contacts-data']",
    confirmModal: "[data-test='btn-confirm-details-contact']",
    exportContacts: "[data-test='btn-export-contacts']",
  },
  input: {
    contactEmail: "[data-test='input-contact-email'] > div > input",
    contactPhone: "[data-test='input-phone'] > div > input",
    contactBirthday: "[data-test='input-contact-birthday'] > div > input",
  },
};
