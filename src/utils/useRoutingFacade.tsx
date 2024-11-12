// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { useRouter as useNextRouter } from 'next/router';
import { useNavigate, useParams } from 'react-router-dom';

interface UseRouting {
    navigate: (path: string) => void;
    getParam: (paramName: string) => string | null;
}

export function useRoutingFacade(): UseRouting {
    // Determine if we are in a Next.js environment
    const isNextEnv = typeof window === 'undefined';

    // React Router logic
    const reactNavigate = useNavigate();
    const reactParams = useParams();

    // Next.js Router logic
    const nextRouter = useNextRouter();

    return {
        navigate: (path: string) => (isNextEnv ? nextRouter.push(path) : reactNavigate(path)),
        getParam: (paramName: string) =>
            isNextEnv
                ? (nextRouter.query[paramName] as string) || null
                : reactParams[paramName] || null,
    };
}

/*
function NavigationComponent() {
    const { navigate, getParam } = useRoutingFacade();

    const handleNavigation = () => {
        navigate('/new-page');
    };

    const param = getParam('id');

    return (
        <div>
            <button onClick={handleNavigation}>Go to New Page</button>
            <p>Route Parameter: {param}</p>
        </div>
    );
}
 */
