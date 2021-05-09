import React from 'react';
// @ts-ignore
import {Meta} from '@storybook/react';
// @ts-ignore
import {action} from "@storybook/addon-actions/";
import {EditableSpan} from "../components/EditableSpan";

export default {
  title: 'Components/EditableSpan',
  component: EditableSpan,
} as Meta;

const onChangeCallback = action('Value changed')

export const EditableSpanBaseExample = () => {
  return <EditableSpan value={'JavaScript'} onChange={onChangeCallback} />
}