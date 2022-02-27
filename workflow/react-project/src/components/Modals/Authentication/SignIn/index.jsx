import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as yup from 'yup';
import { useFormik } from 'formik';

import Button from '@common/Button';
import UsernameInput from '@common/UsernameInput';
import PasswordInput from '@common/PasswordInput';
import AuthenticationNotification from '@common/AuthenticationNotification';
import Modal from '@common/Modal';
import Spinner from '@common/Spinner';

import { fetchAuthenticationTokenAfterSignIn } from '@store/authentication/asyncThunks';
import { selectAuthenticationLoading } from '@store/authentication/selectors';
import { selectAuthenticationToken } from '@store/authentication/selectors';
import './style.less';

const schema = yup.object().shape({
  name: yup.string().min(3).max(30).required(),
  password: yup.string().required(),
});

const SignIn = ({ title, setModalClosed, setSignInModalOpened }) => {
  const dispatch = useDispatch();
  const authenticationLoadingStatus = useSelector(selectAuthenticationLoading);
  const authenticationToken = useSelector(selectAuthenticationToken);

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async values => {
      dispatch(fetchAuthenticationTokenAfterSignIn({ values, onSuccess: () => setModalClosed() }));
      authenticationToken && setModalClosed();
    },
  });

  return (
    <Modal title={title} setModalClosed={setModalClosed}>
      {authenticationLoadingStatus ? (
        <Spinner loading={authenticationLoadingStatus} />
      ) : (
        <>
          <p className="authentication-title">Sign In</p>
          <form onSubmit={handleSubmit}>
            <UsernameInput
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              touched={touched}
              errors={errors}
              errorsMessage={errors.name && touched.name ? errors.name : null}
            />
            <PasswordInput
              title="Password"
              placeholder="Password"
              onChange={handleChange}
              name="password"
              value={values.password}
              onBlur={handleBlur}
              touched={touched}
              errors={errors}
              errorsMessage={errors.password && touched.password ? errors.password : null}
            />

            <AuthenticationNotification
              normalText="Don't have an account? "
              coloredText="Sign up"
              onClick={setSignInModalOpened}
            />

            <Button className="authentication-button" type="submit">
              Sign In
            </Button>
          </form>
        </>
      )}
    </Modal>
  );
};

export default SignIn;
