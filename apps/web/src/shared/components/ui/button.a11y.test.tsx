import {render} from '@testing-library/react';
import {describe,it,expect} from 'vitest';
import axe from 'axe-core';
import {Button} from './button';
describe('Accessibility',()=>{
 it('has no axe violations for primary button',async()=>{
  const {container}=render(<Button>Save changes</Button>);
  const results=await axe.run(container);expect(results.violations).toEqual([]);
 });
});
