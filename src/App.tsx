// App.tsx
import { Route, Routes } from 'react-router-dom';

import ImageDetailsPage from './ImageDetailsPage';
import ImageListPage from './ImageListPage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<ImageListPage />} />
            <Route path="/image/:imageId" element={<ImageDetailsPage />} />
            <Route
                path="*"
                element={
                    <p>
                        Page not found. Go back to <a href="/">home</a>.
                    </p>
                }
            />
        </Routes>
    );
}

export default App;
