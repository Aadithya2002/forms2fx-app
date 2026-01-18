import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import UploadPage from './pages/UploadPage';
import FormOverview from './pages/FormOverview';
import BlockDetail from './pages/BlockDetail';
import TriggerInspector from './pages/TriggerInspector';
import ApexMapping from './pages/ApexMapping';
import UILayoutPage from './pages/UILayoutPage';
import PageBlueprintView from './pages/PageBlueprintView';
import PageDesignerPreview from './pages/PageDesignerPreview';
import ProgramUnitsPage from './pages/ProgramUnitsPage';
import BusinessLogicMapPage from './pages/BusinessLogicMapPage';
import MigrationReadinessPage from './pages/MigrationReadinessPage';
import ApiKeyModal from './components/ApiKeyModal';

function App() {
    return (
        <BrowserRouter>
            <ApiKeyModal />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="upload" element={<UploadPage />} />
                    <Route path="analysis/:fileId" element={<FormOverview />} />
                    <Route path="analysis/:fileId/blocks/:blockName" element={<BlockDetail />} />
                    <Route path="analysis/:fileId/triggers" element={<TriggerInspector />} />
                    <Route path="analysis/:fileId/layout" element={<UILayoutPage />} />
                    <Route path="analysis/:fileId/blueprint" element={<PageBlueprintView />} />
                    <Route path="analysis/:fileId/designer" element={<PageDesignerPreview />} />
                    <Route path="analysis/:fileId/mapping" element={<ApexMapping />} />
                    <Route path="analysis/:fileId/program-units" element={<ProgramUnitsPage />} />
                    <Route path="analysis/:fileId/business-logic" element={<BusinessLogicMapPage />} />
                    <Route path="analysis/:fileId/migration-readiness" element={<MigrationReadinessPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
