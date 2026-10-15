// Rendered as out/404.html. It sits outside the [locale] layout, so it carries its own document and styles.
export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          background: "#09090B",
          color: "#F2F2F5",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <main>
          <p style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 12, letterSpacing: "0.1em", color: "#A1A1AF", margin: 0 }}>404</p>
          <h1 style={{ fontSize: "clamp(40px, 8vw, 72px)", letterSpacing: "-0.05em", margin: "12px 0" }}>Page not found</h1>
          <p style={{ color: "#A1A1AF", margin: "0 0 28px" }}>This page does not exist or has moved.</p>
          <nav style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              ["/en/", "English"],
              ["/pt/", "Português"],
              ["/it/", "Italiano"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                style={{ color: "#F2F2F5", border: "1px solid #34343F", borderRadius: 999, padding: "10px 18px", textDecoration: "none" }}
              >
                {label}
              </a>
            ))}
          </nav>
        </main>
      </body>
    </html>
  );
}
