function insertDecimal(num) {
  return (num / 100).toFixed(2);
}

const useGetItemDetails = (item) => {
  let rawDescription;
  if (item.description) {
    rawDescription = item.rawDescription.raw.children;
  }
  const isNewProduct = item.isNewProduct;
  const isPromoProduct = item.onPromotion;
  const price = insertDecimal(item.price);
  const tempPrice = item.price;
  const discount = item.discount;
  const discountPrice = insertDecimal(tempPrice - tempPrice * (discount / 100));
  let imgsrc = isNewProduct
    ? '/new.png'
    : isPromoProduct
    ? '/promo.png'
    : '/transp.png';
  const mainImgSrc = item.images[0].url;
  const id = item.id;
  const title = item.title;
  const stock = item.stock;
  const description = item.description;
  const numItems = 1;

  return {
    isNewProduct,
    isPromoProduct,
    price,
    tempPrice,
    discount,
    discountPrice,
    imgsrc,
    mainImgSrc,
    id,
    title,
    stock,
    description,
    rawDescription: rawDescription,
    numItems,
  };
};

export default useGetItemDetails;
