const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const textRegex = /^([a-zA-Z]{3,30})$/;
const numberRegex = /(^(\+)?\d{8,15}$)/;
const urlRegex = /^https:\/\/[^`~!@#$%^&*()_+={}\[\]|\\:;“’<,>?๐฿]*$/;
const specialCharacters = /<?\/?[\w\s\W]*>|<.+[\W]>?/g;
const ampersandCharacters = /&/g;
const hashCharacters = /#/g;
const passwordRegex =
  /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
/**
 * @name Zheker
 * @desc A simple validator and xss filter for form entries.
 * @author Joshua Mayowa
 * @version 1.0
 * @date January 2023
 */
export default function Check(param) {
  const isEmail = (req, res, next) => {
    const email = req.body[param];
    const isEmail = emailRegex.test(email);
    if (!isEmail)
      return res.status(400).json({
        status: 'Bad Request',
        code: 400,
        message: 'Sorry, you must enter a valid email address.',
      });
    next();
  };
  const isFirstName = (req, res, next) => {
    const firstname = req.body[param];
    const isFirstName = textRegex.test(firstname);
    if (!isFirstName)
      return res.status(400).json({
        status: 'Bad Request',
        code: 400,
        message: 'Sorry, you must enter a valid name.',
      });
    next();
  };
  const isLastName = (req, res, next) => {
    const lastname = req.body[param];
    const isLastName = textRegex.test(lastname);
    if (!isLastName)
      return res.status(400).json({
        status: 'Bad Request',
        code: 400,
        message: 'Sorry, you must enter a valid name.',
      });
    next();
  };
  const isPhone = (req, res, next) => {
    const phone = req.body[param];
    const isPhone = numberRegex.test(phone);
    if (!isPhone)
      return res.status(400).json({
        status: 'Bad Request',
        code: 400,
        message: 'Sorry, you must enter a valid phone number.',
      });
    next();
  };
  const isUrl = (req, res, next) => {
    const url = req.body[param];
    const isUrl = urlRegex.test(url);
    if (!isUrl)
      return res.status(400).json({
        status: 'Bad Request',
        code: 400,
        message: 'Sorry, you must enter a valid url, starting with "https://".',
      });
    next();
  };
  const isShortText = (req, res, next) => {
    const isShortText = textRegex.test(req.body[param]);
    if (!isShortText)
      return res.status(400).json({
        status: 'Bad Request',
        code: 400,
        message: `Sorry, your input is invalid for ${param}.`,
      });
    next();
  };
  const isLongText = (req, res, next) => {
    // Filter out dangerous characters
    req.body[param] = req.body[param].replaceAll(specialCharacters, '');
    req.body[param] = req.body[param].replaceAll(ampersandCharacters, '&amp;');
    req.body[param] = req.body[param].replaceAll(hashCharacters, '');
    next();
  };
  const isPassword = (req, res, next) => {
    const password = req.body[param];
    const isPassword = passwordRegex.test(password);
    if (!isPassword)
      return res.status(400).json({
        status: 'Bad Request',
        code: 400,
        message:
          'Sorry, password should have at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be at least 8 characters long',
      });
    next();
  };
  return {
    isEmail,
    isFirstName,
    isLastName,
    isPhone,
    isUrl,
    isShortText,
    isLongText,
    isPassword,
  };
}
