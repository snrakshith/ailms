import {describe,it,expect} from 'vitest';
import {createTaskSchema,registerSchema} from '@sapling/contracts';
describe('Shared HTTP contracts',()=>{
 it('rejects short passwords',()=>expect(registerSchema.safeParse({name:'Ada',email:'ada@example.org',password:'weak'}).success).toBe(false));
 it('normalizes task defaults',()=>expect(createTaskSchema.parse({title:'ship'})).toEqual({title:'ship',description:'',status:'todo'}));
});
