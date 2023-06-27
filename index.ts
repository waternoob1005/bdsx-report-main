import { events } from "bdsx/event";
import { serverProperties } from "bdsx/serverproperties";
import { red } from "colors";

console.log(`신고 플러그인이 당신의 서버로 가고있어요...`)

if (
    serverProperties["allow-cheats"] == "false" ||
    !serverProperties["allow-cheats"]
) {
    throw (red("신고 플러그인은 커맨드 명령어가 핵심이에요. server.properties로 이동하셔서 치트를 허용해주세요."))
}

events.serverOpen.on(() => {
    import ("./report")
})