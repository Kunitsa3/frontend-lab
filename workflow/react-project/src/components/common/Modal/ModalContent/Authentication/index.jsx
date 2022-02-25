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
      name: '',
      password: '',
    },
    onSubmit: async values => {
      console.log(JSON.stringify(values));
      const response = await fetch('/api/sign-up', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      console.log(response.json());
    },
  });

  // const { error, value } = schema.validate({ username: 'abc', password: '1994', confirmPassword: '1994' });
  // console.log(error, value);

  return (
    <>
      <p className="authentication-title">{isSignInModalOpened ? 'Sign In' : 'Sign Up'}</p>
      <form onSubmit={formik.handleSubmit}>
        <p className="authentication-subtitle">Username</p>
        <input
          className="username-input"
          placeholder="Username"
          onChange={formik.handleChange}
          name="name"
          value={formik.values.name}
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
              value={formik.values.confirmPassword}
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
      </form>
    </>
  );
};

export default Authentication;
