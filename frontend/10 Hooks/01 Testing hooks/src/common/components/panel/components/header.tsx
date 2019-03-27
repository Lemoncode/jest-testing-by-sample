import * as React from 'react';
const styles = require('./header.scss');

interface Props {
  title: string;
}

export const Header = (props: Props) => (
  <div className={`card-header ${styles.header}`}>
    <h3 className="panel-title">{props.title}</h3>
  </div>
);
