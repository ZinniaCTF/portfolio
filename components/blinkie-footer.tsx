const blinkies = [
  "https://64.media.tumblr.com/d18cc11663adec9fd0c3a4836372735b/3fd9813737f4117d-05/s100x200/6cd1fe532b0afaf29c807b7efa62ea5a82418934.gifv",
  "https://64.media.tumblr.com/f6a47f8e55e9854b07c71414e8420b08/3fd9813737f4117d-5a/s100x200/ba42eada95f5da64157b02e32a42b7de21a9316f.pnj",
  "https://supplies.ju.mp/assets/images/gallery14/fdd7972c.png?v=6a50b904",
  "https://anlucas.neocities.org/Ebay.gif",
  "https://anlucas.neocities.org/built_with_microsoft_notepad.gif",
  "https://cyber.dabamos.de/88x31/hotmail2.gif",
]

export function BlinkieFooter() {
  return (
    <footer className="border-t border-border pt-8">
      <div className="mb-6 text-muted-foreground text-xs tracking-widest uppercase">
        {">"} ./buttons.sh
      </div>
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        {blinkies.map((src, index) => (
          <img
            key={index}
            src={src || "/placeholder.svg"}
            alt={`blinkie button ${index + 1}`}
            className="h-[31px] w-auto image-pixelated"
            style={{ imageRendering: "pixelated" }}
          />
        ))}
      </div>
      <div className="text-center text-muted-foreground text-xs">
        <span className="opacity-50">
          {"/*"} built with coca-cola and late nights {" */"}
        </span>
      </div>
    </footer>
  )
}
