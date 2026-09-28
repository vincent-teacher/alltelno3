/* 楊梅高中分機覽表 — 資料檔
 * 來源：桃園市立楊梅高級中學語音電話分機一覽表.pdf（編製：總務處，版本 115/09/07）
 * 更新方式：只需修改本檔。items 每筆為 [名稱, 分機(多個以空白分隔), 聯絡人]
 * tel = 直撥電話（03-），fax = 傳真（03-）
 */
const PHONE = {
  school: "桃園市立楊梅高級中學",
  schoolEn: "Taoyuan Municipal Yangmei Senior High School",
  area: "03",
  lines: [
    { zh: "代表號", en: "Main line", num: "4789618" },
    { zh: "二線", en: "Line 2", num: "4780449" },
    { zh: "三線", en: "Line 3", num: "4780740" }
  ],
  editor: "總務處",
  editorEn: "General Affairs Office",
  version: "115/09/07"
};

const CATS = [
  { id: "admin", zh: "行政處室", en: "Offices", icon: "🏛️", color: "#ff6b6b" },
  { id: "teach", zh: "教師辦公室", en: "Staff rooms", icon: "👩‍🏫", color: "#4dabf7" },
  { id: "room", zh: "教室場館", en: "Classrooms", icon: "🔬", color: "#51cf66" },
  { id: "serve", zh: "服務單位", en: "Services", icon: "🤝", color: "#fcc419" }
];

