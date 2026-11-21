import { RequestBuilder } from './RequestBuilder.ts';
import { RequestDirector } from './RequestDirector.ts';

async function main() {
    console.log("=== TASK 3: HTTP REQUEST BUILDER ===\n");

    const builder = new RequestBuilder();
    const director = new RequestDirector(builder);

    // 1. Builder orqali GET so'rov yasash va yuborish
    const getRequest = builder
        .setUrl("https://jsonplaceholder.typicode.com/posts/1")
        .setMethod("GET")
        .setHeader("Accept", "application/json")
        .build();

    console.log("1. GET so'rovi yuborilmoqda...");
    const getData = await getRequest.send();
    console.log("   Natija (title):", getData.title);

    // 2. Director orqali tezkor POST so'rov yasash va yuborish
    const postRequest = director.buildPost(
        "https://jsonplaceholder.typicode.com/posts",
        { title: "Salom Dunyo", userId: 1 }
    );

    console.log("\n2. POST so'rovi yuborilmoqda...");
    const postData = await postRequest.send();
    console.log("   Natija (yangi ID):", postData.id);

    console.log("\n✔ Muvaffaqiyatli yakunlandi!");
}

main().catch(console.error);
