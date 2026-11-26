import {render,screen} from '@testing-library/react';
import {describe,it,expect} from 'vitest';
import {Button} from './button';
describe('Button',()=>{it('renders label',()=>{render(<Button>Submit</Button>);expect(screen.getByRole('button',{name:'Submit'})).toBeInTheDocument();});});
