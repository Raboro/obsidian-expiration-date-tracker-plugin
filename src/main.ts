import { Notice, Plugin, TFile } from 'obsidian';
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
       const content = await this.fetchContent(); 
    };

    async fetchContent(): Promise<string | undefined> {
        const file = this.app.vault.getAbstractFileByPath(this.settings.expirationDateNodeLocation);
		if (file && file instanceof TFile) {
			return (await this.app.vault.read(file)).trim();
		}
		new Notice('Node could not be found at location: ' + this.settings.expirationDateNodeLocation);
		return undefined;
    }

    async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}