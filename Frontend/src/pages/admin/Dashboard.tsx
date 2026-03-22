import { useEffect, useState } from "react";
import API from "../../utils/api";
import { Project } from "../../utils/project";

function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    API.get("/projects").then((res) => {
      setProjects(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      {projects.map((p) => (
        <div key={p.id}>
          <h2>{p.title}</h2>
          <button>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;