/**
 * Interface for entities with temporal metadata
 */
import type { Entity } from '../KnowledgeGraphManager.js';
/**
 * Represents an entity with temporal awareness capabilities
 * Extends the base Entity interface with time-based properties
 */
export interface TemporalEntity extends Entity {
    /**
     * Unique identifier for the entity
     */
    id?: string;
    /**
     * Timestamp when the entity was created (milliseconds since epoch)
     */
    createdAt: number;
    /**
     * Timestamp when the entity was last updated (milliseconds since epoch)
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
export declare namespace TemporalEntity {
    function isTemporalEntity(obj: any): boolean;
    function hasValidTimeRange(obj: any): boolean;
}
/**
 * TemporalEntityValidator class with validation methods
 */
export declare class TemporalEntityValidator {
    /**
     * Validates if an object conforms to the TemporalEntity interface
     */
    static isTemporalEntity(obj: any): boolean;
    /**
     * Checks if an entity has a valid temporal range
     */
    static hasValidTimeRange(obj: any): boolean;
}
