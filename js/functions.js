// Функция для проверки длины строки. Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false, если строка длиннее. Эта функция нам пригодится для валидации формы.
export const checkStringLength = (string, maxLength) => string.length <= maxLength;

// Функция для проверки, является ли строка палиндромом. Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево.
export const checkIfAStringIsAPalindrome = (string) => {
  string = string.replaceAll(' ', '').toLowerCase();
  for (let currentSymbol = 0; currentSymbol < Math.floor(string.length / 2); currentSymbol++) {
    if (string[currentSymbol] !== string[string.length - currentSymbol - 1]) {
      return false;
    }
  }
  return true;
};

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN
export const returnOnlyDigitsNumber = (value) => {
  let onlyDigitsString = '';
  if (typeof(value) === 'number') {
    value = value.toString();
  }
  for (let currentSymbol = 0; currentSymbol < value.length; currentSymbol++) {
    if (!Number.isNaN(parseInt(value[currentSymbol], 10))) {
      onlyDigitsString += value[currentSymbol];
    }
  }
  return (onlyDigitsString === '') ? NaN : Number(onlyDigitsString);
};

// Функция для создания случайного целого числа из диапазона
export const createRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Напишите функцию, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.
// Время указывается в виде строки в формате часы:минуты. Для указания часов и минут могут использоваться как две цифры, так и одна. Например, 8 часов 5 минут могут быть указаны по-разному: 08:05, 8:5, 08:5 или 8:05.
// Продолжительность задаётся числом. Гарантируется, что и рабочий день, и встреча укладываются в одни календарные сутки.
const transformTimeStringIntoMinutes = (timeString) => {
  const convertedTime = timeString.split(':');
  return convertedTime[0] * 60 + convertedTime[1] * 1;
};

export const notTakingPlaceAfterWorkTime = (workDayBeginningTime, workDayEndingTime, meetingBeginningTime, meetingDurationInMinutes) => {
  workDayBeginningTime = transformTimeStringIntoMinutes(workDayBeginningTime);
  workDayEndingTime = transformTimeStringIntoMinutes(workDayEndingTime);
  meetingBeginningTime = transformTimeStringIntoMinutes(meetingBeginningTime);
  return (meetingBeginningTime >= workDayBeginningTime && meetingBeginningTime + meetingDurationInMinutes <= workDayEndingTime);
};
