import { ItemView } from 'obsidian';
import Item from 'src/item';
import * as React from 'react';
import { Root, createRoot } from 'react-dom/client';
import {v4 as uuidv4} from 'uuid';
import ExpirationCategory from 'src/expirationCategory';
import CategoryUi from 'src/ui/categoryUi';

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
        this.container = contentEl.createDiv({cls: 'itemsFlexboxContainer'});
    }
    
    displayItems(items: Item[], expirationCategories: ExpirationCategory[]): void {
        if (!this.root) {
            this.root = createRoot(this.container);
        }
        this.root.render(
            <React.StrictMode>
                <div className='categoriesFlexboxContainer'>
                    {expirationCategories.map(category => {
                        return (
                            <CategoryUi 
                                key={uuidv4()} 
                                name={category.getName()} 
                                items={this.collectItemsWithCategory(items, category)}
                            />
                        );
                    })}
                </div>
            </React.StrictMode>
        );
    }

    private collectItemsWithCategory(items: Item[], category: ExpirationCategory): Item[] {
        return items.filter(item => item.toDTO().expirationCategory === category);
    }

    onclose(): void {
        this.root.unmount();
    }

}