import { AsyncLocalStorage } from 'async_hooks';

type AsyncRequestStore = {
    correlationId: string;
};

export const asyncLocalStorage = new AsyncLocalStorage<AsyncRequestStore>();

export const getCorrelationId = () => {
    const asyncStore = asyncLocalStorage.getStore();
    if (!asyncStore) {
        return 'unknown-error-while-creating-correlation-id';
    }
    return asyncStore?.correlationId;
};