const UNITS = [
  { id: "principal", cat: "admin", icon: "👔", color: "#e8590c", zh: "校長室", en: "Principal's Office", tel: "", fax: "4856117", items: [
    ["校長", "1101", "鍾校長"], ["秘書", "1102", "黃秘書"], ["技工", "1103", "劉小姐"], ["校長宿舍", "1104", ""] ] },
  { id: "academic", cat: "admin", icon: "📚", color: "#1c7ed6", zh: "教務處", en: "Academic Affairs", tel: "4783574", fax: "4882675", items: [
    ["主任", "1201", "李主任"], ["教學組長", "1211", "邱組長"], ["幹事", "1212", "張小姐"], ["印刷室", "1213", "陳先生"],
    ["註冊組長", "1221", "賴組長"], ["幹事", "1222", "曾小姐"], ["設備組長", "1231", "鄭組長"], ["助理員", "1232", "謝小姐"],
    ["書記", "1233", "吳先生"], ["數位前導助理", "1234", "王小姐"], ["實驗研究組長", "1241", "邱組長"], ["幹事", "1242", "宋先生"],
    ["均質化專案助理", "1243", ""], ["學期歷程檔案助理", "1244", "楊小姐"], ["試務組組長", "1251", "蘇組長"], ["幹事", "1252", "蔡小姐"],
    ["（未標示）", "1261", ""], ["英語教師", "1262", ""], ["雙語助理", "1263", "葉先生"], ["雙語教師", "1264", "高老師"] ] },
  { id: "student", cat: "admin", icon: "🏃", color: "#f03e3e", zh: "學務處", en: "Student Affairs", tel: "4758950", fax: "4757034", items: [
    ["主任", "1301", "呂主任"], ["午餐秘書", "1302", "李老師"], ["學務創新人力", "1303", "呂先生"], ["訓育組長", "1311", "簡組長"],
    ["幹事", "1312", "傅小姐"], ["活動組長", "1321", "魏組長"], ["學務創新人力", "1322", "林先生"], ["禮堂準備室", "1324", ""],
    ["體育組長", "1331", "廖組長"], ["游泳池", "1333", "陳先生"], ["管理員", "1334", "鍾小姐"], ["跆拳道館", "1335", ""],
    ["衛生組長", "1341", "詹組長"], ["護理師（健康中心）", "1342", "陳小姐"], ["學務創新人力", "1343", "張先生"], ["健康中心", "1119", "陳小姐"] ] },
  { id: "safety", cat: "admin", icon: "🛡️", color: "#c2255c", zh: "校安中心", en: "Campus Safety Center", tel: "4854998", fax: "4780428", items: [
    ["學務創新人力", "1351", "廖先生"], ["生輔組長", "1352", "張組長"], ["學務創新人力", "1353", "李先生"], ["學務創新人力", "1354", "陳先生"],
    ["幹事", "1355", "范小姐"], ["學務創新人力", "1356", "郭先生"], ["學務創新人力", "1357", "彭先生"] ] },
  { id: "general", cat: "admin", icon: "🛠️", color: "#2f9e44", zh: "總務處", en: "General Affairs", tel: "4783349", fax: "4780164", items: [
    ["主任", "1401", "劉主任"], ["文書組長", "1411", "黃組長"], ["臨時人員", "1412", "鍾小姐"], ["出納組長", "1421", "黃組長"],
    ["庶務組長", "1431", "劉組長"], ["財管管理員", "1432", "謝先生"], ["採購幹事", "1433", "張先生"], ["學務創新人力", "1434", "彭先生"],
    ["臨時人員", "1435", "宋先生"] ] },
  { id: "counsel", cat: "admin", icon: "💗", color: "#d6336c", zh: "輔導室", en: "Counseling Office", tel: "4758437", fax: "", items: [
    ["輔導主任", "1503", "林主任"], ["專任輔導教師", "1504", "陳老師"], ["專任輔導教師", "1507", "吳老師"], ["專任輔導教師", "1501", "金老師"],
    ["專任輔導教師", "1502", "陳老師"], ["特教教師 1", "1505", "何老師"], ["特教教師 2", "1506", "林老師"], ["特教教師 3", "1511", "曾老師"],
    ["生涯資訊室", "1508", ""], ["團體諮商室", "1509", ""], ["學習中心", "1510", ""] ] },
  { id: "practice", cat: "admin", icon: "⚙️", color: "#5f3dc4", zh: "實習處", en: "Practicum Office", tel: "", fax: "", items: [
    ["實習處主任", "1701", "簡主任"], ["實習就業組長", "1702", "蔡組長"], ["資訊科主任", "1703", "廖主任"], ["技佐", "1704", "林先生"],
    ["電子科主任", "1705", "余主任"], ["技士", "1706", "卓小姐"] ] },
  { id: "library", cat: "admin", icon: "📖", color: "#0c8599", zh: "圖書館", en: "Library", tel: "4780586", fax: "", items: [
    ["主任", "1601", "施主任"], ["讀者服務組長", "1602", "何組長"], ["資訊媒體組長", "1603", "賴組長"], ["幹事／讀者服務櫃台", "1605", "呂小姐"],
    ["喜閱學堂", "1606", ""], ["演藝廳", "1607", ""] ] },
  { id: "personnel", cat: "admin", icon: "🗂️", color: "#9c36b5", zh: "人事室", en: "Personnel Office", tel: "4784103", fax: "4755774", items: [
    ["主任", "1121", "邱主任"], ["組員", "1122", "陳先生"] ] },
  { id: "accounting", cat: "admin", icon: "🧮", color: "#e67700", zh: "會計室", en: "Accounting Office", tel: "4789683", fax: "4782322", items: [
    ["主任", "1131", "林主任"], ["組員", "1132", "張小姐"], ["佐理員", "1133", "陳小姐"] ] },
  { id: "homeroom", cat: "teach", icon: "🍎", color: "#1971c2", zh: "導師辦公室", en: "Homeroom Teachers' Offices", tel: "", fax: "", items: [
    ["悅知樓 1 樓導師室（高一）", "1361 1365", ""], ["悅知樓 2 樓導師室（高一）", "1366", ""],
    ["悅知樓 3 樓導師室（高二）", "1362 1364", ""], ["日新樓 1 樓導師室（高三）", "1363 1367", ""] ] },
  { id: "subject", cat: "teach", icon: "✏️", color: "#3b5bdb", zh: "專任教師辦公室", en: "Subject Teachers' Offices", tel: "", fax: "", items: [
    ["蘊慧樓 1 樓專一辦公室", "1271 1275", ""], ["蘊慧樓 2 樓專二辦公室", "1272", ""],
    ["日新樓 2 樓專三辦公室", "1273", ""], ["日新樓 3 樓專四辦公室", "1274", ""] ] },
  { id: "labs", cat: "room", icon: "🧪", color: "#2b8a3e", zh: "實驗室", en: "Laboratories", tel: "", fax: "", items: [
    ["化學實驗室", "1373", ""], ["基礎理化實驗室", "1374", ""], ["物理實驗室", "1375", ""], ["生物實驗室", "1376", ""],
    ["基礎生物實驗室", "1378", ""], ["地科實驗室", "1379", ""] ] },
  { id: "special", cat: "room", icon: "💻", color: "#087f5b", zh: "專科教室", en: "Specialty Classrooms", tel: "", fax: "", items: [
    ["啟明樓校史室", "1284", ""], ["語言教室", "1285", ""], ["蘊慧樓電腦機房", "1286", ""], ["電腦教室一", "1287", ""],
    ["視聽一教室", "1288", ""], ["電腦教室二", "1289", ""], ["美術教室", "1291", ""], ["科技應用教室", "1292", ""],
    ["新興科技推廣教室", "1293", ""], ["雙語教室", "1294", ""], ["電腦教室三", "1295", ""], ["探究與實作教室", "1296", ""],
    ["環境教育中心", "1297", ""] ] },
  { id: "rixin", cat: "room", icon: "🎭", color: "#e64980", zh: "日新樓專科教室", en: "Rixin Building Classrooms", tel: "", fax: "", items: [
    ["英語情境教室", "1711", ""], ["日新樓展演中心", "1712", ""], ["護理教室", "1751", ""], ["計概教室", "1752", ""],
    ["音樂教室", "1761", ""], ["藝術生活教室", "1764", ""], ["視覺藝術教室", "1765", ""] ] },
  { id: "yufeng", cat: "room", icon: "🌬️", color: "#1098ad", zh: "御風樓", en: "Yufeng Building", tel: "", fax: "", items: [
    ["御風 2-1", "2421", ""], ["御風 2-2", "2422", ""], ["御風 2-3", "2423", ""], ["御風 3-1", "2431", ""],
    ["御風 3-2", "2432", ""], ["御風 3-3", "2433", ""], ["御風 3-4", "2434", ""], ["社團教室 2", "2435", ""] ] },
  { id: "lifesci", cat: "room", icon: "🍳", color: "#f76707", zh: "生科大樓", en: "Life Science Building", tel: "", fax: "", items: [
    ["體育器材室", "1811", ""], ["生活科技教室", "1821", ""], ["烹飪教室", "1822", ""], ["家政教室", "1822", ""] ] },
  { id: "partner", cat: "serve", icon: "🚨", color: "#495057", zh: "協力組織", en: "Support Facilities", tel: "", fax: "", items: [
    ["警衛室", "1110", ""], ["聯合辦公室", "1112", ""], ["第一會議室", "1113", ""], ["交通安全教室", "1114", ""], ["第二會議室", "1115", ""] ] },
  { id: "coop", cat: "serve", icon: "🛒", color: "#f59f00", zh: "員生社", en: "School Store", tel: "4750453", fax: "", items: [
    ["員生社", "1491", "林小姐"] ] }
];

