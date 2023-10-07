import { ItemView } from 'obsidian';
import Item, { ItemDTO } from 'src/item';
import * as React from 'react';
import { Root, createRoot } from 'react-dom/client';
import {v4 as uuidv4} from 'uuid';
import ExpirationCategory from 'src/expirationCategory';
import ExpirationCategoryUi from 'src/ui/expirationCategoryUi';

export const EXPIRATION_DATE_TRACKER_VIEW_TYPE = 'Expiration-Date-Tracker';

export class ExpirationDateTrackerView extends ItemView {
    private container: HTMLDivElement;
    private root: Root;
    icon = 'timer';

    getViewType(): string {
        return EXPIRATION_DATE_TRACKER_VIEW_TYPE;
    }

    getDisplayText(): string {
        return EXPIRATION_DATE_TRACKER_VIEW_TYPE;
    }

    async onOpen(): Promise<void> {
        const { contentEl } = this;
        contentEl.createEl('h1', {text: 'Expiration Date Tracker'});  
        this.container = contentEl.createDiv({cls: 'expirationItemsFlexboxContainer'});
    }
    
    displayItems(items: Item[], expirationCategories: ExpirationCategory[]): void {
        if (!this.root) {
            this.root = createRoot(this.container);
        }
        const sortedItems = this.sortItemsViaExpirationCategory(items, expirationCategories);
        this.root.render(
            <React.StrictMode>
                <div className='expirationCategoriesFlexboxContainer'>
                    {expirationCategories.map((category, index) => {
                        return (
                            <ExpirationCategoryUi 
                                key={uuidv4()} 
                                name={category.getName()} 
                                items={sortedItems[index]}
                            />
                        );
                    })}
                </div>
            </React.StrictMode>
        );
    }

    private sortItemsViaExpirationCategory(items: Item[], categories: ExpirationCategory[]): ItemDTO[][] {
        const sortedItems: ItemDTO[][] = [[], [], [], [], [], []];
        items.map(item => item.toDTO()).forEach(item => {
            sortedItems[categories.findIndex(category => category === item.expirationCategory)].push(item);
        });
        return sortedItems;
    }

    async onClose(): Promise<void> {
        this.root.unmount();
    }

}