// app/studio/[[...tool]]/layout.tsx

export default function StudioLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div id="sanity-studio" style={{ height: "100vh" }}>
        {children}
      </div>
    );
  }