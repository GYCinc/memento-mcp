/**
 * Interface for relations with temporal metadata
 */
import { RelationValidator } from './relation.js';
// Add static methods to the TemporalRelation interface for JavaScript tests
// This allows tests to access validation methods directly from the interface
// eslint-disable-next-line @typescript-eslint/no-namespace
export var TemporalRelation;
(function (TemporalRelation) {
    function isTemporalRelation(obj) {
        return TemporalRelationValidator.isTemporalRelation(obj);
    }
    TemporalRelation.isTemporalRelation = isTemporalRelation;
    function hasValidTimeRange(obj) {
        return TemporalRelationValidator.hasValidTimeRange(obj);
    }
    TemporalRelation.hasValidTimeRange = hasValidTimeRange;
    function isCurrentlyValid(obj, now = Date.now()) {
        return TemporalRelationValidator.isCurrentlyValid(obj, now);
    }
    TemporalRelation.isCurrentlyValid = isCurrentlyValid;
})(TemporalRelation || (TemporalRelation = {}));
/**
 * TemporalRelationValidator class with validation methods
 */
export class TemporalRelationValidator {
    /**
     * Validates if an object conforms to the TemporalRelation interface
     */
    static isTemporalRelation(obj) {
        // First ensure it's a valid Relation
        if (!RelationValidator.isRelation(obj)) {
            return false;
        }
        // Use type assertion after validation
        const temporalObj = obj;
        // Then check temporal properties
        if (typeof temporalObj.createdAt !== 'number' ||
            typeof temporalObj.updatedAt !== 'number' ||
            typeof temporalObj.version !== 'number') {
            return false;
        }
        // Optional properties type checking
        if (temporalObj.validFrom !== undefined && typeof temporalObj.validFrom !== 'number') {
            return false;
        }
        if (temporalObj.validTo !== undefined && typeof temporalObj.validTo !== 'number') {
            return false;
        }
        if (temporalObj.changedBy !== undefined && typeof temporalObj.changedBy !== 'string') {
            return false;
        }
        return true;
    }
    /**
     * Checks if a relation has a valid temporal range
     */
    static hasValidTimeRange(obj) {
        if (!this.isTemporalRelation(obj)) {
            return false;
        }
        // Use type assertion after validation
        const temporalObj = obj;
        // If both are defined, validFrom must be before validTo
        if (temporalObj.validFrom !== undefined && temporalObj.validTo !== undefined) {
            return temporalObj.validFrom <= temporalObj.validTo;
        }
        return true;
    }
    /**
     * Checks if a relation is currently valid based on its temporal range
     */
    static isCurrentlyValid(obj, now = Date.now()) {
        if (!this.isTemporalRelation(obj)) {
            return false;
        }
        // Use type assertion after validation
        const temporalObj = obj;
        // Check if current time is within validity period
        if (temporalObj.validFrom !== undefined && now < temporalObj.validFrom) {
            return false; // Before valid period
        }
        if (temporalObj.validTo !== undefined && now > temporalObj.validTo) {
            return false; // After valid period
        }
        return true;
    }
}
//# sourceMappingURL=temporalRelation.js.map