/* 英文模式用的對照（找不到時顯示中文） */
const ROLE_EN = {
  "校長": "Principal", "秘書": "Secretary", "技工": "Technician", "校長宿舍": "Principal's residence",
  "主任": "Director", "教學組長": "Head, Instruction", "幹事": "Clerk", "印刷室": "Print room", "註冊組長": "Head, Registry",
  "設備組長": "Head, Equipment", "助理員": "Assistant", "書記": "Clerk", "數位前導助理": "Digital pilot assistant",
  "實驗研究組長": "Head, Research", "均質化專案助理": "Equalization project assistant", "學期歷程檔案助理": "Portfolio assistant",
  "試務組組長": "Head, Examinations", "（未標示）": "(unlabeled)", "英語教師": "English teacher", "雙語助理": "Bilingual assistant",
  "雙語教師": "Bilingual teacher", "午餐秘書": "Lunch secretary", "學務創新人力": "Student affairs staff", "訓育組長": "Head, Discipline",
  "活動組長": "Head, Activities", "禮堂準備室": "Auditorium prep room", "體育組長": "Head, PE", "游泳池": "Swimming pool",
  "管理員": "Caretaker", "跆拳道館": "Taekwondo hall", "衛生組長": "Head, Health", "護理師（健康中心）": "Nurse (Health Center)",
  "健康中心": "Health Center", "生輔組長": "Head, Student Life", "文書組長": "Head, Documents", "臨時人員": "Temporary staff",
  "出納組長": "Head, Cashier", "庶務組長": "Head, General Services", "財管管理員": "Property manager", "採購幹事": "Procurement clerk",
  "輔導主任": "Director of Counseling", "專任輔導教師": "Counselor", "特教教師 1": "Special-ed teacher 1", "特教教師 2": "Special-ed teacher 2",
  "特教教師 3": "Special-ed teacher 3", "生涯資訊室": "Career info room", "團體諮商室": "Group counseling room", "學習中心": "Learning center",
  "實習處主任": "Director of Practicum", "實習就業組長": "Head, Internship & Jobs", "資訊科主任": "Head, IT Dept.", "技佐": "Technical assistant",
  "電子科主任": "Head, Electronics Dept.", "技士": "Technician", "讀者服務組長": "Head, Reader Services", "資訊媒體組長": "Head, Media",
  "幹事／讀者服務櫃台": "Clerk / Service desk", "喜閱學堂": "Reading hall", "演藝廳": "Performance hall", "組員": "Officer", "佐理員": "Assistant",
  "悅知樓 1 樓導師室（高一）": "Yuezhi 1F (Grade 10)", "悅知樓 2 樓導師室（高一）": "Yuezhi 2F (Grade 10)",
  "悅知樓 3 樓導師室（高二）": "Yuezhi 3F (Grade 11)", "日新樓 1 樓導師室（高三）": "Rixin 1F (Grade 12)",
  "蘊慧樓 1 樓專一辦公室": "Yunhui 1F Office 1", "蘊慧樓 2 樓專二辦公室": "Yunhui 2F Office 2", "日新樓 2 樓專三辦公室": "Rixin 2F Office 3",
  "日新樓 3 樓專四辦公室": "Rixin 3F Office 4", "化學實驗室": "Chemistry lab", "基礎理化實驗室": "Basic physics & chem lab",
  "物理實驗室": "Physics lab", "生物實驗室": "Biology lab", "基礎生物實驗室": "Basic biology lab", "地科實驗室": "Earth science lab",
  "啟明樓校史室": "School history room", "語言教室": "Language room", "蘊慧樓電腦機房": "Server room", "電腦教室一": "Computer room 1",
  "視聽一教室": "AV room 1", "電腦教室二": "Computer room 2", "美術教室": "Art room", "科技應用教室": "Tech application room",
  "新興科技推廣教室": "Emerging tech room", "雙語教室": "Bilingual room", "電腦教室三": "Computer room 3", "探究與實作教室": "Inquiry & practice room",
  "環境教育中心": "Environmental ed. center", "英語情境教室": "English immersion room", "日新樓展演中心": "Rixin performance center",
  "護理教室": "Nursing room", "計概教室": "Computing room", "音樂教室": "Music room", "藝術生活教室": "Art & life room", "視覺藝術教室": "Visual arts room",
  "社團教室 2": "Club room 2", "體育器材室": "PE equipment room", "生活科技教室": "Living tech room", "烹飪教室": "Cooking room", "家政教室": "Home economics room",
  "警衛室": "Guard room", "聯合辦公室": "Joint office", "第一會議室": "Meeting room 1", "交通安全教室": "Traffic safety room", "第二會議室": "Meeting room 2",
  "員生社": "School store"
};
const SURNAME = { "鍾": "Chung", "黃": "Huang", "劉": "Liu", "邱": "Chiu", "陳": "Chen", "林": "Lin", "張": "Chang", "李": "Lee", "賴": "Lai",
  "曾": "Tseng", "鄭": "Cheng", "謝": "Hsieh", "吳": "Wu", "王": "Wang", "宋": "Sung", "楊": "Yang", "蘇": "Su", "蔡": "Tsai", "葉": "Yeh",
  "高": "Kao", "彭": "Peng", "簡": "Chien", "廖": "Liao", "余": "Yu", "卓": "Cho", "呂": "Lu", "傅": "Fu", "魏": "Wei", "詹": "Chan",
  "范": "Fan", "郭": "Kuo", "金": "Chin", "何": "Ho", "施": "Shih" };
const HONOR = { "小姐": "Ms.", "先生": "Mr.", "校長": "Principal", "秘書": "Secretary", "主任": "Director", "組長": "Chief", "老師": "Teacher" };
