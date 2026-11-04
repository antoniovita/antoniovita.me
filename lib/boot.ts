/**
 * Runs in <head> before paint: visitors who already saw the loader this session (or ask for reduced motion)
 * get `data-booted` straight away, so the loader never flashes for them.
 */
export const bootInitScript = `try{if(sessionStorage.getItem("boot")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.booted=""}catch(e){document.documentElement.dataset.booted=""}`;

/** Sends the bare root to the visitor's language before anything renders. English by default. */
export const rootRedirectScript = `(function(){var l=((navigator.languages&&navigator.languages[0])||navigator.language||"en").toLowerCase();location.replace("/"+(l.indexOf("pt")===0?"pt":l.indexOf("it")===0?"it":"en")+"/")})()`;

/**
 * Loader styles, inlined in <head> instead of living in globals.css: the overlay must look right on the very
 * first paint, and the root page (outside the [locale] layout) shows the same first frame.
 * Progress comes from --p (0 to 1), set by BootScreen.
 */
export const bootCss = `
.boot{--p:0;position:fixed;inset:0;z-index:200;display:grid;place-items:center;padding:24px;background:#0b0b0b;color:#f5f5f5;transition:opacity 500ms cubic-bezier(0.16,1,0.3,1)}
.boot[data-leaving]{opacity:0;pointer-events:none}
html[data-booted] .boot{display:none}
html:not([data-booted]) body{overflow:hidden}
.boot-term{display:grid;width:min(520px,100%);gap:6px;font:400 clamp(12px,3.2vw,14px)/1.5 var(--font-plex-mono,ui-monospace),ui-monospace,SFMono-Regular,Menlo,monospace}
.boot-term p{margin:0}
.boot-term i{font-style:normal;color:#ffe14d}
.boot-t{overflow:hidden;white-space:nowrap;width:calc(var(--len)*1ch*clamp(0,calc((var(--p) - var(--at))/0.14),1))}
.boot-dim{color:#8e8e8e}
.boot-ok{color:#ffe14d}
.boot-bar{display:flex;align-items:center;gap:14px;opacity:clamp(0,calc((var(--p) - 0.56)*20),1)}
.boot-bar span{flex:1;height:5px;border-radius:99px;background:rgba(255,255,255,.14);overflow:hidden}
.boot-bar span i{display:block;height:100%;background:#ffe14d;transform-origin:left;transform:scaleX(var(--p))}
.boot-bar b{min-width:4ch;font-weight:500;font-variant-numeric:tabular-nums}
.boot-bar b span{all:unset}
.boot-cursor{display:inline-block;width:.6em;height:1.1em;background:#f5f5f5;vertical-align:-.2em;animation:boot-blink 1s steps(1) infinite}
@keyframes boot-blink{50%{opacity:0}}
@media (prefers-reduced-motion:reduce){.boot-cursor{animation:none}}
`;
