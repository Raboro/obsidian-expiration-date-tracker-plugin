import { Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, ExpirationDateTrackerSettings, ExpirationDateTrackerSettingsTab } from './settings/settings';


export default class ExpirationDateTrackerPlugin extends Plugin {
    settings: ExpirationDateTrackerSettings;

    
    async onload() {
        await this.loadSettings();

        this.addRibbonIcon('timer', 'Track expiration dates', this.trackExpirationDates);

        this.addSettingTab(new ExpirationDateTrackerSettingsTab(this.app, this));
    }

    onunload() {

    }

    trackExpirationDates = async () => {
        
    };

    async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}