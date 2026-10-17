import React, { createContext, useContext, useEffect, useState } from 'react';
import { getLanguage, Language, translate, translateMessage } from './language';
const LanguageContext=createContext<{language:Language;setLanguage:(l:Language)=>void}>({language:'en',setLanguage:()=>{}});
export function LanguageProvider({children}:{children:React.ReactNode}) {
  const [language,setLanguage]=useState<Language>(getLanguage);
  useEffect(()=>{document.documentElement.lang=language==='zh'?'zh-CN':language;try{localStorage.setItem('lotus-language',language);}catch{}},[language]);
  return <LanguageContext.Provider value={{language,setLanguage:(next)=>{try{localStorage.setItem("lotus-language",next);}catch{}setLanguage(next);}}}>{children}</LanguageContext.Provider>;
}
export function LanguageSwitcher(){
  const {language,setLanguage}=useContext(LanguageContext);
  return <label className="language-picker"><span aria-hidden="true">◎</span><span className="sr-only">Language</span><select aria-label="Language" value={language} onChange={e=>setLanguage(e.target.value as Language)}><option value="en" lang="en">EN</option><option value="zh" lang="zh-CN">中文</option><option value="id" lang="id">ID</option><option value="es" lang="es" title="Español">ES</option><option value="it" lang="it" title="Italiano">IT</option></select></label>;
}
// Translate React's render output, never mutate the DOM. Stable wrappers preserve
// component identity, hooks and in-progress form state when language changes.
const wrappers=new WeakMap<Function,React.ComponentType<any>>();
export function localizedComponent<P extends object>(Component:React.FunctionComponent<P>):React.FunctionComponent<P>{
  let Wrapped=wrappers.get(Component);
  if(!Wrapped){ Wrapped=function LocalizedComponent(props:P){const {language}=useContext(LanguageContext);return localize(Component(props) as React.ReactNode,language);}; wrappers.set(Component,Wrapped); }
  return Wrapped as React.FunctionComponent<P>;
}
function localize(node:React.ReactNode,language:Language):React.ReactNode {
  if(typeof node==='string')return translate(node,language);
  if(Array.isArray(node))return node.map(child=>localize(child,language));
  if(!React.isValidElement(node))return node;
  if(typeof node.type==='function')return React.createElement(localizedComponent(node.type as React.FunctionComponent<any>),{...node.props as object,key:node.key});
  // SVG icons and other forwardRef components don't contain editorial text.
  if(typeof node.type!=='string'&&node.type!==React.Fragment)return node;
  const props={...node.props as Record<string,any>};
  for(const key of ['title','placeholder','aria-label','alt'])if(typeof props[key]==='string')props[key]=translate(props[key],language);
  if(typeof props.href==='string'&&props.href.startsWith('https://wa.me/')){
    const url=new URL(props.href);const msg=url.searchParams.get('text');if(msg){url.searchParams.set('text',translateMessage(msg,language));props.href=url.toString();}
  }
  if(typeof props.src==='string'&&props.src.startsWith('https://maps.google.com/'))props.src=props.src.replace('hl=en','hl='+(language==='zh'?'zh-CN':language));
  if(props.children!==undefined)props.children=localize(props.children,language);
  return React.cloneElement(node,props);
}






