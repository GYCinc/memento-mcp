// Add static methods to the StorageProvider interface for JavaScript tests
// This allows tests to access validation methods directly from the interface
// eslint-disable-next-line @typescript-eslint/no-namespace
export var StorageProvider;
(function (StorageProvider) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function isStorageProvider(obj) {
        return StorageProviderValidator.isStorageProvider(obj);
    }
    StorageProvider.isStorageProvider = isStorageProvider;
})(StorageProvider || (StorageProvider = {}));
/**
 * Validator class for StorageProvider interface
 * This exists to ensure there's a concrete export for JavaScript tests
 */
export class StorageProviderValidator {
    // No implementation - this is just to ensure the symbol exists in the compiled JS
    // JavaScript tests will use this as a type reference
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static isStorageProvider(obj) {
        const hasRequiredMethods = obj &&
            typeof obj.loadGraph === 'function' &&
            typeof obj.saveGraph === 'function' &&
            typeof obj.searchNodes === 'function' &&
            typeof obj.openNodes === 'function' &&
            typeof obj.createEntities === 'function' &&
            typeof obj.createRelations === 'function' &&
            typeof obj.addObservations === 'function' &&
            typeof obj.deleteEntities === 'function' &&
            typeof obj.deleteObservations === 'function' &&
            typeof obj.deleteRelations === 'function' &&
            typeof obj.getEntity === 'function';
        // Check that any optional methods, if present, are functions
        const optionalMethodsValid = (!obj.getRelation || typeof obj.getRelation === 'function') &&
            (!obj.updateRelation || typeof obj.updateRelation === 'function') &&
            (!obj.getEntityHistory || typeof obj.getEntityHistory === 'function') &&
            (!obj.getRelationHistory || typeof obj.getRelationHistory === 'function') &&
            (!obj.getGraphAtTime || typeof obj.getGraphAtTime === 'function') &&
            (!obj.getDecayedGraph || typeof obj.getDecayedGraph === 'function') &&
            (!obj.updateEntityEmbedding || typeof obj.updateEntityEmbedding === 'function') &&
            (!obj.findSimilarEntities || typeof obj.findSimilarEntities === 'function') &&
            (!obj.semanticSearch || typeof obj.semanticSearch === 'function');
        return hasRequiredMethods && optionalMethodsValid;
    }
}
//# sourceMappingURL=StorageProvider.js.map