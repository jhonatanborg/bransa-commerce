/* eslint-disable no-plusplus */
export default {
  methods: {
    convertMoney(money) {
      const toCurrency = (n, curr, LanguageFormat = undefined) =>
        Intl.NumberFormat(LanguageFormat, {
          style: 'currency',
          currency: curr,
        }).format(n);
      return toCurrency(money, 'BRL');
    },
    statuspurchase(status) {
      let statusColor;
      switch (status) {
        case 'pendente':
          statusColor = 'warning';
          break;
        case 'confirmado':
          statusColor = 'purple';
          break;
        case 'despachado':
          statusColor = 'primary';
          break;
        case 'entregue':
          statusColor = 'green';
          break;
        case 'cancelado':
          statusColor = 'red';
          break;
        default:
          break;
      }
      return statusColor;
    },
    convertDate(date) {
      return date
        .substr(0, 10)
        .split('-')
        .reverse()
        .join('/');
    },
    validateCNPJ(value) {
      if (!value) return false;

      // Aceita receber o valor como string, número ou array com todos os dígitos
      const validTypes =
        typeof value === 'string' || Number.isInteger(value) || Array.isArray(value);

      // Elimina valor em formato inválido
      if (!validTypes) return false;

      // Guarda um array com todos os dígitos do valor
      const match = value.toString().match(/\d/g);
      const numbers = Array.isArray(match) ? match.map(Number) : [];

      // Valida a quantidade de dígitos
      if (numbers.length !== 14) return false;

      // Elimina inválidos com todos os dígitos iguais
      const items = [...new Set(numbers)];
      if (items.length === 1) return false;

      // Cálculo validador
      const calc = x => {
        const slice = numbers.slice(0, x);
        let factor = x - 7;
        let sum = 0;

        // eslint-disable-next-line no-plusplus
        for (let i = x; i >= 1; i--) {
          const n = slice[x - i];
          // eslint-disable-next-line no-plusplus
          sum += n * factor--;
          if (factor < 2) factor = 9;
        }

        const result = 11 - (sum % 11);

        return result > 9 ? 0 : result;
      };

      // Separa os 2 últimos dígitos de verificadores
      const digits = numbers.slice(12);

      // Valida 1o. dígito verificador
      const digit0 = calc(12);
      if (digit0 !== digits[0]) return false;

      // Valida 2o. dígito verificador
      const digit1 = calc(13);
      return digit1 === digits[1];
    },
    validateCPF(value) {
      let sum;
      let rest;
      sum = 0;
      if (value === '00000000000') return false;
      let i;
      // eslint-disable-next-line radix
      for (i = 1; i <= 9; i++) sum += parseInt(value.substring(i - 1, i)) * (11 - i);
      rest = (sum * 10) % 11;

      if (rest === 10 || rest === 11) rest = 0;
      // eslint-disable-next-line radix
      if (rest !== parseInt(value.substring(9, 10))) return false;

      sum = 0;
      // eslint-disable-next-line radix
      for (i = 1; i <= 10; i++) sum += parseInt(value.substring(i - 1, i)) * (12 - i);
      rest = (sum * 10) % 11;

      if (rest === 10 || rest === 11) rest = 0;
      // eslint-disable-next-line radix
      if (rest !== parseInt(value.substring(10, 11))) return false;
      return true;
    },
  },
};
