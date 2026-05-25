// components/YouTubeEmbed.tsx

function getYouTubeId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
      /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    ];
  
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  }
  
  export default function YouTubeEmbed({
    url,
    title,
    className,
  }: {
    url: string;
    title?: string;
    className?: string;
  }) {
    const videoId = getYouTubeId(url);
  
    if (!videoId) {
      return (
        <div className={`bg-tag-bg rounded-lg flex items-center justify-center text-tag-text ${className}`}>
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm font-sans hover:underline">
            ▶ Watch video
          </a>
        </div>
      );
    }
  
    return (
      <div className={`relative w-full overflow-hidden rounded-lg ${className}`} style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title || "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full border-0"
        />
      </div>
    );
  }