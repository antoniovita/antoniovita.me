import Link from "next/link";
import { IBM_Plex_Mono } from "next/font/google";
import { BootTerminal } from "@/components/BootScreen";
import { bootCss, rootRedirectScript } from "@/lib/boot";

const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

// The root has no content of its own: the head script sends visitors to their language before the first paint.
// If a frame does paint, it is the loader's first frame, so the hand-off to the language page looks continuous.
export default function RootRedirect() {
  return (
    <html lang="en" className={mono.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: rootRedirectScript }} />
        <style dangerouslySetInnerHTML={{ __html: bootCss }} />
      </head>
      <body style={{ margin: 0, background: "#0b0b0b" }}>
        <div className="boot">
          <BootTerminal />
          <noscript>
            <Link href="/en/" style={{ color: "#f5f5f5", fontFamily: "ui-monospace, Menlo, monospace" }}>
              antoniovita.me
            </Link>
          </noscript>
        </div>
      </body>
    </html>
  );
}
