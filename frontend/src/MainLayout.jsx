import { Outlet } from "react-router-dom";
import NavigationBar from "./Pages/NavigationBar";

export default function MainLayout() {
  return (
      <div
  className="h-screen overflow-hidden"
  style={{ backgroundColor: "#F5F1FA" }}
>
  <div
    style={{
      transform: "scale(0.95)",
      transformOrigin: "top left",
      width: "105.263%",
      height: "105.263%",
    }}
    className="flex"
  >
    <div className="sticky top-0 shrink-0 h-full">
      <NavigationBar />
    </div>

    <main className="flex-1 min-h-0 overflow-y-auto">
      <Outlet />
    </main>
  </div>
</div>
  );
}