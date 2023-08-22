import { App, Notice, PluginSettingTab, Setting } from 'obsidian';
import ExpirationDateTrackerPlugin from 'src/main';

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
    plugin: ExpirationDateTrackerPlugin;

	constructor(app: App, plugin: ExpirationDateTrackerPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}
    
    display(): void {
        this.containerEl.empty();
        this.containerEl.createEl('h3', {text: "General Settings"})
        this.dateFormattingSettings();
        this.expirationDateNodeLocationSettings();
        this.containerEl.createEl('h3', {text: "Expiration Settings"})
        this.expirationSettings();
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
										'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Z'];
		for (const invalidChar in invalidChars) {
			if (this.formatContains(invalidChar, format)) {
				return true;
			}
		}
		return false;
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

    expirationSettings(): void {
        this.iterateOverExpirationSettings(
            ['Expired', 'Critical', 'Very High', 'High', 'Medium', 'Low'], 
            ['expired', 'soooo close of being expired', 'so close of being expired',
             'close of being expired', 'pretty new', 'completely new'],
            [
                this.plugin.settings.expiredCategoryDays,
                this.plugin.settings.criticalCategoryDays,
                this.plugin.settings.veryHighCategoryDays,
                this.plugin.settings.highCategoryDays,
                this.plugin.settings.mediumCategoryDays,
                this.plugin.settings.lowCategoryDays,
            ] 
        );
    }

    iterateOverExpirationSettings(names: Array<string>, descriptions: Array<string>, values: Array<number>): void {
        for (let i = 0; i < names.length; i++) {
            this.expirationSetSetting(
                names[i],
                'Expiration category: ' + names[i] + ' when your item is ' + descriptions[i],
                values[i]
            );
        }
    }

    expirationSetSetting(name: string, desc: string, value: number): Setting {
        return new Setting(this.containerEl)
        .setName(name)
        .setDesc(desc)
        .addText(text => text
            .setPlaceholder('Enter category in days')
            .setValue(value.toString())
            .onChange(async value => await this.expirationSetSettingOnChange(value, name)));
    }

    expirationSetSettingOnChange = async (value: string, name: string) => {
        const convertedValue = value == '0' ? 0 : parseInt(value);
        if (value == '0' || parseInt(value)) {
            switch (name) {
                case "Expired": 
                    this.plugin.settings.expiredCategoryDays = convertedValue;
                    break;
                case "Critical": 
                    this.plugin.settings.criticalCategoryDays = convertedValue;
                    break;
                case "Very High": 
                    this.plugin.settings.veryHighCategoryDays = convertedValue;
                    break;
                case "Medium": 
                    this.plugin.settings.mediumCategoryDays = convertedValue;
                    break;
                case "Low": 
                    this.plugin.settings.lowCategoryDays = convertedValue;
                    break;
            }
        } else if (value !== '') {
            new Notice('Invalid input - it must be a number (Int)')
        }
        await this.plugin.saveSettings();
    }
    
}