import otpGenerator from 'otp-generator';

const slugGenerate = (name) => {
  const randomAlphabet = otpGenerator.generate(4, {
    digits: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  return `${name}-${randomAlphabet}`;
};

export default slugGenerate;
