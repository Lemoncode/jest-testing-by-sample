import * as React from 'react';
import { ContentCenter } from '../../common/components/contentCenter';
import { Panel } from '../../common/components/panel';
import { Form, FormProps } from './components';

export const LoginPage: React.StatelessComponent<FormProps> = (props) => (
  <ContentCenter>
    <Panel title="Please sign in">
      <Form
        {...props}
      />
    </Panel>
  </ContentCenter>
);
