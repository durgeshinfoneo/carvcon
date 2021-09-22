import React from 'react';
import { Link } from 'react-router-dom';
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent();

function DealerCard({ ...props }) {
  return (
    <div className="dealer-card">
      <div className={props.cardName} />
      <p className="card-title">
        {props.title}
      </p>
      <Link to={props.url}>
        <button
          className={'btn btn-create-profile'}
        >
          <T>common.profile.create-profile</T>
        </button>
      </Link>

    </div>
  );
}

export default DealerCard;
