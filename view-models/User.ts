import * as Yup from 'yup';
import {AccountStatus} from '../models/User';
import {constraint as AccountConstraint} from '../models/User';

export const AccountStatusText = {
  [AccountStatus.ACTIVE]: 'Active',
  [AccountStatus.INACTIVE]: 'Inactive',
};

export enum AccountEmailVerificationText {
  VERIFIED = 'Verified',
  NOT_VERIFIED = 'Not verified',
}

export const userFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required.')
    .email('Invalid Email.'),
  firstName: Yup.string()
    .required('First name is required')
    .max(
      AccountConstraint.firstName.MAX_LENGTH,
      `Last name must be less than ${AccountConstraint.firstName.MAX_LENGTH} characters.`,
    ),
  lastName: Yup.string()
    .required('Last name is required')
    .max(
      AccountConstraint.lastName.MAX_LENGTH,
      `Last name must be less than ${AccountConstraint.lastName.MAX_LENGTH} characters.`,
    ),
  password: Yup.string()
    .required('Password is required.')
    .min(
      AccountConstraint.password.MIN_LENGTH,
      `Password must contain ${AccountConstraint.password.MIN_LENGTH} - ${AccountConstraint.password.MAX_LENGTH} characters.`,
    )
    .max(
      AccountConstraint.password.MAX_LENGTH,
      `Password must contain ${AccountConstraint.password.MIN_LENGTH} - ${AccountConstraint.password.MAX_LENGTH} characters.`,
    ),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match.'),
});

export const userUpdateInfomationFormValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required.')
    .email('Invalid Email.'),
  firstName: Yup.string()
    .required('First name is required')
    .max(
      AccountConstraint.firstName.MAX_LENGTH,
      `Last name must be less than ${AccountConstraint.firstName.MAX_LENGTH} characters.`,
    ),
  lastName: Yup.string()
    .required('Last name is required')
    .max(
      AccountConstraint.lastName.MAX_LENGTH,
      `Last name must be less than ${AccountConstraint.lastName.MAX_LENGTH} characters.`,
    ),
});
