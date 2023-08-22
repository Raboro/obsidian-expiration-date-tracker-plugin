import { PluginSettingTab } from 'obsidian';

export interface ExpirationDateTrackerSettings {
    // insert settings
    example: string;
}

export const DEFAULT_SETTINGS: ExpirationDateTrackerSettings = {
    example: ''
}; 

export class ExpirationDateTrackerSettingsTab extends PluginSettingTab {
    
    display() {

    }
    
}