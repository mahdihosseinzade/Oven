import axios from "axios";

export const Client = axios.create({
  baseURL: "https://api-oven.npnamira.com/app",
});

const sendSMS = async (phoneNumber) => {
  const res = await Client.post("/user/login", { phoneNumber });
  return res.data;
};

const verifyCode = async ({ phoneNumber, code }) => {
  const res = await Client.post("/user/verify", { phoneNumber, code });
  return res.data;
};

const getUser = async () => {
  const res = await Client.get("/user");
  return res.data;
};

const getCategories = async () => {
  try {
    const res = await Client.get("/categories");
    return res.data;
  } catch (error) { }
};

const getBasket = async () => {
  try {
    const res = await Client.get("/order/basket");
    return res.data.data;
  } catch (error) { }
};

const addProduct = async ({ id, count, properties, itemId }) => {
  const res = await Client.post("/order/additem", {
    id,
    count,
    properties,
    itemId,
  });
  return res.data.data;
};

const removeProduct = async ({ id }) => {
  const res = await Client.post("/", {});
  return res;
};

const getBranch = async () => {
  const res = await Client.get("/branch");
  return res.data.data;
};

const getPublic = async () => {
  const res = await Client.get("/user/public");
  return res.data;
};


const getOrder = async () => {
  const res = await Client.get("/order");
  console.log(res);
  return res.data.data;
};


export default {
  sendSMS,
  verifyCode,
  getUser,
  getCategories,
  getBasket,
  addProduct,
  removeProduct,
  getBranch,
  getPublic,
  getOrder
};
