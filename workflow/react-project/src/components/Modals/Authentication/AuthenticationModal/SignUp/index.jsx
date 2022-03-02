import { useDispatch } from 'react-redux';

import * as yup from 'yup';
import { useFormik } from 'formik';

import Button from '@common/Button';
import Input from '@common/Input';
import HelperText from '../../HelperText';

import { fetchSignUp } from '@store/authentication/action';
import './style.less';

const schema = yup.object().shape({
  name: yup.string().min(3).max(30).required(),
  password: yup.string().required(),
  confirmPassword: yup.string().equals([yup.ref('password')], 'Should be equal to password'),
});

const inputsProps = [
  {
    key: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Username',
  },
  {
    key: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Password',
  },
  {
    key: 'confirmPassword',
    label: 'Confirm password',
    type: 'password',
    placeholder: 'Confirm password',
  },
];

const SignUp = ({ setModalClosed, setSignInModalOpened }) => {
  const dispatch = useDispatch();

  const { values, handleChange, handleBlur, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      name: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    onSubmit: values => {
      dispatch(fetchSignUp({ values, onSuccess: setModalClosed }));
    },
  });

  return (
    <>
      <p className="authentication-title">Sign Up</p>
      <form onSubmit={handleSubmit}>
        {inputsProps.map(({ key, label, type, placeholder }) => (
          <Input
            key={key}
            type={type}
            label={label}
            name={key}
            placeholder={placeholder}
            value={values[key]}
            onChange={handleChange}
            onBlur={handleBlur}
            errorsMessage={errors[key] && touched[key] ? errors[key] : null}
          />
        ))}
        <HelperText text="Already signed up?" linkText="Go to login" onClick={setSignInModalOpened} />
        <Button className="authentication-button" type="submit">
          Sign Up
        </Button>
      </form>
    </>
  );
};

export default SignUp;
