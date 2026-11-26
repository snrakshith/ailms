import type {Meta,StoryObj} from '@storybook/react';
import {Button} from './button';
const meta={title:'Components/Button',component:Button,args:{children:'Create task'}} satisfies Meta<typeof Button>;
export default meta;type Story=StoryObj<typeof meta>;
export const Primary:Story={};export const Secondary:Story={args:{variant:'secondary'}};
export const Danger:Story={args:{variant:'danger'}};
