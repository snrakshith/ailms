import {createContext,useCallback,useContext,useEffect,useMemo,useState} from 'react';
import type {ReactNode} from 'react';
import type {User,LoginInput,RegisterInput,LearnerOnboarding} from '@sapling/contracts';
import {api} from '../api/client';
import {useQueryClient} from '@tanstack/react-query';
import {identifyLearner,track} from '../analytics/analytics';

type AuthContextValue={user:User|null;loading:boolean;login:(value:LoginInput)=>Promise<void>;register:(value:RegisterInput)=>Promise<void>;googleLogin:(credential:string)=>Promise<void>;linkGoogle:(credential:string)=>Promise<void>;logout:()=>Promise<void>;completeOnboarding:(input:LearnerOnboarding)=>Promise<void>};
const AuthContext=createContext<AuthContextValue|undefined>(undefined);
export function AuthProvider({children}:{children:ReactNode}){
 const [user,setUser]=useState<User|null>(null);const [loading,setLoading]=useState(true);const queryClient=useQueryClient();
 useEffect(()=>{let cancelled=false;api<{user:User}>('/auth/me').then(result=>{if(!cancelled)setUser(result.user);}).catch(()=>{}).finally(()=>{if(!cancelled)setLoading(false);});return()=>{cancelled=true;};},[]);
 const login=useCallback(async(value:LoginInput)=>{const result=await api<{user:User}>('/auth/login',{method:'POST',body:JSON.stringify(value)});queryClient.clear();setUser(result.user);identifyLearner(result.user.id);track('signed_in',{method:'email'});},[queryClient]);
 const register=useCallback(async(value:RegisterInput)=>{const result=await api<{user:User}>('/auth/register',{method:'POST',body:JSON.stringify(value)});queryClient.clear();setUser(result.user);identifyLearner(result.user.id);track('registered',{method:'email'});},[queryClient]);
 const googleLogin=useCallback(async(credential:string)=>{const result=await api<{user:User}>('/auth/google',{method:'POST',body:JSON.stringify({credential})});queryClient.clear();setUser(result.user);identifyLearner(result.user.id);track('signed_in',{method:'google'});},[queryClient]);
 const linkGoogle=useCallback(async(credential:string)=>{const result=await api<{user:User}>('/auth/google/link',{method:'POST',body:JSON.stringify({credential})});queryClient.clear();setUser(result.user);identifyLearner(result.user.id);},[queryClient]);
 const logout=useCallback(async()=>{await api('/auth/logout',{method:'POST'});queryClient.clear();identifyLearner(null);setUser(null);},[queryClient]);
 const completeOnboarding=useCallback(async(input:LearnerOnboarding)=>{const result=await api<{user:User}>('/auth/onboarding',{method:'PUT',body:JSON.stringify(input)});queryClient.clear();setUser(result.user);identifyLearner(result.user.id);},[queryClient]);
 const state=useMemo(()=>({user,loading,login,register,googleLogin,linkGoogle,logout,completeOnboarding}),[user,loading,login,register,googleLogin,linkGoogle,logout,completeOnboarding]);
 return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}
export function useAuth(){const value=useContext(AuthContext);if(!value)throw new Error('useAuth must be inside AuthProvider');return value;}
