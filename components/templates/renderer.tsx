import type {SiteViewModel} from '@/types/site';import {ModernTemplate,BoldTemplate,CleanTemplate} from './templates';
export function SiteRenderer({site}:{site:SiteViewModel}){if(site.template==='bold-contractor')return <BoldTemplate site={site}/>;if(site.template==='clean-professional')return <CleanTemplate site={site}/>;return <ModernTemplate site={site}/>}
