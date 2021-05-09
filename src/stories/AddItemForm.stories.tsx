import React from 'react';
// @ts-ignore
import {Meta } from '@storybook/react';

import {AddItemForm} from "../components/AddItemForm";
// @ts-ignore
import {action} from "@storybook/addon-actions/";

export default {
  title: 'Components/AddItemForm',
  component: AddItemForm,
} as Meta;

const addItemCallback = action('Button inside from clicked')

export const AddItemFormsBaseExample = () => {
  return <AddItemForm addItem={addItemCallback} />
}