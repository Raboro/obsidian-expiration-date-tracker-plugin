import { ItemView } from "obsidian"
import Item from "src/item";

export const EXPIRATION_DATE_TRACKER_VIEW_TYPE = 'Expiration-Date-Tracker';

export class ExpirationDateTrackerView extends ItemView {
    private container: HTMLDivElement;
    icon = 'timer';

    getViewType(): string {
        return EXPIRATION_DATE_TRACKER_VIEW_TYPE;
    }

    getDisplayText(): string {
        return EXPIRATION_DATE_TRACKER_VIEW_TYPE;
    }

    async onOpen(): Promise<void> {
        const { contentEl } = this;
        contentEl.createEl('h1', {text: 'Expiration Date Tracker'})  
        this.container = contentEl.createDiv({cls: 'itemsFlexboxContainer'});  
    }

    displayItems(items: Item[]): void {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.lastChild as Node);
        } 
        // handle items
    }

}