import React from 'react';
// @ts-ignore
import {Meta} from '@storybook/react';
// @ts-ignore
import {action} from "@storybook/addon-actions/";
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {
  title: 'Components/AppWithRedux',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]
} as Meta;

export const AppWithReduxBaseExample = () => {
  return <AppWithRedux demo={true}/>
}