import { Document } from './Document.ts';
import { DocumentFactory } from './DocumentFactory.ts';

export class Main {
    static main() {
        const original = new Document(1, "Hisobot", "Oylik hisobot matni", "Ali Valiyev", ["hisobot", "oylik"]);
        const before = original.toString();
        const factory = new DocumentFactory(original);
        const d1 = factory.cloneDocument();
        const d2 = factory.cloneDocument();

        const edit = (d: Document, id: number, title: string, content: string, tag: string) => {
            d.setId(id); d.setTitle(title); d.setContent(content); d.getTags().push(tag);
        };
        edit(d1, 2, "Shartnoma", "Shartnoma matni", "yuridik");
        edit(d2, 3, "Taklifnoma", "Taklifnoma matni", "tadbir");
        d1.getTags()[0] = "muhim";

        console.log(`Original: ${original}\nNusxa 1 : ${d1}\nNusxa 2 : ${d2}\n`);

        const ha = (v: boolean) => (v ? "ha" : "yo'q");
        console.log("Original va nusxa bitta obyektmi? :", ha(original === d1));
        console.log("Ikki nusxa bitta obyektmi?        :", ha(d1 === d2));
        console.log("Teglar umumiymi (original/nusxa)? :", ha(original.getTags() === d1.getTags()));
        console.log("Teglar umumiymi (nusxa/nusxa)?    :", ha(d1.getTags() === d2.getTags()));
        console.log("Original o'zgarmay qoldimi?       :", ha(original.toString() === before));
    }
}

Main.main();
