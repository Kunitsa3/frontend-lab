import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as yup from 'yup';
import { useFormik } from 'formik';

import Button from '@common/Button';
import Modal from '@common/Modal';
import Spinner from '@common/Spinner';
import Input from '@common/Input';
import HelperText from '../HelperText';

import { fetchAuthenticationTokenAfterSignUp } from '@store/authentication/asyncThunks';
import { selectAuthenticationLoading } from '@store/authentication/selectors';
import './style.less';

const schema = yup.object().shape({
  name: yup.string().min(3).max(30).required(),
  password: yup.string().required(),
  confirmPassword: yup.string().equals([yup.ref('password')], 'Should be equal to password'),
});

const SignUp = ({ title, setModalClosed, setSignInModalOpened }) => {
  const dispatch = useDispatch();
  const authenticationLoadingStatus = useSelector(selectAuthenticationLoading);

  const { values, handleChange, handleBlur, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      name: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    onSubmit: async values => {
      dispatch(fetchAuthenticationTokenAfterSignUp({ values, onSuccess: () => setModalClosed() }));
    },
  });

  return (
    <Modal title={title} setModalClosed={setModalClosed}>
      {authenticationLoadingStatus ? (
        <Spinner loading={authenticationLoadingStatus} />
      ) : (
        <>
          <p className="authentication-title">Sign Up</p>
          <form onSubmit={handleSubmit}>
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              touched={touched}
              errors={errors}
              errorsMessage={errors.name && touched.name ? errors.name : null}
            />
            <Input
              title="Password"
              placeholder="Password"
              onChange={handleChange}
              name="password"
              value={values.password}
              onBlur={handleBlur}
              touched={touched}
              errors={errors}
              type="password"
              errorsMessage={errors.password && touched.password ? errors.password : null}
            />

            <Input
              title="Confirm password"
              placeholder="!Password"
              onChange={handleChange}
              name="confirmPassword"
              value={values.confirmPassword}
              type="password"
              onBlur={handleBlur}
              errorsMessage={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : null}
            />

            <HelperText normalText="Already signed up? " coloredText="Go to login" onClick={setSignInModalOpened} />

            <Button className="authentication-button" type="submit">
              Sign Up
            </Button>
          </form>
        </>
      )}
    </Modal>
  );
};

export default SignUp;
