import { App, Notice, PluginSettingTab, Setting } from 'obsidian';
import ExpirationDateTrackerPlugin from 'src/main';
import ExpirationCategoriesSettings from './expirationCategoriesSettings';

export interface ExpirationDateTrackerSettings {
    dateFormatting: string;
    expirationDateNodeLocation: string;
    expiredCategoryDays: number;
    criticalCategoryDays: number;
    veryHighCategoryDays: number
    highCategoryDays: number;
    mediumCategoryDays: number;
    lowCategoryDays: number;
}

export const DEFAULT_SETTINGS: ExpirationDateTrackerSettings = {
    dateFormatting: 'DD/MM/YYYY',
    expirationDateNodeLocation: 'expirationDateNode.md',
    expiredCategoryDays: 0,
    criticalCategoryDays: 1,
    veryHighCategoryDays: 2,
    highCategoryDays: 3,
    mediumCategoryDays: 5,
    lowCategoryDays: 10
}; 

export class ExpirationDateTrackerSettingsTab extends PluginSettingTab {
    private plugin: ExpirationDateTrackerPlugin;

	constructor(app: App, plugin: ExpirationDateTrackerPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}
    
    display(): void {
        this.containerEl.empty();
        this.dateFormattingSettings();
        this.expirationDateNodeLocationSettings();
        this.containerEl.createEl('h3', {text: 'Expiration categories'});
        const expirationCategoriesSettings = new ExpirationCategoriesSettings(this.plugin, this.containerEl);
        expirationCategoriesSettings.expirationSettings();
    }

    dateFormattingSettings(): Setting {
        return new Setting(this.containerEl)
        .setName('Date formatting')
        .setDesc('Format your dates will be displayed and collected')
        .addText(text => text
            .setPlaceholder('Enter your format')
            .setValue(this.plugin.settings.dateFormatting)
            .onChange(async value => await this.dateFormattingSettingsOnChange(value)));
    }

    dateFormattingSettingsOnChange = async (value: string) => {
        let noticeMessage = 'Wrong date formatting!!';
        if (this.isFormattingValid(value)) {
            this.plugin.settings.dateFormatting = value;
            await this.plugin.saveSettings();
            noticeMessage = 'Valid date formatting';
        } 
        new Notice(noticeMessage);
    };

	isFormattingValid(format: string): boolean {
		const containsDoubleD: boolean = this.formatContains('DD', format);
		const containsDoubleM: boolean = this.formatContains('MM', format);
		const containsFourY: boolean = this.formatContains('YYYY', format);
		return containsDoubleD && containsDoubleM && containsFourY && !this.containsInvalidChars(format);
	}

	formatContains(subStr: string, format: string): boolean {
		return format.contains(subStr) || format.contains(subStr.toLowerCase());
	}

	containsInvalidChars(format: string): boolean {
		const invalidChars: string[] = ['A', 'B', 'C', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'N', 
										'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Z', '|'];
		return invalidChars.some(invalidChar => this.formatContains(invalidChar, format));
	}

    expirationDateNodeLocationSettings(): Setting {
		return new Setting(this.containerEl)
        .setName('Expiration Date Node Location')
        .setDesc('Location of your Node containing the expiration date data with .md as postfix')
        .addTextArea(text => text
            .setPlaceholder('Enter the node location')
            .setValue(this.plugin.settings.expirationDateNodeLocation)
            .onChange(async value => {
				this.plugin.settings.expirationDateNodeLocation = value;
				await this.plugin.saveSettings();
			}));
	}
    
}