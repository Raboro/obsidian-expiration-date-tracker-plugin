import { Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, ExpirationDateTrackerSettings, ExpirationDateTrackerSettingsTab } from './settings/settings';


export default class ExpirationDateTrackerPlugin extends Plugin {
    settings: ExpirationDateTrackerSettings;

    
    async onload() {
        await this.loadSettings();
        this.addSettingTab(new ExpirationDateTrackerSettingsTab(this.app, this));
    }

    onunload() {

    }

    async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}