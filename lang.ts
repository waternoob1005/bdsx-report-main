// All the developers are KOREAN.
// Therefore, plz understand that other languages may be awkward.

export const lang = {
    한국어 : {
        cmd : {
            description : "신고 기능을 사용합니다.",
            err: "당신은 콘솔이에요.."
        },
        report : {
            err : {
                unknowntarget : "§c서버 내에 존재하지 않는 유저입니다. 오타가 있는 지 확인해주세요",
                reportop : "§c서버 운영자를 신고할 수 없습니다",
                reportme : "§c자기 자신을 신고할 수 없습니다",
                overlap : "§c연속으로 같은 사람을 신고할 수 없습니다"
            },
            reported : "§a신고를 성공적으로 완료했습니다."
        },
        count : {
            err : {
                dontfindcount : "§c신고 수를 찾을 수 없습니다"
            },
            saw : function saw(tname : string, targetReportCount : any, NormalNumber : number){
                return `§e${tname}§r§e님은 경고를 ${targetReportCount}§r§e번 먹었습니다. 그리고 모든 플레이어는 ${NormalNumber}번 이상 신고를 먹을 시 추방되죠!`
            }
        }
    },
    english : {
        cmd : {
            description : "Enable reporting.",
            err : "You are the console.."
        },
        report : {
            err : {
                unknowntarget : "§cUser does not exist on the server. Please check if there are any typos",
                reportop : "§cUnable to report server operator",
                reportme : "§cYou can't report yourself",
                overlap : "§cYou can't report the same person in a row"
            },
            reported : "§aYou have successfully completed your report."
        },
        count : {
            err : {
                dontfindcount : "§cNumber of reports not found"
            },
            saw : function saw(tname : string, targetReportCount : any, NormalNumber : number){
                return `§e${tname}§r§e has been warned ${targetReportCount}§r§e times. And all players are deported if they eat more than ${NormalNumber} reports!`
            }
        }
    },
    日本 : {
        cmd : {
            description: "申告機能を使用します。",
            err: "あなたはコンソールです.."
        },
        report : {
            err : {
                unknowntarget: "§cサーバー内に存在しないユーザーです。 誤字があるか確認してください。",
                reportop: "§cサーバー運営者を申告できません",
                reportme: "§c自分自身を申告することはできません",
                overlap:"§c連続で同じ人を申告することはできません"
            },
            reported:"§a申告を成功裏に完了しました。"
        },
        count : {
            err : {
                dontfindcount: "§c届出数が見つかりません"
            },
            saw : function saw(tname : string, targetReportCount : any, NormalNumber : number){
                return `§e${tname}§r§effe様は警告を${targetReportCount}§r§effe回いただきました。 そして、すべてのプレイヤーは${NormalNumber}回以上申告をした場合、追放されます！`
            }
        }
    },
}