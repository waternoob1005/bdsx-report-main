import { ActorCommandSelector, CommandPermissionLevel } from "bdsx/bds/command"
import { PlayerPermission } from "bdsx/bds/player"
import { command } from "bdsx/command"
import { CANCEL } from "bdsx/common"
import { bedrockServer } from "bdsx/launcher"
import { brightWhite, red } from "colors"
import { lang } from "./lang"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// 신고 플러그인
// 제작자 - waternoob1005
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// 다음은 신고 플러그인 설정입니다
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let 최대_경고_설정 = 45 // (얼마나 많은 플레이어가 지목해야 추방할 지 설정합니다 | 단위 : % | 기본값 : 45% (모든 플레이어 중 45%가 신고한 플레이어가 추방됩니다))

function playerBanCommand(username : string){ // 신고 누적된 플레이어를 추방할 명령어입니다
    bedrockServer.executeCommand(`wac-ban "${username}" "신고 누적으로 인해 영원히 추방됬습니다"`)
}

let language = lang.한국어 // 플러그인이 사용할 언어입니다

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// 아래 코드를 편집할 때 서버에 일어나는 오류나 불상사를 **\\\\````절대로````////** 책임지지 ))))않습니다((((
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function info(text : string) {
    // get new Date
    let today = new Date();

    // get Milliseconds
    let ms = "ERROR!";
    ms = 1 == today.getMilliseconds().toString().length ? "00" + today.getMilliseconds() : 2 == today.getMilliseconds().toString().length ? "0" + today.getMilliseconds().toString() : today.getMilliseconds().toString();

    // get years
    let year = today.getFullYear();

    // get hours
    let hours = `ERROR!`;
    hours = 1 == today.getHours().toString().length ? "0" + today.getHours() : today.getHours().toString();

    // get minutes
    let minutes = "ERROR!";
    minutes = 1 == today.getMinutes().toString().length ? "0" + today.getMinutes() : today.getMinutes().toString();

    // get seconds
    let seconds = "ERROR!";
    seconds = 1 == today.getSeconds().toString().length ? "0" + today.getSeconds() : today.getSeconds().toString();

    // get month
    let month = "ERROR!";
    const monthtest = today.getMonth() + 1;
    month = 1 == monthtest.toString().length ? "0" + monthtest : monthtest.toString();

    // get day
    let day = "ERROR!";
    day = 1 == today.getDate().toString().length ? "0" + today.getDate() : today.getDate().toString();

    // console log
    return console.log(brightWhite(`[${year}-${month}-${day} ${hours}:${minutes}:${seconds}:${ms} INFO] ${text}`))
}

let NormalNumber = Math.round((bedrockServer.serverInstance.getPlayers().length / 100) * 최대_경고_설정)

function plsendMessage(plname : string | undefined,  message : string){
    bedrockServer.executeCommand(`tellraw "${plname}" {"rawtext":[{"text":"${message}"}]}`)
}

const reportList : any = {}

command.register("report", language.cmd.description, CommandPermissionLevel.Normal).overload((p, o) => {
    if (o.isServerCommandOrigin()) {
        info(red(language.cmd.err))
        return CANCEL
    }

    if (p.menu == "report"){
        const tname = p.target.getName()
        const plname = o.getEntity()?.getName()
        const targetReportCount = reportList[tname].split(":")[0x0]
        const targetReporter = reportList[tname].split(":")[1]

        if (!bedrockServer.executeCommand(`testfor "${tname}"`).isSuccess()) {
            plsendMessage(plname, language.report.err.unknowntarget)
            return CANCEL
        }

        for (const tevpl of p.target.newResults(o)) {
            const ni = tevpl.getNetworkIdentifier()
            const pl = ni.getActor()!

            if (pl.getPermissionLevel() == PlayerPermission.OPERATOR) {
                plsendMessage(plname, language.report.err.reportop)
                return CANCEL
            }
        }

        if (tname == plname) {
            plsendMessage(plname, "§c자기 자신을 신고할 수 없습니다")
            return CANCEL
        }

        if (reportList[tname] && reportList[tname].includes(plname)) {
            plsendMessage(plname, language.report.err.overlap)
            return CANCEL
        }

        plsendMessage(plname, language.report.reported)

        if (!reportList[tname]) reportList[tname] = `1:${plname}`
        else reportList[tname] = `${targetReportCount + 1}:${targetReporter}:${plname}`

        if (targetReportCount >= NormalNumber) playerBanCommand(tname)
    }
    if (p.menu == "count") {
        const tname = p.target.getName()
        const plname = o.getEntity()?.getName()
        const targetReportCount = reportList[tname].split(":")[0x0]

        if (!reportList[tname]) {
            plsendMessage(plname, language.count.err.dontfindcount)
            return CANCEL
        }

        plsendMessage(plname, language.count.saw(tname, targetReportCount, NormalNumber))
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // 안쪽 코드 편집은 대한민국 법률을 위반합니다
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (p.menu == "author") plsendMessage(o.getEntity()?.getName(), `§aauthor - waternoob1005`)

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}, {
    menu: command.enum(
        "reportmenu",
        "report",
        "count",

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        // 안쪽 코드 편집은 대한민국 법률을 위반합니다
        //
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        "author"

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ),
    target: ActorCommandSelector
})

info(`신고 플러그인이 당신의 서버에 도착했어요!`)