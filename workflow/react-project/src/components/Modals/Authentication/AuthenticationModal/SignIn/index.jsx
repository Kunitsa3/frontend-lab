import { useDispatch } from 'react-redux';

import * as yup from 'yup';
import { useFormik } from 'formik';

import Button from '@common/Button';
import Input from '@common/Input';
import HelperText from '../../HelperText';

import { fetchSignIn } from '@store/authentication/action';
import './style.less';

const schema = yup.object().shape({
  name: yup.string().min(3).max(30).required(),
  password: yup.string().required(),
});

const inputsProps = [
  {
    key: 'name',
    label: 'Name',
    placeholder: 'Username',
    type: 'text',
  },
  {
    key: 'password',
    label: 'Password',
    placeholder: 'Password',
    type: 'password',
  },
];

const SignIn = ({ setModalClosed, setSignInModalOpened }) => {
  const dispatch = useDispatch();

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: values => {
      dispatch(fetchSignIn({ values, onSuccess: setModalClosed }));
    },
  });

  return (
    <>
      <p className="authentication-title">Sign In</p>
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
        <HelperText text="Don't have an account?" linkText="Sign up" onClick={setSignInModalOpened} />
        <Button className="authentication-button" type="submit">
          Sign In
        </Button>
      </form>
    </>
  );
};

export default SignIn;
