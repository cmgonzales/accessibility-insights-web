// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import {
    FailedInstancesSection,
    FailedInstancesSectionDeps,
    FailedInstancesSectionProps,
} from 'common/components/cards/failed-instances-section';
import { shallow } from 'enzyme';
import * as React from 'react';

import { exampleUnifiedRuleResult } from './sample-view-model-data';

describe('FailedInstancesSection', () => {
    it('renders', () => {
        const props: FailedInstancesSectionProps = {
            deps: {} as FailedInstancesSectionDeps,
            ruleResultsByStatus: {
                pass: [],
                fail: [exampleUnifiedRuleResult, exampleUnifiedRuleResult],
                inapplicable: [],
                unknown: [],
            },
        };

        const wrapper = shallow(<FailedInstancesSection {...props} />);

        expect(wrapper.getElement()).toMatchSnapshot();
    });

    it('renders null when result is null', () => {
        const props: FailedInstancesSectionProps = {
            deps: {} as FailedInstancesSectionDeps,
            ruleResultsByStatus: null,
        };

        const wrapper = shallow(<FailedInstancesSection {...props} />);

        expect(wrapper.getElement()).toMatchSnapshot();
    });
});