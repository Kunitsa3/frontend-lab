import { useState } from 'react';

import Joi from 'joi';
import { useFormik } from 'formik';

import Button from '../../../Button';
import PasswordInput from './PasswordInput';

import './style.less';

const schema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  confirmPassword: Joi.ref('password'),
});

const Authentication = () => {
  const [isSignInModalOpened, setSignInModalOpened] = useState(true);

  const handleAuthenticationStateChange = () => {
    setSignInModalOpened(!isSignInModalOpened);
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { error, value } = schema.validate({ username: 'abc', password: '1994', confirmPassword: '1994' });
  console.log(error, value);

  return (
    <>
      <p className="authentication-title">{isSignInModalOpened ? 'Sign In' : 'Sign Up'}</p>
      <p className="authentication-subtitle">Username</p>
      <input
        className="username-input"
        placeholder="Username"
        onChange={formik.handleChange}
        name="username"
        value={formik.values.username}
        required
      ></input>
      <PasswordInput
        title="Password"
        placeholder="Password"
        onChange={formik.handleChange}
        name="password"
        value={formik.values.password}
      />
      {!isSignInModalOpened && (
        <>
          <PasswordInput
            title="Confirm password"
            placeholder="!Password"
            onChange={formik.handleChange}
            name="confirmPassword"
            value={formik.values.password}
          />
        </>
      )}
      {isSignInModalOpened ? (
        <>
          <p className="sign-up-notification">
            Don't have an account?{' '}
            <span className="sign-up-text" onClick={handleAuthenticationStateChange}>
              Sign up
            </span>
          </p>
        </>
      ) : (
        <>
          <p className="sign-up-notification">
            Already signed up?{' '}
            <span className="sign-up-text" onClick={handleAuthenticationStateChange}>
              Go to login
            </span>
          </p>
        </>
      )}
      <Button className="authentication-button" type="submit">
        {isSignInModalOpened ? 'Sign In' : 'Sign Up'}
      </Button>
    </>
  );
};

export default Authentication;
