import React, { useState } from 'react';
import { Instagram, Play, ArrowUpRight } from 'lucide-react';
import { SOCIAL_PROFILES, SOCIAL_VIDEOS } from '../data/socialMedia';
function SocialPreview({video}:{video:typeof SOCIAL_VIDEOS[number]}) {
 const [failed,setFailed]=useState(false);
 return <a className="social-preview" href={video.url} target="_blank" rel="noopener noreferrer" aria-label={video.platform==='Instagram'?'Watch on Instagram':'Watch on TikTok'}>
  {video.cover&&!failed?<img src={video.cover} alt="" loading="lazy" decoding="async" width="240" height="320" onError={()=>setFailed(true)}/>:<span className="social-cover-fallback"><span aria-hidden="true">♪</span><small>TikTok</small></span>}
  <span className="social-play" aria-hidden="true"><Play size={17} fill="currentColor"/></span>
  <span className="social-platform">{video.platform}<ArrowUpRight size={12}/></span>
 </a>;
}
export const SocialHighlights=()=> <section id="social" className="page-width social-section" aria-label="Social videos">
 <div className="social-heading"><h2>A little more of Bajo.</h2><div className="social-accounts"><a href={SOCIAL_PROFILES.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={15}/><span>Instagram</span><ArrowUpRight size={12}/></a><a href={SOCIAL_PROFILES.tiktok} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">♪</span><span>TikTok</span><ArrowUpRight size={12}/></a></div></div>
 <div className="social-previews">{SOCIAL_VIDEOS.map(video=><SocialPreview key={video.id} video={video}/>)}</div>
</section>;
