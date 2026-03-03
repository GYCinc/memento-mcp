// Add static methods to the TemporalEntity interface for JavaScript tests
// This allows tests to access validation methods directly from the interface
// eslint-disable-next-line @typescript-eslint/no-namespace
export var TemporalEntity;
(function (TemporalEntity) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function isTemporalEntity(obj) {
        return TemporalEntityValidator.isTemporalEntity(obj);
    }
    TemporalEntity.isTemporalEntity = isTemporalEntity;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function hasValidTimeRange(obj) {
        return TemporalEntityValidator.hasValidTimeRange(obj);
    }
    TemporalEntity.hasValidTimeRange = hasValidTimeRange;
})(TemporalEntity || (TemporalEntity = {}));
/**
 * TemporalEntityValidator class with validation methods
 */
export class TemporalEntityValidator {
    /**
     * Validates if an object conforms to the TemporalEntity interface
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static isTemporalEntity(obj) {
        // First ensure it's a valid Entity
        if (!obj ||
            typeof obj.name !== 'string' ||
            typeof obj.entityType !== 'string' ||
            !Array.isArray(obj.observations)) {
            return false;
        }
        // Then check temporal properties
        if (typeof obj.createdAt !== 'number' ||
            typeof obj.updatedAt !== 'number' ||
            typeof obj.version !== 'number') {
            return false;
        }
        // Optional properties type checking
        if (obj.validFrom !== undefined && typeof obj.validFrom !== 'number') {
            return false;
        }
        if (obj.validTo !== undefined && typeof obj.validTo !== 'number') {
            return false;
        }
        if (obj.changedBy !== undefined && typeof obj.changedBy !== 'string') {
            return false;
        }
        return true;
    }
    /**
     * Checks if an entity has a valid temporal range
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static hasValidTimeRange(obj) {
        if (!this.isTemporalEntity(obj)) {
            return false;
        }
        // If both are defined, validFrom must be before validTo
        if (obj.validFrom !== undefined && obj.validTo !== undefined) {
            return obj.validFrom <= obj.validTo;
        }
        return true;
    }
}
//# sourceMappingURL=temporalEntity.js.map