import { Button, assetManager, AssetManager, director } from "cc";
import { GameUILayers } from "../../scripts/GameUILayers";
import { Layout_DemoList } from "./Layout_DemoList";
import { ModuleDef } from "../../scripts/ModuleDef";
import { SceneDef, SceneUtil } from "../../scripts/SceneDef";

const DemoList = [
    { bundle: ModuleDef.DEMO_TANK, entryScene: 'tank_game' },
    { bundle: ModuleDef.DEMO_ROOSTER, entryScene: 'rooster_jump' },
];

export class UI_DemoList extends tgx.UIController {
    constructor() {
        super('ui_demo_list/UI_DemoList', GameUILayers.POPUP, Layout_DemoList);
    }

    public getRes(): [] {
        return [];
    }

    protected onCreated(): void {
        let layout = this.layout as Layout_DemoList;
        layout.btnClose.node.active = false;
        this.onButtonEvent(layout.btnClose, () => {
            this.close();
        });

        for (let i = 0; i < layout.contentRoot.children.length; ++i) {
            let item = layout.contentRoot.children[i];
            let btn = item.getComponent(Button);
            this.onButtonEvent(btn, (currentTarget, info: { bundle: string, entryScene: string }) => {
                if (!info) {
                    return;
                }
                tgx.UIWaiting.show();
                SceneUtil.loadScene({name:info.entryScene,bundle:info.bundle});
            }, this, DemoList[i]);
        }
    }

    showCloseBtn() {
        let layout = this.layout as Layout_DemoList;
        layout.btnClose.node.active = true;
    }
}