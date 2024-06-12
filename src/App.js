import ComponentSetting from "./layout/content/ComponentSetting";
import ToolkitProvider from "./store/toolkit/store";

function App() {
  return (
    <ToolkitProvider>
      <ComponentSetting />
    </ToolkitProvider>
  );
}

export default App;
