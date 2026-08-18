import './globals.css';import type {Metadata} from 'next';import {Toaster} from 'sonner';
export const metadata:Metadata={title:{default:'WebsiteFactory',template:'%s · WebsiteFactory'},description:'Create polished local business websites in minutes.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}<Toaster richColors position="bottom-right"/></body></html>}
