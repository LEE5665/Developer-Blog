import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

export const uploadKey = new PluginKey<DecorationSet>("imageUpload");
export const ImageUpload = Extension.create({
  name: "imageUpload",
  addProseMirrorPlugins() {
    return [new Plugin({ key: uploadKey, state: {
      init: () => DecorationSet.empty,
      apply(tr, previous) {
        let decorations = previous.map(tr.mapping, tr.doc);
        const action = tr.getMeta(uploadKey);
        if (action?.add) decorations = decorations.add(tr.doc, [Decoration.widget(action.pos, () => {
          const element = document.createElement("span"); element.className = "image-upload-progress"; element.textContent = "이미지 업로드 중…"; element.setAttribute("role", "status"); return element;
        }, { id: action.id })]);
        if (action?.remove) decorations = decorations.remove(decorations.find(undefined, undefined, spec => spec.id === action.id));
        return decorations;
      },
    }, props: { decorations: state => uploadKey.getState(state) } })];
  },
});
