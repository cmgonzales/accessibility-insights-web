// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { css } from '@fluentui/react';
import { NamedFC } from 'common/react/named-fc';
import { IPanelProps, Panel } from '@fluentui/react';
import * as React from 'react';
import * as styles from './generic-panel.scss';

export type GenericPanelProps = IPanelProps & {
    innerPanelAutomationId?: string;
};

export const GenericPanel = NamedFC<GenericPanelProps>('GenericPanel', props => (
    <Panel
        {...props}
        data-automation-id={props.innerPanelAutomationId}
        className={css(styles.genericPanel, props.className)}
        isLightDismiss={true}
        headerClassName={styles.headerText}
    >
        {props.children}
    </Panel>
));
