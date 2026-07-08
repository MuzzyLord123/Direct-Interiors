import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const DIST='dist', PORT=Number(process.env.PORT||4180);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json','.xml':'application/xml','.woff2':'font/woff2','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.avif':'image/avif','.png':'image/png','.txt':'text/plain','.ico':'image/x-icon'};
createServer((req,res)=>{
  let p=decodeURIComponent(req.url.split('?')[0]);
  let file=join(DIST,p);
  try{ if(existsSync(file)&&statSync(file).isDirectory()) file=join(file,'index.html'); }catch{}
  if(!existsSync(file)){ const alt=join(DIST,p,'index.html'); file=existsSync(alt)?alt:join(DIST,'index.html'); }
  const ext=extname(file), ct=types[ext]||'application/octet-stream', ae=req.headers['accept-encoding']||'';
  res.setHeader('Content-Type',ct);
  if(/\.(js|css|woff2)$/.test(ext)) res.setHeader('Cache-Control','public,max-age=31536000,immutable');
  if(ae.includes('br')&&existsSync(file+'.br')){res.setHeader('Content-Encoding','br');res.setHeader('Vary','Accept-Encoding');res.end(readFileSync(file+'.br'));return;}
  if(ae.includes('gzip')&&existsSync(file+'.gz')){res.setHeader('Content-Encoding','gzip');res.setHeader('Vary','Accept-Encoding');res.end(readFileSync(file+'.gz'));return;}
  res.end(readFileSync(file));
}).listen(PORT,()=>console.log('serve-compressed up on '+PORT));
