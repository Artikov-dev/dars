import { File } from './File.ts';
import { Folder } from './Folder.ts';

export class Main {
    static main() {
        const computer = new Folder("Computer");
        const documents = new Folder("Documents");
        const photos = new Folder("Photos");
        const university = new Folder("University");

        documents.add(new File("resume.pdf")).add(new File("homework.docx"));
        photos.add(new File("photo1.jpg")).add(new File("photo2.jpg"));
        computer.add(documents).add(photos).add(new File("music.mp3"));

        university.add(new File("Java.java")).add(new File("Python.py"));
        documents.add(university);

        const temp = new File("temp.txt");
        computer.add(temp);
        computer.remove(temp);

        computer.show();
    }
}

Main.main();
