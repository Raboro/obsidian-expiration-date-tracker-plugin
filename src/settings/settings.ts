import { App, Notice, PluginSettingTab, Setting, SliderComponent } from 'obsidian';
import ExpirationDateTrackerPlugin from 'src/main';

export interface ExpirationDateTrackerSettings {
    dateFormatting: string;
    expirationDateNodeLocation: string;
}

export const DEFAULT_SETTINGS: ExpirationDateTrackerSettings = {
    dateFormatting: 'DD/MM/YYYY',
    expirationDateNodeLocation: 'expirationDateNode.md'
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
        const names: Array<string> = ['Expired', 'Critical', 'Very High', 'High', 'Medium', 'Low'];
        const descriptions: Array<string> = ['expired', 'soooo close of being expired', 'so close of being expired',
                                             'close of being expired', 'pretty new', 'completely new'];
        const values: Array<string> = ['', '', '', '', '', ''];

        for (let i = 0; i < names.length; i++) {
            this.expirationSetSetting(
                names[i],
                'Expiration category: ' + names[i] + ' when your item is ' + descriptions[i],
                values[i]
            );
        }
    }

    expirationSetSetting(name: string, desc: string, value: string): Setting {
        return new Setting(this.containerEl)
        .setName(name)
        .setDesc(desc)
        .addText(text => text
            .setPlaceholder('Enter category in days')
            .setValue(value)
            .onChange(async value => {
                await this.plugin.saveSettings();
            }));
    }
    
}