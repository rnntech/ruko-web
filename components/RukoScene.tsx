/**
 * RukoBot and the grandmother (D-048, "H"): her phone shows Ruko's red warning and buzzes, RukoBot holds up
 * its palms and says "Ruko"; then the screen turns safe, RukoBot waves and she smiles. A 5-second CSS loop
 * that stops for people who ask for reduced motion.
 *
 * Generated from docs/design/rukobot.html (the approved preview); the app draws the same scene in
 * android/.../ui/WelcomeScene.kt. Change all three together.
 */
const SCENE = `<style>.g-upR { transform-origin: 44px 27px; transform-box: view-box; animation: gUpR 5s ease-in-out infinite; }
.g-upL { transform-origin: 4px 27px; transform-box: view-box; animation: gUpL 5s ease-in-out infinite; }
@keyframes gUpR { 0%, 40%, 96%, 100% { transform: rotate(0); } 48%, 90% { transform: rotate(-10deg); } }
@keyframes gUpL { 0%, 40%, 96%, 100% { transform: rotate(0); } 48%, 90% { transform: rotate(-30deg); } }
.g-foreR { transform-origin: 54px 27px; transform-box: view-box; animation: gForeR 5s ease-in-out infinite; }
.g-foreL { transform-origin: -6px 27px; transform-box: view-box; animation: gForeL 5s ease-in-out infinite; }
@keyframes gForeR { 0%, 48%, 90%, 100% { transform: rotate(0); } 54%, 66%, 78% { transform: rotate(30deg); } 60%, 72%, 84% { transform: rotate(0deg); } }
@keyframes gForeL { 0%, 40%, 96%, 100% { transform: rotate(0); } 48%, 90% { transform: rotate(200deg); } }
.g-palm { transform-box: fill-box; transform-origin: 50% 100%; animation: gPush 5s ease-in-out infinite; }
@keyframes gPush { 0%, 6%, 16%, 22%, 32%, 100% { transform: scale(1); } 11%, 27% { transform: scale(1.18); } }
.g-palmL { animation: gPush 5s ease-in-out infinite, gHide 5s ease-in-out infinite; }
@keyframes gHide { 0%, 40%, 96%, 100% { opacity: 1; } 45%, 92% { opacity: 0; } }
.g-legR { transform-origin: 32px 57px; transform-box: view-box; animation: gLegR 5s ease-in-out infinite; }
@keyframes gLegR { 0%, 48%, 56%, 64%, 72%, 80%, 88%, 100% { transform: rotate(0); } 52%, 60%, 68%, 76%, 84% { transform: rotate(-10deg); } }
.g-body { animation: gHop 5s ease-in-out infinite; }
@keyframes gHop { 0%, 42%, 50%, 100% { transform: translateY(0); } 46% { transform: translateY(-3px); } }
.g-bar { transform-box: fill-box; transform-origin: 50% 60%; animation: gSquint 5s ease-in-out infinite; }
@keyframes gSquint { 0%, 42%, 92%, 100% { transform: scaleY(1); opacity: 1; } 48%, 88% { transform: scaleY(.15); opacity: 0; } }
.g-eye { opacity: 0; animation: gSmile 5s ease-in-out infinite; }
@keyframes gSmile { 0%, 43%, 90%, 100% { opacity: 0; } 49%, 87% { opacity: 1; } }
.h-say { font-family: var(--font-display), Archivo, sans-serif; font-weight: 800; fill: #0A4D49; }
.h-say-stop { font-size: 30px; letter-spacing: -.02em; animation: hStop 5s ease-in-out infinite; }
.h-say-safe { font-size: 24px; letter-spacing: -.02em; opacity: 0; animation: hSafeText 5s ease-in-out infinite; }
@keyframes hStop { 0%, 40%, 96%, 100% { opacity: 1; } 44%, 92% { opacity: 0; } }
@keyframes hSafeText { 0%, 44%, 92%, 100% { opacity: 0; } 49%, 88% { opacity: 1; } }
.h-bubble { transform-origin: 160px 136px; transform-box: view-box; animation: hPop 5s ease-in-out infinite; }
@keyframes hPop { 0%, 6%, 44%, 52%, 100% { transform: scale(1); } 3%, 48% { transform: scale(1.06); } }
.h-danger, .h-worry { animation: hStop 5s ease-in-out infinite; }
.h-safe, .h-happy { opacity: 0; animation: hSafe 5s ease-in-out infinite; }
@keyframes hSafe { 0%, 42%, 92%, 100% { opacity: 0; } 47%, 88% { opacity: 1; } }
.h-buzz { animation: hBuzz 5s linear infinite; }
@keyframes hBuzz { 0%, 4%, 12%, 20%, 28%, 36% { opacity: 1; } 8%, 16%, 24%, 32%, 40%, 100% { opacity: 0; } }
.h-phone { animation: hShake 5s linear infinite; }
@keyframes hShake {
0%, 2%, 6%, 10%, 14%, 18%, 22%, 26%, 30%, 34%, 38% { transform: translateX(0); }
1%, 5%, 9%, 13%, 17%, 21%, 25%, 29%, 33%, 37% { transform: translateX(-1.6px); }
3%, 7%, 11%, 15%, 19%, 23%, 27%, 31%, 35%, 39% { transform: translateX(1.6px); }
40%, 100% { transform: translateX(0); }
}
.h-head { transform-origin: 470px 214px; transform-box: view-box; animation: hTilt 5s ease-in-out infinite; }
@keyframes hTilt { 0%, 40%, 94%, 100% { transform: rotate(0); } 6%, 34% { transform: rotate(2deg) translateY(-1px); } 50%, 86% { transform: rotate(-5deg); } }
@media (prefers-reduced-motion: reduce) { .g-upR, .g-upL, .g-foreR, .g-foreL, .g-palm, .g-legR, .g-body, .g-bar, .g-eye, .h-say-stop, .h-bubble, .h-danger, .h-worry, .h-buzz, .h-phone, .h-head { animation: none; } .h-say-safe, .h-safe, .h-happy { opacity: 0; } }</style><svg class="rs-scene" viewBox="20 50 600 330" role="img" aria-label="RukoBot tells a grandmother to stop when a scam warning appears on her phone, then both smile when she is safe">
        <circle cx="468" cy="228" r="150" fill="#DDF2EA"/>
        <line x1="24" y1="361" x2="616" y2="361" stroke="#D6DEDB" stroke-width="3" stroke-linecap="round"/>
        <ellipse cx="160" cy="362" rx="74" ry="7" fill="#D6DEDB"/>
        <ellipse cx="470" cy="362" rx="132" ry="8" fill="#D6DEDB"/>
        <rect x="375" y="148" width="190" height="172" rx="36" fill="#E6DCCB"/>
        <rect x="372" y="335" width="12" height="26" rx="4" fill="#B9A888"/>
        <rect x="556" y="335" width="12" height="26" rx="4" fill="#B9A888"/>
        <rect x="358" y="284" width="224" height="54" rx="20" fill="#D3C4AA"/>
        <rect x="553" y="242" width="42" height="104" rx="18" fill="#DCCFB8"/>
        <g class="h-gma">
          <rect x="438" y="318" width="27" height="38" rx="9" fill="#B5533C"/>
          <rect x="475" y="318" width="27" height="38" rx="9" fill="#B5533C"/>
          <ellipse cx="450" cy="358" rx="17" ry="6" fill="#5B3F2E"/>
          <ellipse cx="490" cy="358" rx="17" ry="6" fill="#5B3F2E"/>
          <rect x="418" y="288" width="104" height="42" rx="19" fill="#B5533C"/>
          <path d="M416 302 Q412 236 440 222 Q470 210 500 222 Q528 236 524 302 Z" fill="#B5533C"/>
          <path d="M434 226 L450 219 L524 290 L524 304 L512 304 Z" fill="#E3A33B"/>
          <path d="M506 232 Q526 270 502 292" fill="none" stroke="#B5533C" stroke-width="21" stroke-linecap="round"/>
          <circle cx="499" cy="294" r="10" fill="#B87A55"/>
          <rect x="460" y="194" width="20" height="28" rx="7" fill="#9E6444"/>
          <g class="h-head">
            <circle cx="470" cy="122" r="17" fill="#D5D9DD"/>
            <circle cx="432" cy="176" r="7" fill="#9E6444"/>
            <circle cx="508" cy="176" r="7" fill="#9E6444"/>
            <circle cx="470" cy="172" r="38" fill="#B87A55"/>
            <path d="M431 180 Q426 130 470 128 Q514 130 509 180 Q505 152 470 150 Q437 152 431 180 Z" fill="#D5D9DD"/>
            <path d="M470 130 L470 149" stroke="#AEB4BB" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="470" cy="160" r="3" fill="#8C2F39"/>
            <g class="h-worry">
              <path d="M445 161 L461 156" stroke="#14191E" stroke-width="3" stroke-linecap="round"/>
              <path d="M479 156 L495 161" stroke="#14191E" stroke-width="3" stroke-linecap="round"/>
              <circle cx="455" cy="177" r="3.4" fill="#14191E"/>
              <circle cx="485" cy="177" r="3.4" fill="#14191E"/>
              <ellipse cx="470" cy="198" rx="5" ry="6" fill="#5B2A22"/>
            </g>
            <g class="h-happy">
              <path d="M445 157 Q453 153 461 156" fill="none" stroke="#14191E" stroke-width="3" stroke-linecap="round"/>
              <path d="M479 156 Q487 153 495 157" fill="none" stroke="#14191E" stroke-width="3" stroke-linecap="round"/>
              <path d="M449 179 Q455 172 461 179" fill="none" stroke="#14191E" stroke-width="3" stroke-linecap="round"/>
              <path d="M479 179 Q485 172 491 179" fill="none" stroke="#14191E" stroke-width="3" stroke-linecap="round"/>
              <path d="M456 192 Q470 210 484 192 Z" fill="#5B2A22" stroke="#5B2A22" stroke-width="2" stroke-linejoin="round"/>
              <circle cx="445" cy="192" r="7" fill="#E07A5F" opacity=".35"/>
              <circle cx="495" cy="192" r="7" fill="#E07A5F" opacity=".35"/>
            </g>
            <circle cx="455" cy="177" r="11.5" fill="#fff" fill-opacity=".18" stroke="#14191E" stroke-width="2.6"/>
            <circle cx="485" cy="177" r="11.5" fill="#fff" fill-opacity=".18" stroke="#14191E" stroke-width="2.6"/>
            <path d="M466.5 176 Q470 172.5 473.5 176" fill="none" stroke="#14191E" stroke-width="2.6" stroke-linecap="round"/>
          </g>
          <path d="M440 232 Q414 266 402 250" fill="none" stroke="#B5533C" stroke-width="21" stroke-linecap="round"/>
          <g class="h-phone">
            <rect x="364" y="178" width="48" height="82" rx="9" fill="#14191E"/>
            <g class="h-danger">
              <rect x="368" y="184" width="40" height="70" rx="5" fill="#B3261E"/>
              <g transform="translate(377 196) scale(.5)">
                <path d="M14.89,2 L33.11,2 L46,14.89 L46,33.11 L33.11,46 L14.89,46 L2,33.11 L2,14.89 Z" fill="#fff" stroke="#fff" stroke-width="4" stroke-linejoin="round"/>
                <rect x="15" y="15" width="6" height="18" rx="3" fill="#B3261E"/>
                <rect x="27" y="15" width="6" height="18" rx="3" fill="#B3261E"/>
              </g>
              <rect x="376" y="230" width="24" height="3.5" rx="1.75" fill="#fff"/>
              <rect x="379" y="238" width="18" height="3.5" rx="1.75" fill="#fff" opacity=".75"/>
            </g>
            <g class="h-safe">
              <rect x="368" y="184" width="40" height="70" rx="5" fill="#DDF2EA"/>
              <circle cx="388" cy="212" r="12" fill="#0A4D49"/>
              <path d="M382 212 L386.5 216.5 L394 208" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
              <rect x="376" y="232" width="24" height="3.5" rx="1.75" fill="#0A4D49" opacity=".55"/>
              <rect x="379" y="240" width="18" height="3.5" rx="1.75" fill="#0A4D49" opacity=".35"/>
            </g>
            <circle cx="406" cy="252" r="11" fill="#B87A55"/>
          </g>
          <g class="h-buzz" fill="none" stroke="#14191E" stroke-width="3" stroke-linecap="round">
            <path d="M354 204 Q349 219 354 234"/>
            <path d="M345 198 Q338 219 345 240"/>
            <path d="M374 168 Q388 162 402 168"/>
          </g>
        </g>
        <svg x="40" y="144" width="240" height="234" viewBox="-16 -12 80 78" overflow="visible">
          <g class="g-body">
            <g class="g-legL"><path d="M18 45 L16 57 L10 57" fill="none" stroke="#0A4D49" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></g>
            <g class="g-legR"><path d="M30 45 L32 57 L38 57" fill="none" stroke="#0A4D49" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></g>
            <g class="g-upL">
              <path d="M4 27 L-6 27" fill="none" stroke="#0A4D49" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
              <g class="g-foreL">
                <path d="M-6 27 L-6 15" fill="none" stroke="#0A4D49" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                <rect class="g-palm g-palmL" x="-10.5" y="3" width="9" height="12" rx="4" fill="#0A4D49"/>
              </g>
            </g>
            <g class="g-upR">
              <path d="M44 27 L54 27" fill="none" stroke="#0A4D49" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
              <g class="g-foreR">
                <path d="M54 27 L54 15" fill="none" stroke="#0A4D49" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                <rect class="g-palm" x="49.5" y="3" width="9" height="12" rx="4" fill="#0A4D49"/>
              </g>
            </g>
            <path d="M14.89,2 L33.11,2 L46,14.89 L46,33.11 L33.11,46 L14.89,46 L2,33.11 L2,14.89 Z" fill="#0A4D49" stroke="#0A4D49" stroke-width="4" stroke-linejoin="round"/>
            <rect class="g-bar" x="15" y="15" width="6" height="18" rx="3" fill="#fff"/>
            <rect class="g-bar" x="27" y="15" width="6" height="18" rx="3" fill="#fff"/>
            <path class="g-eye" d="M14.5 26 Q18 19 21.5 26" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
            <path class="g-eye" d="M26.5 25 Q30 18 33.5 25" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
          </g>
        </svg>
        <g class="h-bubble">
          <rect x="100" y="62" width="132" height="56" rx="18" fill="#fff" stroke="#14191E" stroke-width="2.5"/>
          <path d="M150 116.5 L158 136 L172 116.5" fill="#fff" stroke="#14191E" stroke-width="2.5" stroke-linejoin="round"/>
          <rect x="151" y="112" width="20" height="5" fill="#fff"/>
          <text class="h-say h-say-stop" x="166" y="99" text-anchor="middle">Ruko</text>
          <text class="h-say h-say-safe" x="166" y="98" text-anchor="middle">All safe</text>
        </g>
      </svg>`;

/** [viewBox] crops the 640×400 drawing; the default matches the app's Welcome screen. */
export function RukoScene({ className, viewBox }: { className?: string; viewBox?: string }) {
  const html = viewBox ? SCENE.replace('viewBox="20 50 600 330"', `viewBox="${viewBox}"`) : SCENE;
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
