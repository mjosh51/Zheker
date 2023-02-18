# Zheker
A simple validator and xss filter for expressjs.

Still in beta....

For testing purposes only

Create a route, for example

```
import express from 'express';
const router = express.Router();
import auth from '../controllers/auth.js'; // path to authentication logic
import Check from '/path-to-check.js';

router.post('/', Check('email').isEmail(), auth);
router.post('/', Check('password').isPassword(), auth);
```
isEmail() checks if the req.body.email is a valid email address,

isPassword() checks if the req.body.password is a valid password

Others are isFirstName(), isLastName(), isPhone(), isShortText(), isLongText(). These functions each validate input and filter out dangerous entries.
