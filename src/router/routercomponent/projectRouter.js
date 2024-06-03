import ProjectMain from "../../components/project/main/ProjectMain";
import ProjectListApp from "../../components/project/projectlist/ProjectListApp";

const projectRouter = {
  path: "project/",
  children: [
    { index: true, element: <ProjectListApp /> },
    { path: "view", element: <ProjectMain /> },
  ],
};
export default projectRouter;
