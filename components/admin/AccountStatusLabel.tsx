import React from 'react';
import classNames from 'classnames';
import {AccountStatusText} from '../../view-models/User';
import {AccountStatus} from '../../models/User';

export function AccountStatusLabel({status}) {
  const accountIsActive = status === AccountStatus.ACTIVE;

  return (
    <span
      className={classNames('badge', {
        'badge-success': accountIsActive,
        'badge-secondary': !accountIsActive,
      })}>
      {AccountStatusText[status]}
    </span>
  );
}
