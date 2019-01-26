// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { CheckboxVisibility, ConstrainMode, DetailsList } from 'office-ui-fabric-react/lib/DetailsList';
import * as React from 'react';
import { Mock } from 'typemoq';
import { AssessmentInstanceTableHandler } from '../../../../../DetailsView/handlers/assessment-instance-table-handler';
import { IManualTestStepViewProps, ManualTestStepView } from '../../../../../DetailsView/components/manual-test-step-view';
import { VisualizationType } from '../../../../../common/types/visualization-type';
import { ManualTestStatus } from '../../../../../common/types/manual-test-status';
import { IManualTestStepResult } from '../../../../../common/types/store-data/iassessment-result-data';
import { CreateTestAssessmentProvider } from '../../../common/test-assessment-provider';
import { TestStatusChoiceGroup } from '../../../../../DetailsView/components/test-status-choice-group';
import {
    FailureInstancePanelControl,
    CapturedInstanceActionType,
} from '../../../../../DetailsView/components/failure-instance-panel-control';

describe('ManualTestStepView', () => {
    test('constructor: default', () => {
        const assessmentInstanceTableHandlerMock = Mock.ofType(AssessmentInstanceTableHandler);
        const props: IManualTestStepViewProps = {
            step: 'step',
            test: VisualizationType.HeadingsAssessment,
            assessmentInstanceTableHandler: assessmentInstanceTableHandlerMock.object,
            manualTestStepResultMap: {
                step: {
                    status: ManualTestStatus.UNKNOWN,
                } as IManualTestStepResult,
            },
            assessmentsProvider: CreateTestAssessmentProvider(),
        };
        const testObject = new ManualTestStepView(props);

        const expected = (
            <React.Fragment>
                <div className="test-step-choice-group-container">
                    <TestStatusChoiceGroup
                        test={props.test}
                        step={props.step}
                        status={ManualTestStatus.UNKNOWN}
                        originalStatus={ManualTestStatus.UNKNOWN}
                        onGroupChoiceChange={props.assessmentInstanceTableHandler.changeStepStatus}
                        onUndoClicked={props.assessmentInstanceTableHandler.undoStepStatusChange}
                        isLabelVisible={true}
                    />
                </div>
                <div className="manual-test-step-table-container">{null}</div>
            </React.Fragment>
        );

        expect(testObject.render()).toEqual(expected);
    });

    test('constructor: user marked fail', () => {
        const instances = [];
        const items = [];
        const assessmentInstanceTableHandlerMock = Mock.ofType(AssessmentInstanceTableHandler);
        const cols = [];

        const props: IManualTestStepViewProps = {
            step: 'step',
            test: VisualizationType.HeadingsAssessment,
            status: ManualTestStatus.FAIL,
            assessmentInstanceTableHandler: assessmentInstanceTableHandlerMock.object,
            manualTestStepResultMap: {
                step: {
                    id: 'id',
                    instances: instances,
                    status: ManualTestStatus.FAIL,
                },
            },
            assessmentsProvider: CreateTestAssessmentProvider(),
        };
        assessmentInstanceTableHandlerMock.setup(a => a.getColumnConfigsForCapturedInstance()).returns(() => cols);
        assessmentInstanceTableHandlerMock
            .setup(a => a.createCapturedInstanceTableItems(instances, props.test, props.step))
            .returns(() => items);
        const testObject = new ManualTestStepView(props);

        const expected = (
            <React.Fragment>
                <div className="test-step-choice-group-container">
                    <TestStatusChoiceGroup
                        test={props.test}
                        step={props.step}
                        status={ManualTestStatus.FAIL}
                        originalStatus={ManualTestStatus.UNKNOWN}
                        onGroupChoiceChange={props.assessmentInstanceTableHandler.changeStepStatus}
                        onUndoClicked={props.assessmentInstanceTableHandler.undoStepStatusChange}
                        isLabelVisible={true}
                    />
                </div>
                <div className="manual-test-step-table-container">
                    <React.Fragment>
                        <h3 className="test-step-instances-header">Instances</h3>
                        <FailureInstancePanelControl
                            step={props.step}
                            test={props.test}
                            actionType={CapturedInstanceActionType.CREATE}
                            addFailureInstance={props.assessmentInstanceTableHandler.addFailureInstance}
                            assessmentsProvider={props.assessmentsProvider}
                        />
                        <DetailsList
                            items={items}
                            columns={cols}
                            checkboxVisibility={CheckboxVisibility.hidden}
                            constrainMode={ConstrainMode.horizontalConstrained}
                        />
                    </React.Fragment>
                </div>
            </React.Fragment>
        );

        expect(testObject.render()).toEqual(expected);
    });
});
