import type { TeamDirectoryData } from "./types";

interface AppProps {
  data: TeamDirectoryData | null;
}

export default function App({ data }: AppProps) {
  if (!data?.members || data.type !== "team-directory") {
    return <p>No data received.</p>;
  }

  return (
    <div style={{ padding: "16px", fontFamily: "system-ui, sans-serif" }}>
      <h2 style={{ marginTop: 0, marginBottom: "12px" }}>Team Directory</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px",
        }}
      >
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "2px solid #e5e7eb" }}>
            <th style={{ padding: "8px 12px" }}>Name</th>
            <th style={{ padding: "8px 12px" }}>Role</th>
            <th style={{ padding: "8px 12px" }}>Office</th>
          </tr>
        </thead>
        <tbody>
          {data.members.map((member, i) => (
            <tr
              key={member.name}
              style={{
                borderBottom: "1px solid #e5e7eb",
                background: i % 2 === 0 ? "transparent" : "#f9fafb",
              }}
            >
              <td style={{ padding: "8px 12px", fontWeight: 500 }}>
                {member.name}
              </td>
              <td style={{ padding: "8px 12px" }}>{member.role}</td>
              <td style={{ padding: "8px 12px" }}>{member.office}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
