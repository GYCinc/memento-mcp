// Add static methods to the Relation interface for JavaScript tests
// This allows tests to access validation methods directly from the interface
// eslint-disable-next-line @typescript-eslint/no-namespace
export var Relation;
(function (Relation) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function isRelation(obj) {
        return RelationValidator.isRelation(obj);
    }
    Relation.isRelation = isRelation;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function hasStrength(obj) {
        return RelationValidator.hasStrength(obj);
    }
    Relation.hasStrength = hasStrength;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function hasConfidence(obj) {
        return RelationValidator.hasConfidence(obj);
    }
    Relation.hasConfidence = hasConfidence;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function hasValidMetadata(obj) {
        return RelationValidator.hasValidMetadata(obj);
    }
    Relation.hasValidMetadata = hasValidMetadata;
})(Relation || (Relation = {}));
// Concrete class for JavaScript tests
export class RelationValidator {
    /**
     * Validates if an object conforms to the Relation interface
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static isRelation(obj) {
        return (obj &&
            typeof obj.from === 'string' &&
            typeof obj.to === 'string' &&
            typeof obj.relationType === 'string' &&
            (obj.strength === undefined || typeof obj.strength === 'number') &&
            (obj.confidence === undefined || typeof obj.confidence === 'number') &&
            (obj.metadata === undefined || typeof obj.metadata === 'object'));
    }
    /**
     * Checks if a relation has a strength value
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static hasStrength(obj) {
        return (this.isRelation(obj) &&
            typeof obj.strength === 'number' &&
            obj.strength >= 0 &&
            obj.strength <= 1);
    }
    /**
     * Checks if a relation has a confidence value
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static hasConfidence(obj) {
        return (this.isRelation(obj) &&
            typeof obj.confidence === 'number' &&
            obj.confidence >= 0 &&
            obj.confidence <= 1);
    }
    /**
     * Checks if a relation has valid metadata
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static hasValidMetadata(obj) {
        if (!this.isRelation(obj) || !obj.metadata) {
            return false;
        }
        const metadata = obj.metadata;
        // Required fields
        if (typeof metadata.createdAt !== 'number' || typeof metadata.updatedAt !== 'number') {
            return false;
        }
        // Optional fields
        if (metadata.lastAccessed !== undefined && typeof metadata.lastAccessed !== 'number') {
            return false;
        }
        if (metadata.inferredFrom !== undefined) {
            if (!Array.isArray(metadata.inferredFrom)) {
                return false;
            }
            // Verify all items in inferredFrom are strings
            for (const id of metadata.inferredFrom) {
                if (typeof id !== 'string') {
                    return false;
                }
            }
        }
        return true;
    }
}
//# sourceMappingURL=relation.js.map