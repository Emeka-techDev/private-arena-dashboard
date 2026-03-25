export const maskedEmail = (val: string) => {
  const [name, domain] = val.split('@');
  const slicedName = name.slice(0, name.length / 2);
  const maskedMail = name.length > 3 ? `${slicedName}***@${domain}` : val;
  return maskedMail;
};
