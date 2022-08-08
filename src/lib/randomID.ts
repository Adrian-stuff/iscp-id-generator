import UUID from "uuid-int";
const generateRandomID = () => {
  const generator = UUID(Math.floor(Math.random() * (511 - 0 + 1) + 0));
  return generator.uuid().toString().substring(0, 12);
};

export { generateRandomID };
