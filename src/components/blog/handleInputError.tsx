export const handleInputError = (header: string, text: string) => {
  const errors = {};
  if (header.replace(/ /g, "") === "") {
    errors[header] = true;
  }
  if (text.replace(/ /g, "") === "") {
    errors[text] = true;
  }
  return errors;
};
