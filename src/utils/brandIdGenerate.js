import otpGenerator from 'otp-generator';

const brandIdGenerate = (title) => {
  const randomAlphabet = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  const date = new Date();
  const year = date.toLocaleString('en', { year: '2-digit' });
  const month = date.getMonth();
  const day = date.getDate();
  const dateString = `${year}${month}${day}`;
  const orderId = `${title}${dateString}${randomAlphabet}`;
  return orderId;
};
export default brandIdGenerate;
