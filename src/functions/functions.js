export const numberToMoney = (price) => {
    if (typeof price !== "number") return price;
    return String(price).replace(/\d(?=(\d{3})+$)/g, "$&,");
}
