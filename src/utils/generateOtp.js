function generateOtp() {
  const randomNumber =
    Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  return randomNumber;
}
export default generateOtp;
