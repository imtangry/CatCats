import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {useMemo} from 'react';
import {TonConnectUIProvider} from '@tonconnect/ui-react';

import {TonClientProvider} from './context/ton-client-context.tsx';
import {AppStateProvider} from './context/app-context.tsx';
import {ErrorBoundary} from "./components/ErrorBoundary.tsx";

import WebApp from '@twa-dev/sdk'

WebApp.ready();

function ErrorBoundaryError({error}: { error: unknown }) {
    return (
        <div>
            <p>An unhandled error occurred:</p>
            <blockquote>
                <code>
                    {error instanceof Error
                        ? error.message
                        : typeof error === 'string'
                            ? error
                            : JSON.stringify(error)}
                </code>
            </blockquote>
        </div>
    );
}

function Inner() {
    const manifestUrl = useMemo(() => {
        // return new URL('tonconnect-manifest.json', window.location.href).toString();
        return new URL('tonconnect-manifest.json', 'https://imtangry.github.io/CatCats/').toString();
    }, []);

    // Enable debug mode to see all the methods sent and events received.


    return (
        <TonConnectUIProvider
            manifestUrl={manifestUrl}
            actionsConfiguration={{twaReturnUrl: 'https://t.me/tma_jetton_processing_bot/tma_jetton_processing'}}
        >
            <TonClientProvider>
                <AppStateProvider>
                    <App/>
                </AppStateProvider>
            </TonClientProvider>
        </TonConnectUIProvider>
    );
}

function Root() {
    return (
        <ErrorBoundary fallback={ErrorBoundaryError}>
            <Inner/>
        </ErrorBoundary>
    );
}

createRoot(document.getElementById('root')!).render(
    <Root/>
)
