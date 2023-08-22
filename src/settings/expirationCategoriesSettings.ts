import { Notice, Setting } from "obsidian";
import ExpirationDateTrackerPlugin from "src/main";

export default class ExpirationCategoriesSettings {
    private plugin: ExpirationDateTrackerPlugin;
    private containerEl: HTMLElement

    constructor(plugin: ExpirationDateTrackerPlugin, containerEl: HTMLElement) {
        this.plugin = plugin;
        this.containerEl = containerEl;
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

    private iterateOverExpirationSettings(names: Array<string>, descriptions: Array<string>, values: Array<number>): void {
        for (let i = 0; i < names.length; i++) {
            this.expirationSetSetting(
                names[i],
                'Expiration category: ' + names[i] + ' when your item is ' + descriptions[i],
                values[i]
            );
        }
    }

    private expirationSetSetting(name: string, desc: string, value: number): Setting {
        return new Setting(this.containerEl)
        .setName(name)
        .setDesc(desc)
        .addText(text => text
            .setPlaceholder('Enter category in days')
            .setValue(value.toString())
            .onChange(async value => await this.expirationSetSettingOnChange(value, name)));
    }

    private expirationSetSettingOnChange = async (value: string, name: string) => {
        const convertedValue = value == '0' ? 0 : parseInt(value);
        if (value == '0' || parseInt(value)) {
            this.updateValue(name, convertedValue);
        } else if (value !== '') {
            new Notice('Invalid input - it must be a number (Int)')
        }
        await this.plugin.saveSettings();
    }

    private updateValue(name: string, convertedValue: number) {
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
    }
}