// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import * as React from 'react';

import { NamedSFC } from '../../common/react/named-sfc';

export type IGenericDialogProps = {
    onPrimaryButtonClick: (event: React.MouseEvent<any>) => void;
    onCancelButtonClick: (event: React.MouseEvent<any>) => void;
    messageText: string;
    title: string;
    primaryButtonText: string;
};

export const GenericDialog = NamedSFC<IGenericDialogProps>('GenericDialog', props => {
    const { onCancelButtonClick, onPrimaryButtonClick, messageText, title, primaryButtonText } = props;

    return (
        <Dialog
            hidden={false}
            onDismiss={onCancelButtonClick}
            dialogContentProps={{
                type: DialogType.normal,
                title: title,
            }}
            modalProps={{
                isBlocking: true,
                containerClassName: 'insights-dialog-main-override',
            }}
        >
            <div className={'start-over-dialog-body'}>{messageText}</div>
            <DialogFooter>
                <PrimaryButton onClick={onPrimaryButtonClick} text={primaryButtonText} />
                <DefaultButton onClick={onCancelButtonClick} text={'Cancel'} />
            </DialogFooter>
        </Dialog>
    );
});
