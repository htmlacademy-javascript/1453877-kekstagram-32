// Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее. Эта функция нам пригодится для валидации формы.
const checkStringLength = (string, maxLength) => string.length <= maxLength;

// Функция для проверки, является ли строка палиндромом. Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево.
const checkIfAStringIsAPalindrome = (string) => {
  const modifiedString = string.replaceAll(' ', '').toLowerCase();
  for (let currentSymbol = 0; currentSymbol < Math.floor(modifiedString.length / 2); currentSymbol++) {
    if (modifiedString[currentSymbol] !== modifiedString[modifiedString.length - currentSymbol - 1]) {
      return false;
    }
    return true;
  }
};

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN
const returnOnlyDigitsNumber = (value) => {
  let stringValue = '';
  let onlyDigitsString = '';
  if (typeof(value) === 'number') {
    stringValue = value.toString();
  } else {
    stringValue = value;
  }
  for (let currentSymbol = 0; currentSymbol < stringValue.length; currentSymbol++) {
    if (!Number.isNaN(parseInt(stringValue[currentSymbol], 10))) {
      onlyDigitsString = onlyDigitsString + stringValue[currentSymbol];
    }
  }
  if (onlyDigitsString === '') {
    return NaN;
  }
  return Number(onlyDigitsString);
};

checkStringLength();
checkIfAStringIsAPalindrome();
returnOnlyDigitsNumber();
