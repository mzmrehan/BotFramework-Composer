import React from 'react';

import { NodeClickActionTypes } from '../../utils/constant';

import { FormCard } from './templates/FormCard';
import { NodeProps, defaultNodeProps } from './sharedProps';

export class BeginDialog extends React.Component {
  renderCallDialogLink() {
    const { data, onEvent } = this.props;
    if (!data || !data.dialog) return null;

    const calleeDialog = typeof data.dialog === 'object' ? data.dialog.$ref : data.dialog;
    return (
      <span
        style={{
          cursor: 'pointer',
          color: 'blue',
        }}
        onClick={e => {
          e.stopPropagation();
          onEvent(NodeClickActionTypes.OpenLink, calleeDialog);
        }}
      >
        {calleeDialog}
      </span>
    );
  }

  render() {
    const { id, onEvent } = this.props;
    return (
      <FormCard
        themeColor="#107C10"
        header="BeginDialog"
        label={this.renderCallDialogLink()}
        onClick={() => {
          onEvent(NodeClickActionTypes.Focus, id);
        }}
      />
    );
  }
}

BeginDialog.propTypes = NodeProps;
BeginDialog.defaultProps = defaultNodeProps;