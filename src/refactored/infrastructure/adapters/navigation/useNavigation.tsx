// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import NextLink from 'next/link';
import { useRouter as useNextRouter } from 'next/router';
import {
    Link as ReactLink,
    useNavigate as useReactNavigate,
    useParams as useReactParams,
} from 'react-router-dom';

// Flag to check if we're in a Next.js environment
const isNextEnv = typeof process.env.NEXT_PUBLIC_IS_NEXTJS !== 'undefined';

export const useNavigation = () => {
    // React Router logic
    const reactNavigate = useReactNavigate();
    const reactParams = useReactParams();

    // Next.js Router logic
    const nextRouter = useNextRouter();

    return {
        // Unified navigation function
        navigate: (path: string) => (isNextEnv ? nextRouter.push(path) : reactNavigate(path)),

        // Unified parameter retrieval
        getParam: (paramName: string) =>
            isNextEnv
                ? (nextRouter.query[paramName] as string) || null
                : reactParams[paramName] || null,

        // Link component based on environment
        Link: isNextEnv ? NextLink : ReactLink,
    };
};
