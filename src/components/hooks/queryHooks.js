import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import APIs from "../../apis/APIs";

const useLogin = () => {
  const user = useContext(useContext);
  const sendSMS = async (phoneNumber) => {
    const res = await APIs.sendSMS(phoneNumber);
    return res;
  };

  const verifyCode = async (data) => {
    const res = await APIs.verifyCode(data);
    return res;
  };

  return { sendSMS, verifyCode, user };
};

const useGetUser = () => {
  return useQuery("user", APIs.getUser, {
    refetchOnWindowFocus: false,
  });
};

const useGetCategories = () => {
  return useQuery("categories", APIs.getCategories, {
    refetchOnWindowFocus: false,
  });
};

const useGetBasket = () => {
  return useQuery("basket", APIs.getBasket, {
    refetchOnWindowFocus: false,
  });
};

const addProduct = async (data) => {
  const res = await APIs.addProduct(data);
  return res;
};

const removeProduct = async (data) => {
  const res = await APIs.removeProduct(data);
  return res;
};

const useAddProduct = () => {
  const queryClient = useQueryClient();
  const aP = useMutation(addProduct, {
    onSettled: () => {
      queryClient.invalidateQueries("basket");
    },
  });

  return { aP };
};

const useMofifyCart = () => {
  const queryClient = useQueryClient();
  const modifyCartApi = ({ id, count, itemId }) => {
    return addProduct({
      id,
      count,
      itemId,
    });
  };
  const modify = useMutation(modifyCartApi, {
    onMutate: async (item) => {
      await queryClient.cancelQueries("basket");

      const previousBasket = queryClient.getQueryData("basket");

      queryClient.setQueryData("basket", (prev) => {
        prev.items.forEach((ite) => {
          if (ite._id == item.itemId) {
            ite.count = ite.count + item.count;
          }
        });
        return prev;
      });

      return { previousBasket };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData("basket", context.previousBasket);
    },
    onSettled: () => {
      queryClient.invalidateQueries("basket");
    },
  });
  return { modify };
};

const useGetBranch = () => {
  return useQuery("branchs", APIs.getBranch, {
    refetchOnWindowFocus: false,
  });
};

const useGetPublic = () => {
  return useQuery("public", APIs.getPublic, {
    refetchOnWindowFocus: false,
  });
};

const useGetOrder = () => {
  return useQuery("order", APIs.getOrder, {
    refetchOnWindowFocus: false,
  });
};

export default {
  useLogin,
  useGetCategories,
  useGetUser,
  useGetBasket,
  addProduct,
  removeProduct,
  useMofifyCart,
  useAddProduct,
  useGetBranch,
  useGetPublic,
  useGetOrder
};
