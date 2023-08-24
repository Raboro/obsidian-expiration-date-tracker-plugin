import { Notice, Plugin, TFile, WorkspaceLeaf } from 'obsidian';
import { DEFAULT_SETTINGS, ExpirationDateTrackerSettings, ExpirationDateTrackerSettingsTab } from './settings/settings';
import Item from './item';
import ExpirationDate from './expirationDate';
import ExpirationCategory from './expirationCategory';
import { EXPIRATION_DATE_TRACKER_VIEW_TYPE, ExpirationDateTrackerView } from './views/view';


export default class ExpirationDateTrackerPlugin extends Plugin {
    settings: ExpirationDateTrackerSettings;
    expirationCategories: ExpirationCategory[];
    items: Item[];
    
    async onload() {
        await this.loadSettings();
        this.registerView(EXPIRATION_DATE_TRACKER_VIEW_TYPE, (leaf) => new ExpirationDateTrackerView(leaf));
        this.updateExpirationCategories();
        this.addRibbonIcon('timer', 'Track expiration dates', this.trackExpirationDates);
        this.addCommand({
            id: 'track-expiration-dates',
            name: 'Track expiration dates',
            callback: this.trackExpirationDates
        });
        this.addSettingTab(new ExpirationDateTrackerSettingsTab(this.app, this));
    }

    updateExpirationCategories(): void {
        this.expirationCategories = [
            new ExpirationCategory('Expired', this.settings.expiredCategoryDays),
            new ExpirationCategory('Critical', this.settings.criticalCategoryDays),
            new ExpirationCategory('Very High', this.settings.veryHighCategoryDays),
            new ExpirationCategory('High', this.settings.highCategoryDays),
            new ExpirationCategory('Medium', this.settings.mediumCategoryDays),
            new ExpirationCategory('Low', this.settings.lowCategoryDays),
        ];
    }

    onunload() {

    }

    trackExpirationDates = async () => {
        const content = await this.fetchContent(); 
        if (content) {
            this.trackExpirationDatesOfContent(content);
            await this.openView();
        } else {
            new Notice('Nothing inside your node');	
        }
    };

    async fetchContent(): Promise<string | undefined> {
        const file = this.app.vault.getAbstractFileByPath(this.settings.expirationDateNodeLocation);
		if (file && file instanceof TFile) {
			return (await this.app.vault.read(file)).trim();
		}
		new Notice('Node could not be found at location: ' + this.settings.expirationDateNodeLocation);
		return undefined;
    }

    trackExpirationDatesOfContent(content: string): void {
        this.items = this.collectItems(this.splitContent(content));
    }

    splitContent(content: string): Array<string> {
        const splittedContent = content.split('|');
        splittedContent.remove(' \n');
        splittedContent.remove(' --- ');
        splittedContent.remove('');
        return splittedContent;
    }

    collectItems(content: Array<string>): Array<Item> {
        const items: Array<Item> = [];
        for (let i = 1; i < (content.length / 3); i++) {
            items.push(this.createItem(content, i));
        }
        return items;
    }

    createItem(content: Array<string>, i: number): Item {
        const name = content[0+3*i].trim();
        const date = content[1+3*i].trim();
        const numberOfElements = content[2+3*i] === undefined ? undefined : content[2+3*i].trim();
        return new Item(
            name, 
            new ExpirationDate(date, this.settings.dateFormatting), 
            numberOfElements, 
            this.expirationCategories
        );
    }

    async openView(): Promise<void> {
        const leaves: WorkspaceLeaf[] = this.app.workspace.getLeavesOfType(EXPIRATION_DATE_TRACKER_VIEW_TYPE);
        if (this.items) {
            (await this.getView(leaves)).displayItems(this.items);
        }
        this.app.workspace.revealLeaf(leaves[0]);
    }

    async getView(leaves: WorkspaceLeaf[]): Promise<ExpirationDateTrackerView> {
		if (leaves.length == 0) {
			leaves[0] = this.app.workspace.getRightLeaf(false);
			await leaves[0].setViewState({type: EXPIRATION_DATE_TRACKER_VIEW_TYPE});
		}
		return leaves[0].view as ExpirationDateTrackerView;
	}

    async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
        this.updateExpirationCategories();
	}
}