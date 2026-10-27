import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import MainLayout from "./MainLayout";
import ProfilePage from "./Pages/ProfilePage";
import ProjectPage from "./Pages/ProjectPage";
import ExplorePage from "./Pages/ExplorePage";
import OtpVerificationPage from "./Pages/OtpVerificationPage";
import SetUpForm from "./Pages/SetupForm";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "./Pages/NotFound";
import SettingsPage from "./Pages/SignOutPage";
import ErrorPage from "./Pages/ErrorPage";
import IndProjectDetails from "./Pages/IndProjectDetails";
import RoleAcceptPage from "./Pages/RoleAcceptPage";
import RoleSubmitPage from "./Pages/RoleSubmitPage";
import ProjectWorkspace from "./Pages/ProjectWorkSpace";
import Overview from "./components/ProjectWorkspace-Components/Overview";
import Team from "./components/ProjectWorkspace-Components/Team";
import OnGoingProject from "./Pages/OnGoingProjects";
import Workbench from "./Pages/Workbench";
import ProjectCompleted from "./components/ProjectWorkspace-Components/ProjectCompleted";
import TaskAssignment from "./components/ProjectWorkspace-Components/TaskAssignment";
import TaskManagement from "./components/ProjectWorkspace-Components/TaskManagement";
import LandingPage from "./Pages/LandingPage";
import RateTeam from "./components/ProjectWorkspace-Components/RateTeam";
import DesktopOnly from "./components/LandingPage-Component/Desktoponly";

function App() {
  return (
    <DesktopOnly>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/campuscollab" replace />} />

        {/* 1. Routes WITHOUT NavigationBar */}
        <Route path="/campuscollab" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/otpVerification" element={<OtpVerificationPage />} />
        <Route path="/setUpForm" element={<SetUpForm />} />

        {/* 2. Routes WITH NavigationBar */}

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/indprojectpage/:id" element={<IndProjectDetails />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/signout" element={<SettingsPage />} />
          <Route path="/errorpage" element={<ErrorPage />} />
          <Route path="/rolesubmit" element={<RoleSubmitPage />} />
          <Route path="/ongoingproject" element={<OnGoingProject />} />

          <Route path="/workbench/:projectId" element={<Workbench />} />

          <Route path="/projectworkspace/:projectId" element={<ProjectWorkspace />}>
            <Route index element={<Overview />} />
            <Route path="overview" element={<Overview />} />
            <Route path="team" element={<Team />} />
            <Route path="applications" element={<RoleAcceptPage />} />
            <Route path="taskassignment" element={<TaskAssignment />} />
            <Route path="taskmanagement" element={<TaskManagement />} />
            <Route path="completed" element={<ProjectCompleted />} />
            <Route path="rateteam" element={<RateTeam />} />
          </Route>
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<NotFoundPage />} replace />
      </Routes>
    </DesktopOnly>
  );
}

export default App;
