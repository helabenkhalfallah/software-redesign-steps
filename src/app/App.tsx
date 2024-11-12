import { Route, Routes } from 'react-router-dom';

import { RoleProvider } from '../commons/providers/RoleContext.tsx';
import ImageDetailsPage from '../features/image/pages/ImageDetailsPage.tsx';
import ImageListPage from '../features/image/pages/ImageListPage.tsx';
import { ConfigProvider } from '../infrastructure/providers/config/ConfigProvider.tsx';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';

function App() {
    return (
        <ConfigProvider apiBaseUrl={API_URL}>
            <RoleProvider>
                <Routes>
                    <Route path="/" element={<ImageListPage />} />
                    <Route path="/image/:imageId" element={<ImageDetailsPage />} />
                    <Route
                        path="*"
                        element={
                            <p>
                                Page not found. Go back to <a href="/public">home</a>.
                            </p>
                        }
                    />
                </Routes>
            </RoleProvider>
        </ConfigProvider>
    );
}

export default App;
