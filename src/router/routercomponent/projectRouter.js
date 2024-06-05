import CreateProjectApp from "../../components/project/createproject/CreateProjectApp";
import ProjectMain from "../../components/project/main/ProjectMain";
import TeamMate from "../../components/project/main/teammate/TeamMate";
import ProjectListApp from "../../components/project/projectlist/ProjectListApp";

const projectRouter = {
  path: "project/",
  children: [
    { index: true, element: <ProjectListApp /> },
    { path: "view", element: <ProjectMain /> },
    { path: "create", element: <CreateProjectApp /> },
    { path: "manage-teammate", element: <TeamMate /> },
  ],
};
export default projectRouter;
