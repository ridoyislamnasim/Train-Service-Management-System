
const vendorIdGenerate = (title, postNumber) => {
  // const randomAlphabet = otpGenerator.generate(4, {
  //   upperCaseAlphabets: false,
  //   specialChars: false,
  //   lowerCaseAlphabets: false,
  // });
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
  const day = date.getDate().toLocaleString('en', { minimumIntegerDigits: 2 });
  const dateString = `${year}${month}${day}`;
  const slugifyTitle = title.toLowerCase().split(' ').join('-');
  const vendorId = `${slugifyTitle.slice(0, 5)}${dateString}${postNumber}`;
  return vendorId;
};

export default vendorIdGenerate;
