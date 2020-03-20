import React from 'react';
import classNames from 'classnames';
import {AccountEmailVerificationText} from '../../view-models/User';

export function AccountEmailVerificationLabel({emailVerified}) {
  return (
    <span
      className={classNames('badge', {
        'badge-success': emailVerified,
        'badge-secondary': !emailVerified,
      })}>
      {emailVerified ? AccountEmailVerificationText.VERIFIED : AccountEmailVerificationText.NOT_VERIFIED}
    </span>
  );
}
