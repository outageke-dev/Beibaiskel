type AdSlotProps = {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
};

/** Placeholder for Google AdSense. Set NEXT_PUBLIC_ADSENSE_CLIENT_ID to enable. */
export default function AdSlot({ slot, format = "auto", className = "" }: AdSlotProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  if (!clientId) {
    return (
      <div className={`ad-placeholder ${className}`} aria-hidden="true">
        Ad slot · {slot}
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: "block" }}
      data-ad-client={clientId}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
