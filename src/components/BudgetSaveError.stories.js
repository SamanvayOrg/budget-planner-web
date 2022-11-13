import React from 'react';
import BudgetSaveError from './BudgetSaveError';

export default {
    title: 'BudgetSaveError',
    component: BudgetSaveError,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <BudgetSaveError {...args} />;

//👇 Each story then reuses that template
export const Primary = Template.bind({});
Primary.args = {
    errors: ["Error number 1", "Error number 2"],
    open: true,
};
