export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "1.75rem", fontWeight: 600, margin: 0 }}>
        Pool Monitor
      </h1>
      <p style={{ marginTop: "0.75rem", opacity: 0.8, textAlign: "center" }}>
        Next.js + Docker + GitHub Actions skeleton.
      </p>
    </main>
  );
}
