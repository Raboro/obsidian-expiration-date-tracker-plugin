import { ItemView } from 'obsidian';
import Item from 'src/item';
import * as React from 'react';
import ItemUi from 'src/ui/itemUi';
import { Root, createRoot } from 'react-dom/client';
import {v4 as uuidv4} from 'uuid';

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
    
    displayItems(items: Item[]): void {
        if (!this.root) {
            this.root = createRoot(this.container);
        }
        console.log(items);
        this.root.render(
            <React.StrictMode>
                <>
                {items.map(item => {
                    const { name, expirationDate, numberOfElements, expirationCategory } = item.toDTO();
                    return (
                        <ItemUi
                            key={uuidv4()}
                            name={name}
                            expirationDate={expirationDate}
                            numberOfElements={numberOfElements}
                            expirationCategory={expirationCategory}
                        />
                    );
                })}
                </>
            </React.StrictMode>
        );
    }

    onclose(): void {
        this.root.unmount();
    }

}