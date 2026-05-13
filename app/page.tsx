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
      <iframe
        src="https://grafana.bedrocklabs.online/d-solo/efi7e4fixt9tsb/esp32-001?orgId=1&from=1775487532836&to=1776085709470&timezone=browser&theme=light&panelId=1&__feature.dashboardSceneSolo"
        width={450}
        height={200}
        title="ESP32-001 Grafana panel"
        style={{ border: "none", maxWidth: "100%" }}
      />
    </main>
  );
}
