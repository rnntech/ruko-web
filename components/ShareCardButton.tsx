"use client";

/**
 * "Send to family on WhatsApp" (D-049). On phones that can share files (Android Chrome), it shares the card's
 * picture (RukoBot, the scam, "Ruko catches this") with a short line of text, and the person picks WhatsApp.
 * Everywhere else it is the normal WhatsApp link: the text plus a link to the card's own page, whose preview in
 * WhatsApp is the same picture.
 */
export function ShareCardButton({
  className,
  label,
  href,
  imagePath,
  fileName,
  text,
}: {
  className?: string;
  label: string;
  href: string;
  imagePath: string;
  fileName: string;
  text: string;
}) {
  const share = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    const probe = new File([""], fileName, { type: "image/png" });
    if (!navigator.canShare?.({ files: [probe] })) return; // no file sharing: follow the WhatsApp link
    e.preventDefault();
    try {
      const blob = await (await fetch(imagePath)).blob();
      await navigator.share({ files: [new File([blob], fileName, { type: "image/png" })], text });
    } catch (err) {
      if ((err as Error).name !== "AbortError") window.location.href = href;
    }
  };
  return (
    <a className={className} href={href} rel="noopener noreferrer" onClick={share}>
      {label}
    </a>
  );
}
