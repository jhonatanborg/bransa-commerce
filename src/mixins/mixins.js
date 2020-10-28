export default {
  methods: {
    convertMoney(money) {
      if (money > 0) {
        const toCurrency = (n, curr, LanguageFormat = undefined) =>
          Intl.NumberFormat(LanguageFormat, {
            style: "currency",
            currency: curr,
          }).format(n);
        return toCurrency(money, "BRL");
      } else {
        return "Grátis";
      }
    },
    statuspurchase(status) {
      let statusColor;
      switch (status) {
        case "pendente":
          statusColor = "warning";
          break;
        case "confirmado":
          statusColor = "purple";
          break;
        case "despachado":
          statusColor = "primary";
          break;
        case "entregue":
          statusColor = "green";
          break;
        case "cancelado":
          statusColor = "red";
          break;
        default:
          break;
      }
      return statusColor;
    },
    convertDate(date) {
      return date
        .substr(0, 10)
        .split("-")
        .reverse()
        .join("/");
    },
  },
};
