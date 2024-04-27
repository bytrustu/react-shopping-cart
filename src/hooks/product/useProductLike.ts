import { useAddProductLikeMutation, useRemoveProductLikeMutation, useUpdateProductLikesMutation } from '@/queries';

export const useProductLike = () => {
  const removeProductLikeMutation = useRemoveProductLikeMutation();
  const addProductLikeMutation = useAddProductLikeMutation();
  const setProductsLike = useUpdateProductLikesMutation();
  const toggleProductLike = (id: number, liked: boolean) => {
    if (liked) {
      removeProductLikeMutation.mutate(id);
    } else {
      addProductLikeMutation.mutate(id);
    }
  };

  return {
    remove: removeProductLikeMutation.mutate,
    add: addProductLikeMutation.mutate,
    update: setProductsLike.mutate,
    toggle: toggleProductLike,
  };
};
