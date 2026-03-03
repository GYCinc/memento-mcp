/**
 * Interface for relations with temporal metadata
 */
import { type Relation } from './relation.js';
/**
 * Represents a relationship with temporal awareness capabilities
 * Extends the base Relation interface with time-based properties
 */
export interface TemporalRelation extends Relation {
    /**
     * Unique identifier for the relation
     */
    id?: string;
    /**
     * Timestamp when the relation was created (milliseconds since epoch)
     */
    createdAt: number;
    /**
     * Timestamp when the relation was last updated (milliseconds since epoch)
     */
    updatedAt: number;
    /**
     * Optional start time for the validity period (milliseconds since epoch)
     */
    validFrom?: number;
    /**
     * Optional end time for the validity period (milliseconds since epoch)
     */
    validTo?: number;
    /**
     * Version number, incremented with each update
     */
    version: number;
    /**
     * Optional identifier of the system or user that made the change
     */
    changedBy?: string;
}
export declare namespace TemporalRelation {
    function isTemporalRelation(obj: unknown): boolean;
    function hasValidTimeRange(obj: unknown): boolean;
    function isCurrentlyValid(obj: unknown, now?: number): boolean;
}
/**
 * TemporalRelationValidator class with validation methods
 */
export declare class TemporalRelationValidator {
    /**
     * Validates if an object conforms to the TemporalRelation interface
     */
    static isTemporalRelation(obj: unknown): boolean;
    /**
     * Checks if a relation has a valid temporal range
     */
    static hasValidTimeRange(obj: unknown): boolean;
    /**
     * Checks if a relation is currently valid based on its temporal range
     */
    static isCurrentlyValid(obj: unknown, now?: number): boolean;
}
