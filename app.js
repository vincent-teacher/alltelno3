/* 楊梅高中分機覽表 — 互動程式 */
(() => {
  "use strict";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const store = {
    get(k, d) { try { const v = localStorage.getItem("ymhs-ext-" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("ymhs-ext-" + k, JSON.stringify(v)); } catch (e) { /* 無法儲存時略過 */ } }
  };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- 文字 ---------- */
  const T = {
    zh: {
      title: "楊梅高中分機覽表", subtitle: "桃園市立楊梅高級中學", settings: "設定", heroTitle: "一指找到分機",
      heroDesc: "點選任何號碼即可撥打、複製或加入常用。", mainLines: "總機", dialHint: "撥打分機：先撥總機，聽到語音後再輸入 4 碼分機。",
      byCat: "依類別瀏覽", quick: "熱門快撥", modeUnit: "依單位", modeMap: "號碼地圖", searchPh: "輸入單位、職稱、姓氏或分機",
      voice: "語音搜尋", keypad: "數字鍵盤", favs: "我的常用", recent: "最近查看", clearRecent: "清除紀錄", quizTitle: "分機小達人挑戰",
      quizDesc: "10 題隨機題目，看看你對學校分機有多熟！", start: "開始挑戰", next: "下一題 ➜", again: "再玩一次",
      navHome: "首頁", navBrowse: "瀏覽", navSearch: "檢索", navFav: "常用", navQuiz: "挑戰",
      stUnits: "單位", stEntries: "項目", stExts: "分機", all: "全部", direct: "直撥", fax: "傳真", items: "項",
      call: "撥打", copy: "複製", fav: "常用", faved: "已加入", copied: "已複製", addFav: "已加入常用 ⭐", rmFav: "已移出常用",
      ext: "分機", sameExt: "共用此分機", sameUnit: "同單位其他分機", faxNote: "傳真號碼僅供複製使用",
      extNote: "撥號時將先撥總機 03-4789618，再自動帶入分機（視手機支援）。",
      found: n => `找到 ${n} 筆結果`, none: "找不到符合的資料", noneTip: "試試單位名稱、職稱、姓氏或分機號碼",
      typeHint: "輸入關鍵字開始檢索，或試試下方熱門詞", tryWords: ["主任", "健康中心", "警衛室", "實驗室", "御風", "圖書館", "幹事", "13"],
      noFav: "還沒有常用分機，在詳細面板按 ⭐ 就能加入。", noRecent: "尚無查看紀錄。", cleared: "紀錄已清除",
      qNo: (i, n) => `第 ${i} / ${n} 題`, qScore: s => `得分 ${s}`, best: s => `最佳成績：${s} / 10`,
      q1: (u, n) => `「${u}・${n}」的分機是？`, q2: e => `分機 ${e} 是哪裡？`, q3: u => `「${u}」的直撥電話是？`, q4: p => `「${p}」屬於哪個單位？`,
      right: "答對了！🎉", wrong: a => `答錯了，正確答案是 ${a}`,
      end: s => s >= 9 ? "分機大師！" : s >= 6 ? "表現很棒！" : "再接再厲！", endSub: s => `你答對了 ${s} / 10 題`,
      vNo: "此瀏覽器不支援語音辨識", vListen: "請說出要找的單位…", editor: "編製", version: "版本",
      sFull: "全螢幕", sSound: "音效", sDevice: "裝置", sLayout: "版面", sLang: "語言", sFont: "字體大小", sTheme: "主題",
      on: "開", off: "關", auto: "自動", phone: "手機", tablet: "平板", desktop: "桌機", portrait: "直式", landscape: "橫式",
      small: "小", standard: "標準", large: "大", system: "系統", light: "明亮", dark: "深色", unlabeled: "（未標示）"
    },
    en: {
      title: "YMHS Extensions", subtitle: "Yangmei Senior High School", settings: "Settings", heroTitle: "Find any extension fast",
      heroDesc: "Tap a number to call, copy, or save it.", mainLines: "Main lines", dialHint: "To reach an extension, dial a main line, then enter the 4-digit extension.",
      byCat: "Browse by category", quick: "Popular", modeUnit: "By office", modeMap: "Number map", searchPh: "Office, title, surname or extension",
      voice: "Voice search", keypad: "Keypad", favs: "My favorites", recent: "Recently viewed", clearRecent: "Clear history", quizTitle: "Extension Challenge",
      quizDesc: "10 random questions — how well do you know the school extensions?", start: "Start", next: "Next ➜", again: "Play again",
      navHome: "Home", navBrowse: "Browse", navSearch: "Search", navFav: "Saved", navQuiz: "Quiz",
      stUnits: "Offices", stEntries: "Entries", stExts: "Extensions", all: "All", direct: "Direct", fax: "Fax", items: "items",
      call: "Call", copy: "Copy", fav: "Save", faved: "Saved", copied: "Copied", addFav: "Saved ⭐", rmFav: "Removed",
      ext: "Ext.", sameExt: "Shares this extension", sameUnit: "Other extensions in this office", faxNote: "Fax numbers can only be copied",
      extNote: "Calling dials 03-4789618 first, then sends the extension (if your phone supports it).",
      found: n => `${n} result${n === 1 ? "" : "s"}`, none: "No matches", noneTip: "Try an office, title, surname or number",
      typeHint: "Type to search, or try a popular word", tryWords: ["Director", "Health", "Guard", "lab", "Yufeng", "Library", "Clerk", "13"],
      noFav: "No favorites yet. Tap ⭐ in the detail panel to add one.", noRecent: "Nothing viewed yet.", cleared: "History cleared",
      qNo: (i, n) => `Question ${i} / ${n}`, qScore: s => `Score ${s}`, best: s => `Best: ${s} / 10`,
      q1: (u, n) => `What is the extension for “${u} · ${n}”?`, q2: e => `Where does extension ${e} ring?`, q3: u => `What is the direct line of “${u}”?`, q4: p => `Which office is “${p}” in?`,
      right: "Correct! 🎉", wrong: a => `Wrong — the answer is ${a}`,
      end: s => s >= 9 ? "Extension master!" : s >= 6 ? "Great job!" : "Keep practicing!", endSub: s => `You got ${s} / 10`,
      vNo: "Speech recognition isn't supported here", vListen: "Say an office name…", editor: "Compiled by", version: "Version",
      sFull: "Fullscreen", sSound: "Sound", sDevice: "Device", sLayout: "Layout", sLang: "Language", sFont: "Font size", sTheme: "Theme",
      on: "On", off: "Off", auto: "Auto", phone: "Phone", tablet: "Tablet", desktop: "Desktop", portrait: "Portrait", landscape: "Landscape",
      small: "Small", standard: "Standard", large: "Large", system: "System", light: "Light", dark: "Dark", unlabeled: "(unlabeled)"
    }
  };

  /* ---------- 設定 ---------- */
  const S = Object.assign({ sound: true, device: "auto", layout: "auto", lang: "zh", font: "standard", theme: "system" }, store.get("settings", {}));
  const t = k => T[S.lang][k] ?? T.zh[k];

  /* ---------- 資料整理 ---------- */
  const UNIT = Object.fromEntries(UNITS.map(u => [u.id, u]));
  const CAT = Object.fromEntries(CATS.map(c => [c.id, c]));
  const ENTRIES = [];
  UNITS.forEach(u => {
    if (u.tel) ENTRIES.push({ id: u.id + "-tel", uid: u.id, kind: "tel", name: "直撥", exts: [u.tel], person: "" });
    if (u.fax) ENTRIES.push({ id: u.id + "-fax", uid: u.id, kind: "fax", name: "傳真", exts: [u.fax], person: "" });
    u.items.forEach(([name, ext, person], i) => ENTRIES.push({ id: u.id + "-" + i, uid: u.id, kind: "ext", name, exts: ext.split(/\s+/), person }));
  });
  const BYID = Object.fromEntries(ENTRIES.map(e => [e.id, e]));
  const EXTS = ENTRIES.filter(e => e.kind === "ext");
  const EXTMAP = {};
  EXTS.forEach(e => e.exts.forEach(x => (EXTMAP[x] = EXTMAP[x] || []).push(e)));

  const unitName = u => S.lang === "en" ? u.en : u.zh;
  const itemName = e => {
    if (e.kind === "tel") return t("direct");
    if (e.kind === "fax") return t("fax");
    return S.lang === "en" ? (ROLE_EN[e.name] || e.name) : e.name;
  };
  const personName = p => {
    if (!p || S.lang !== "en") return p;
    const sur = SURNAME[p[0]], hon = HONOR[p.slice(1)];
    return sur && hon ? `${hon} ${sur}` : p;
  };
  const fmtNum = (e, x) => e.kind === "ext" ? x : "03-" + x;
  const telHref = (e, x) => e.kind === "ext" ? `tel:03${PHONE.lines[0].num},${x}` : `tel:03${x}`;

  /* ---------- 音效（Web Audio 即時合成） ---------- */
  let ac = null;
  const audio = () => { if (!ac) { try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; } } if (ac.state === "suspended") ac.resume(); return ac; };
  function tone(freqs, dur = .12, type = "sine", vol = .12, delay = 0) {
    if (!S.sound) return; const a = audio(); if (!a) return;
    const t0 = a.currentTime + delay, g = a.createGain();
    g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(vol, t0 + .01); g.gain.exponentialRampToValueAtTime(.0001, t0 + dur);
    g.connect(a.destination);
    [].concat(freqs).forEach(f => { const o = a.createOscillator(); o.type = type; o.frequency.setValueAtTime(f, t0); o.connect(g); o.start(t0); o.stop(t0 + dur + .02); });
  }
  const DTMF = { 1: [697, 1209], 2: [697, 1336], 3: [697, 1477], 4: [770, 1209], 5: [770, 1336], 6: [770, 1477], 7: [852, 1209], 8: [852, 1336], 9: [852, 1477], "*": [941, 1209], 0: [941, 1336], "#": [941, 1477] };
  const snd = {
    tap: () => tone(660, .06, "triangle", .08),
    open: () => { tone(523, .08, "sine", .1); tone(784, .12, "sine", .1, .06); },
    close: () => { tone(620, .07, "sine", .08); tone(420, .1, "sine", .08, .05); },
    dtmf: k => tone(DTMF[k] || DTMF["#"], .14, "sine", .09),
    ok: () => [523, 659, 784].forEach((f, i) => tone(f, .14, "triangle", .12, i * .08)),
    bad: () => { tone(220, .18, "sawtooth", .06); tone(180, .22, "sawtooth", .06, .12); },
    star: () => [880, 1175, 1568].forEach((f, i) => tone(f, .1, "sine", .09, i * .05)),
    ring: () => [0, .25].forEach(d => tone([440, 480], .2, "sine", .07, d)),
    fanfare: () => [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, .18, "square", .06, i * .12)),
    swish: () => tone(900, .08, "triangle", .05)
  };

  /* ---------- 共用元件 ---------- */
  const toastEl = $("#toast"); let toastTimer;
  function toast(msg) { toastEl.textContent = msg; toastEl.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => (toastEl.hidden = true), 1800); }

  const hl = (text, q) => {
    const s = esc(text); if (!q) return s;
    const i = text.toLowerCase().indexOf(q.toLowerCase()); if (i < 0) return s;
    return esc(text.slice(0, i)) + "<mark>" + esc(text.slice(i, i + q.length)) + "</mark>" + esc(text.slice(i + q.length));
  };
  let favs = store.get("favs", []), recent = store.get("recent", []);

  function rowHTML(e, { q = "", showUnit = false } = {}) {
    const u = UNIT[e.uid];
    const nm = itemName(e);
    return `<button class="row" data-id="${e.id}">
      <span class="r-main">
        <span class="r-name">${showUnit ? `<span class="r-unit" style="background:${u.color}">${esc(u.icon + " " + unitName(u))}</span>` : ""}${hl(nm, q)}${e.name === "（未標示）" && S.lang === "zh" ? "" : ""}</span>
        ${e.person ? `<span class="r-person">👤 ${hl(personName(e.person), q)}</span>` : ""}
      </span>
      ${favs.includes(e.id) ? '<span class="star">⭐</span>' : ""}
      <span class="ext">${e.exts.map(x => hl(fmtNum(e, x), q)).join(" / ")}</span>
    </button>`;
  }

  /* ---------- 詳細面板 ---------- */
  const sheet = $("#sheet"), mask = $("#sheetMask");
  function openSheet(id) {
    const e = BYID[id]; if (!e) return;
    const u = UNIT[e.uid];
    recent = [id, ...recent.filter(x => x !== id)].slice(0, 12); store.set("recent", recent);
    const isFav = favs.includes(id);
    const shared = e.kind === "ext" ? [...new Set(e.exts.flatMap(x => EXTMAP[x]))].filter(o => o !== e) : [];
    const others = ENTRIES.filter(o => o.uid === e.uid && o !== e).slice(0, 6);
    sheet.innerHTML = `<div class="grab"></div>
      <div class="sh-head">
        <span class="u-ico" style="background:${u.color}">${u.icon}</span>
        <div><p class="sh-title">${esc(itemName(e))}</p><span class="sh-unit">${esc(unitName(u))}</span></div>
      </div>
      <div class="sh-exts">${e.exts.map(x => `<span class="sh-ext">${esc(fmtNum(e, x))}</span>`).join("")}</div>
      ${e.person ? `<p class="sh-person">👤 ${esc(personName(e.person))}</p>` : ""}
      <div class="sh-actions">
        ${e.kind === "fax" ? `<span class="act call" style="opacity:.45"><span>📠</span>${t("fax")}</span>` :
          `<a class="act call" href="${telHref(e, e.exts[0])}" data-act="call"><span>📞</span>${t("call")}</a>`}
        <button class="act copy" data-act="copy"><span>📋</span>${t("copy")}</button>
        <button class="act fav ${isFav ? "on" : ""}" data-act="fav"><span>${isFav ? "🌟" : "⭐"}</span>${isFav ? t("faved") : t("fav")}</button>
      </div>
      <p class="sh-note">${e.kind === "fax" ? t("faxNote") : e.kind === "ext" ? t("extNote") : ""}</p>
      ${shared.length ? `<div class="sh-same"><h4>🔗 ${t("sameExt")}</h4>${shared.map(o => rowHTML(o, { showUnit: true })).join("")}</div>` : ""}
      ${others.length ? `<div class="sh-same"><h4>🏢 ${t("sameUnit")}</h4>${others.map(o => rowHTML(o)).join("")}</div>` : ""}`;
    sheet.dataset.id = id;
    sheet.hidden = mask.hidden = false;
    sheet.scrollTop = 0;
    snd.open();
  }
  function closeSheet() { if (sheet.hidden) return; sheet.hidden = mask.hidden = true; snd.close(); refreshLists(); }
  mask.addEventListener("click", closeSheet);
  sheet.addEventListener("click", ev => {
    const act = ev.target.closest("[data-act]"), row = ev.target.closest(".row");
    const e = BYID[sheet.dataset.id];
    if (row) { openSheet(row.dataset.id); return; }
    if (!act) return;
    if (act.dataset.act === "call") { snd.ring(); }
    if (act.dataset.act === "copy") {
      const txt = e.exts.map(x => fmtNum(e, x)).join(" / ");
      const done = () => { snd.star(); toast(`${t("copied")}：${txt}`); };
      if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, () => fallbackCopy(txt, done)); else fallbackCopy(txt, done);
    }
    if (act.dataset.act === "fav") {
      if (favs.includes(e.id)) { favs = favs.filter(x => x !== e.id); toast(t("rmFav")); snd.close(); }
      else { favs.push(e.id); toast(t("addFav")); snd.star(); burst(ev.clientX, ev.clientY, 24); }
      store.set("favs", favs); openSheetSilently(e.id);
    }
  });
  function openSheetSilently(id) { const s = S.sound; S.sound = false; openSheet(id); S.sound = s; }
  function fallbackCopy(txt, done) {
    const ta = document.createElement("textarea"); ta.value = txt; document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) { /* 忽略 */ } ta.remove(); done();
  }
  document.addEventListener("click", ev => {
    const row = ev.target.closest(".row");
    if (row && !sheet.contains(row)) { snd.tap(); openSheet(row.dataset.id); }
  });

  /* ---------- 首頁 ---------- */
  function renderHome() {
    $("#lineList").innerHTML = PHONE.lines.map((l, i) => `<a class="line" href="tel:03${l.num}">
      <span class="l-ico">${["☎️", "📞", "📱"][i]}</span>
      <span><span class="l-name">${esc(S.lang === "en" ? l.en : l.zh)}</span><br><span class="l-num">03-${l.num}</span></span>
      <span class="l-go">${t("call")}</span></a>`).join("");
    const nExt = Object.keys(EXTMAP).length;
    $("#stats").innerHTML = [[UNITS.length, t("stUnits")], [EXTS.length, t("stEntries")], [nExt, t("stExts")]]
      .map(([n, l]) => `<div class="stat"><b data-count="${n}">0</b><span>${l}</span></div>`).join("");
    $$("#stats b").forEach(b => countUp(b, +b.dataset.count));
    $("#catTiles").innerHTML = CATS.map(c => {
      const us = UNITS.filter(u => u.cat === c.id);
      return `<button class="cat-tile" data-cat="${c.id}" style="background:linear-gradient(135deg, ${c.color}, ${shade(c.color)})">
        <span class="ci">${c.icon}</span><b>${esc(S.lang === "en" ? c.en : c.zh)}</b><small>${us.length} ${t("stUnits")}</small></button>`;
    }).join("");
    const quick = ["1110", "1119", "1301", "1352", "1605", "1491", "1201", "1401"];
    $("#quickList").innerHTML = quick.map(x => { const e = EXTMAP[x][0]; return `<button class="chip" data-id="${e.id}">${UNIT[e.uid].icon} ${esc(e.kind === "ext" && ["主任"].includes(e.name) ? unitName(UNIT[e.uid]) + (S.lang === "en" ? " " : "") + itemName(e) : itemName(e))} <span class="n">${x}</span></button>`; }).join("");
    $("#footInfo").textContent = `${t("editor")}：${S.lang === "en" ? PHONE.editorEn : PHONE.editor}　${t("version")}：${PHONE.version}`;
  }
  function shade(hex) { const n = parseInt(hex.slice(1), 16); const r = Math.max(0, (n >> 16) - 50), g = Math.max(0, ((n >> 8) & 255) - 50), b = Math.max(0, (n & 255) - 10); return `rgb(${r},${g},${b})`; }
  function countUp(el, to) { const t0 = performance.now(); const step = now => { const p = Math.min(1, (now - t0) / 900); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); }
  $("#catTiles").addEventListener("click", ev => { const b = ev.target.closest(".cat-tile"); if (!b) return; snd.tap(); browseCat = b.dataset.cat; browseMode = "unit"; go("browse"); });
  $("#quickList").addEventListener("click", ev => { const b = ev.target.closest(".chip"); if (b) { snd.dtmf(b.textContent.trim().slice(-1)); openSheet(b.dataset.id); } });

  /* ---------- 瀏覽 ---------- */
  let browseCat = "all", browseMode = "unit", openUnits = new Set();
  function renderBrowse() {
    $$(".seg-btn").forEach(b => b.classList.toggle("active", b.dataset.mode === browseMode));
    $("#catFilter").innerHTML = [{ id: "all", zh: "全部", en: "All", icon: "🌈" }, ...CATS]
      .map(c => `<button class="chip ${browseCat === c.id ? "on" : ""}" data-cat="${c.id}">${c.icon} ${esc(S.lang === "en" ? c.en : c.zh)}</button>`).join("");
    const us = UNITS.filter(u => browseCat === "all" || u.cat === browseCat);
    $("#unitList").hidden = browseMode !== "unit"; $("#numMap").hidden = browseMode !== "map";
    if (browseMode === "unit") {
      $("#unitList").innerHTML = us.map((u, i) => {
        const items = ENTRIES.filter(e => e.uid === u.id && e.kind === "ext");
        const direct = ENTRIES.filter(e => e.uid === u.id && e.kind !== "ext");
        return `<div class="unit ${openUnits.has(u.id) ? "open" : ""}" data-uid="${u.id}" style="animation-delay:${i * 40}ms">
          <button class="unit-head"><span class="u-ico" style="background:${u.color}">${u.icon}</span>
            <span><span class="u-name">${esc(unitName(u))}</span><br><span class="u-meta">${items.length} ${t("items")}${u.tel ? `・☎ 03-${u.tel}` : ""}</span></span>
            <span class="u-arrow">▶</span></button>
          <div class="unit-body">
            ${direct.length ? `<div class="u-direct">${direct.map(e => `<button class="chip row-chip" data-id="${e.id}">${e.kind === "tel" ? "☎️" : "📠"} ${t(e.kind === "tel" ? "direct" : "fax")} <span class="n">03-${e.exts[0]}</span></button>`).join("")}</div>` : ""}
            <div class="unit-wrap">${items.map(e => rowHTML(e)).join("")}</div>
          </div></div>`;
      }).join("");
    } else renderMap(us);
  }
  function renderMap(us) {
    const ids = new Set(us.map(u => u.id));
    const list = Object.keys(EXTMAP).filter(x => ids.has(EXTMAP[x][0].uid)).sort();
    const groups = {};
    list.forEach(x => (groups[x.slice(0, 2)] = groups[x.slice(0, 2)] || []).push(x));
    $("#numMap").innerHTML = `<div class="card"><div class="legend">${us.map(u => `<span><i style="background:${u.color}"></i>${esc(unitName(u))}</span>`).join("")}</div>
      ${Object.keys(groups).map(g => `<div class="map-group"><h4>📍 ${g}xx</h4><div class="map-grid">${groups[g].map((x, i) =>
        `<button class="cell" data-id="${EXTMAP[x][0].id}" data-ext="${x}" style="background:${UNIT[EXTMAP[x][0].uid].color};animation-delay:${i * 15}ms" title="${esc(unitName(UNIT[EXTMAP[x][0].uid]) + " " + itemName(EXTMAP[x][0]))}">${x}</button>`).join("")}</div></div>`).join("")}</div>`;
  }
  $("#catFilter").addEventListener("click", ev => { const b = ev.target.closest(".chip"); if (!b) return; snd.tap(); browseCat = b.dataset.cat; renderBrowse(); });
  $$(".seg-btn").forEach(b => b.addEventListener("click", () => { snd.swish(); browseMode = b.dataset.mode; renderBrowse(); }));
  $("#unitList").addEventListener("click", ev => {
    const chip = ev.target.closest(".row-chip"); if (chip) { snd.tap(); openSheet(chip.dataset.id); return; }
    const head = ev.target.closest(".unit-head"); if (!head) return;
    const box = head.parentElement, id = box.dataset.uid;
    box.classList.toggle("open"); box.classList.contains("open") ? (openUnits.add(id), snd.open()) : (openUnits.delete(id), snd.close());
  });
  $("#numMap").addEventListener("click", ev => { const c = ev.target.closest(".cell"); if (!c) return; [...c.dataset.ext].forEach((k, i) => setTimeout(() => snd.dtmf(k), i * 90)); setTimeout(() => openSheet(c.dataset.id), 300); });

  /* ---------- 檢索 ---------- */
  const qEl = $("#q");
  const norm = s => String(s).toLowerCase().replace(/\s+/g, "");
  const hay = e => { const u = UNIT[e.uid]; return norm([u.zh, u.en, e.name, ROLE_EN[e.name] || "", e.person, personName(e.person) || "", e.exts.join(" "), e.kind === "tel" ? "直撥 direct" : e.kind === "fax" ? "傳真 fax" : "", CAT[u.cat].zh].join("|")); };
  const HAY = Object.fromEntries(ENTRIES.map(e => [e.id, hay(e)]));
  function doSearch() {
    const q = qEl.value.trim(), nq = norm(q);
    if (!nq) {
      $("#resultInfo").textContent = t("typeHint"); $("#results").innerHTML = "";
      $("#suggest").innerHTML = t("tryWords").map(w => `<button class="chip" data-w="${esc(w)}">✨ ${esc(w)}</button>`).join("");
      return;
    }
    $("#suggest").innerHTML = "";
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    const res = ENTRIES.filter(e => terms.every(w => HAY[e.id].includes(norm(w))));
    const score = e => (e.exts.some(x => x.startsWith(nq)) ? 0 : 1) + (e.kind === "ext" ? 0 : .5);
    res.sort((a, b) => score(a) - score(b));
    $("#resultInfo").textContent = res.length ? t("found")(res.length) : "";
    $("#results").innerHTML = res.length ? res.slice(0, 120).map((e, i) => rowHTML(e, { q: terms[0], showUnit: true }).replace('class="row"', `class="row" style="animation-delay:${Math.min(i, 12) * 30}ms"`)).join("")
      : `<div class="empty"><span class="big">🙈</span><p>${t("none")}</p><p>${t("noneTip")}</p></div>`;
  }
  let searchTimer;
  qEl.addEventListener("input", () => { clearTimeout(searchTimer); searchTimer = setTimeout(doSearch, 120); });
  qEl.addEventListener("keydown", ev => { if (ev.key.length === 1 && /\d/.test(ev.key)) snd.dtmf(ev.key); });
  $("#suggest").addEventListener("click", ev => { const b = ev.target.closest(".chip"); if (!b) return; snd.tap(); qEl.value = b.dataset.w; doSearch(); });

  const pad = $("#pad"), PADKEYS = [["1", ""], ["2", "ABC"], ["3", "DEF"], ["4", "GHI"], ["5", "JKL"], ["6", "MNO"], ["7", "PQRS"], ["8", "TUV"], ["9", "WXYZ"], ["⌫", ""], ["0", "+"], ["✖", ""]];
  const KEYC = ["#ff6b6b", "#ff922b", "#fcc419", "#51cf66", "#20c997", "#22b8cf", "#339af0", "#5c7cfa", "#845ef7", "#adb5bd", "#f06595", "#868e96"];
  pad.innerHTML = PADKEYS.map(([k, s], i) => `<button class="key" data-k="${k}" style="background:${KEYC[i]}">${k}<small>${s || "&nbsp;"}</small></button>`).join("");
  pad.addEventListener("click", ev => {
    const b = ev.target.closest(".key"); if (!b) return; const k = b.dataset.k;
    if (k === "⌫") { qEl.value = qEl.value.slice(0, -1); snd.dtmf("*"); }
    else if (k === "✖") { qEl.value = ""; snd.dtmf("#"); }
    else { qEl.value = qEl.value.replace(/[^\d]/g, "") + k; snd.dtmf(k); }
    b.classList.add("hit"); setTimeout(() => b.classList.remove("hit"), 100);
    doSearch();
  });
  $("#btnPad").addEventListener("click", () => { pad.hidden = !pad.hidden; pad.hidden ? snd.close() : snd.open(); });

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  $("#btnVoice").addEventListener("click", () => {
    if (!SR) { toast(t("vNo")); snd.bad(); return; }
    const r = new SR(); r.lang = S.lang === "en" ? "en-US" : "zh-TW"; r.interimResults = false;
    const btn = $("#btnVoice"); btn.classList.add("btn-listen"); toast(t("vListen")); snd.open();
    r.onresult = ev => { qEl.value = ev.results[0][0].transcript.replace(/[。，,.？?！!]/g, ""); snd.ok(); doSearch(); };
    r.onend = () => btn.classList.remove("btn-listen");
    r.onerror = () => { btn.classList.remove("btn-listen"); snd.bad(); };
    try { r.start(); } catch (e) { btn.classList.remove("btn-listen"); }
  });

  /* ---------- 常用 ---------- */
  function renderFav() {
    const f = favs.map(id => BYID[id]).filter(Boolean), r = recent.map(id => BYID[id]).filter(Boolean);
    $("#favList").innerHTML = f.length ? f.map(e => rowHTML(e, { showUnit: true })).join("") : `<div class="empty"><span class="big">🌟</span><p>${t("noFav")}</p></div>`;
    $("#recentList").innerHTML = r.length ? r.map(e => rowHTML(e, { showUnit: true })).join("") : `<div class="empty"><span class="big">🕊️</span><p>${t("noRecent")}</p></div>`;
    $("#btnClearRecent").hidden = !r.length;
  }
  $("#btnClearRecent").addEventListener("click", () => { recent = []; store.set("recent", recent); renderFav(); toast(t("cleared")); snd.swish(); });

  /* ---------- 挑戰 ---------- */
  const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pick = (a, n) => shuffle(a).slice(0, n);
  let quiz = null;
  function makeQuestions() {
    const key = e => e.uid + "|" + e.name;
    const cnt = {}; EXTS.forEach(e => (cnt[key(e)] = (cnt[key(e)] || 0) + 1));
    const uniqName = EXTS.filter(e => cnt[key(e)] === 1 && e.name !== "（未標示）");
    const uniqExt = EXTS.filter(e => e.exts.every(x => EXTMAP[x].length === 1));
    const allExt = Object.keys(EXTMAP);
    const telUnits = UNITS.filter(u => u.tel);
    const persons = EXTS.filter(e => e.person && EXTS.filter(o => o.person === e.person).length === 1);
    const qs = [];
    for (let i = 0; i < 10; i++) {
      const type = [1, 2, 1, 2, 3, 4][Math.floor(Math.random() * 6)];
      if (type === 1) {
        const e = pick(uniqName, 1)[0], ans = e.exts[0];
        const near = allExt.filter(x => !e.exts.includes(x) && x[0] === ans[0]);
        qs.push({ text: t("q1")(unitName(UNIT[e.uid]), itemName(e)), ans, opts: shuffle([ans, ...pick(near, 3)]), id: e.id });
      } else if (type === 2) {
        const e = pick(uniqExt, 1)[0], lab = o => `${unitName(UNIT[o.uid])}・${itemName(o)}`, ans = lab(e);
        const others = pick(uniqExt.filter(o => o.uid !== e.uid), 3).map(lab);
        qs.push({ text: t("q2")(e.exts[0]), ans, opts: shuffle([ans, ...others]), id: e.id });
      } else if (type === 3) {
        const u = pick(telUnits, 1)[0], ans = "03-" + u.tel;
        qs.push({ text: t("q3")(unitName(u)), ans, opts: shuffle([ans, ...pick(telUnits.filter(o => o !== u), 3).map(o => "03-" + o.tel)]), id: u.id + "-tel" });
      } else {
        const e = pick(persons, 1)[0], ans = unitName(UNIT[e.uid]);
        const others = pick(UNITS.filter(u => u.id !== e.uid && u.cat === "admin"), 3).map(unitName);
        qs.push({ text: t("q4")(personName(e.person) + (S.lang === "en" ? "" : "") + "・" + itemName(e)), ans, opts: shuffle([ans, ...others]), id: e.id });
      }
    }
    return qs;
  }
  function showBest() { const b = store.get("best", null); $("#bestScore").textContent = b == null ? "" : t("best")(b); }
  function startQuiz() { quiz = { qs: makeQuestions(), i: 0, score: 0 }; $("#quizStart").hidden = $("#quizEnd").hidden = true; $("#quizBox").hidden = false; snd.fanfare(); showQ(); }
  function showQ() {
    const q = quiz.qs[quiz.i];
    $("#qNo").textContent = t("qNo")(quiz.i + 1, quiz.qs.length); $("#qScore").textContent = t("qScore")(quiz.score);
    $("#qBar").style.width = (quiz.i / quiz.qs.length * 100) + "%";
    $("#qText").textContent = q.text;
    $("#qOpts").innerHTML = q.opts.map(o => `<button class="opt">${esc(o)}</button>`).join("");
    $("#btnNext").hidden = true;
  }
  $("#qOpts").addEventListener("click", ev => {
    const b = ev.target.closest(".opt"); if (!b || quiz.done) return;
    const q = quiz.qs[quiz.i]; quiz.done = true;
    $$(".opt").forEach(o => { if (o.textContent === q.ans) o.classList.add("right"); });
    if (b.textContent === q.ans) { quiz.score++; snd.ok(); toast(t("right")); const r = b.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, 30); }
    else { b.classList.add("wrong"); snd.bad(); toast(t("wrong")(q.ans)); navigator.vibrate && navigator.vibrate(120); }
    $("#qScore").textContent = t("qScore")(quiz.score);
    $("#btnNext").hidden = false;
  });
  $("#btnNext").addEventListener("click", () => {
    quiz.done = false; quiz.i++; snd.swish();
    if (quiz.i < quiz.qs.length) return showQ();
    $("#qBar").style.width = "100%";
    $("#quizBox").hidden = true; $("#quizEnd").hidden = false;
    const s = quiz.score; $("#endEmoji").textContent = s >= 9 ? "🏆" : s >= 6 ? "🎉" : "💪";
    $("#endText").textContent = t("end")(s); $("#endSub").textContent = t("endSub")(s);
    if (s > store.get("best", -1)) store.set("best", s);
    snd.fanfare(); burst(innerWidth / 2, innerHeight / 3, s * 12 + 20);
  });
  $("#btnQuizGo").addEventListener("click", startQuiz);
  $("#btnQuizAgain").addEventListener("click", startQuiz);

  /* ---------- 彩帶 ---------- */
  const cv = $("#confetti"), cx = cv.getContext("2d"); let parts = [], anim = null;
  function burst(x, y, n) {
    cv.width = innerWidth; cv.height = innerHeight;
    const cols = ["#ff6b6b", "#ffd43b", "#51cf66", "#339af0", "#cc5de8", "#ff922b"];
    for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, v = 3 + Math.random() * 6; parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 4, s: 5 + Math.random() * 6, c: cols[i % cols.length], r: Math.random() * 6, life: 70 + Math.random() * 30 }); }
    if (!anim) anim = requestAnimationFrame(tick);
  }
  function tick() {
    cx.clearRect(0, 0, cv.width, cv.height);
    parts = parts.filter(p => p.life-- > 0);
    parts.forEach(p => { p.vy += .25; p.x += p.vx; p.y += p.vy; p.r += .2; cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.fillStyle = p.c; cx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); cx.restore(); });
    anim = parts.length ? requestAnimationFrame(tick) : (cx.clearRect(0, 0, cv.width, cv.height), null);
  }

  /* ---------- 背景泡泡 ---------- */
  const bub = $("#bubbles"), BC = ["#ff6b6b", "#ffd43b", "#51cf66", "#4dabf7", "#cc5de8", "#ff922b", "#20c997"];
  for (let i = 0; i < 14; i++) { const d = 20 + Math.random() * 60; const el = document.createElement("i"); Object.assign(el.style, { width: d + "px", height: d + "px", left: Math.random() * 100 + "%", background: BC[i % BC.length], animationDuration: 14 + Math.random() * 16 + "s", animationDelay: -Math.random() * 20 + "s" }); bub.appendChild(el); }

  /* ---------- 設定面板 ---------- */
  const SETS = [
    ["sFull", "full", [["on", true], ["off", false]]],
    ["sSound", "sound", [["on", true], ["off", false]]],
    ["sDevice", "device", [["auto", "auto"], ["phone", "phone"], ["tablet", "tablet"], ["desktop", "desktop"]]],
    ["sLayout", "layout", [["auto", "auto"], ["portrait", "portrait"], ["landscape", "landscape"]]],
    ["sLang", "lang", [["繁體中文", "zh"], ["English", "en"]]],
    ["sFont", "font", [["small", "small"], ["standard", "standard"], ["large", "large"]]],
    ["sTheme", "theme", [["system", "system"], ["light", "light"], ["dark", "dark"]]]
  ];
  const isFull = () => !!document.fullscreenElement;
  function renderSettings() {
    $("#settingsBody").innerHTML = SETS.map(([lab, key, opts]) => `<div class="set"><label>${t(lab)}</label><div class="opts">${opts.map(([n, v]) => {
      const cur = key === "full" ? isFull() : S[key];
      return `<button class="chip ${cur === v ? "on" : ""}" data-key="${key}" data-v='${JSON.stringify(v)}'>${esc(T.zh[n] ? t(n) : n)}</button>`;
    }).join("")}</div></div>`).join("");
  }
  $("#settingsBody").addEventListener("click", ev => {
    const b = ev.target.closest(".chip"); if (!b) return; const key = b.dataset.key, v = JSON.parse(b.dataset.v);
    if (key === "full") {
      const p = v ? document.documentElement.requestFullscreen?.() : document.fullscreenElement && document.exitFullscreen();
      Promise.resolve(p).catch(() => {}).finally(() => setTimeout(renderSettings, 150));
    } else {
      S[key] = v; store.set("settings", S);
      if (key === "device" && (v === "phone" || v === "tablet")) S.layout = "portrait";
      applySettings(); rerender();
    }
    snd.tap(); renderSettings();
  });
  document.addEventListener("fullscreenchange", () => { if (!$("#drawer").hidden) renderSettings(); });
  function applySettings() {
    const b = document.body;
    b.dataset.device = S.device; b.dataset.font = S.font;
    b.dataset.layout = S.layout === "auto" ? (S.device === "desktop" ? "landscape" : "portrait") : S.layout;
    if (S.theme === "system") document.documentElement.removeAttribute("data-theme"); else document.documentElement.dataset.theme = S.theme;
    document.documentElement.lang = S.lang === "en" ? "en" : "zh-Hant";
    $$("[data-i18n]").forEach(el => (el.textContent = t(el.dataset.i18n)));
    $$("[data-i18n-ph]").forEach(el => (el.placeholder = t(el.dataset.i18nPh)));
    $$("[data-i18n-aria]").forEach(el => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
    document.title = t("title");
  }
  $("#btnSettings").addEventListener("click", () => { renderSettings(); $("#drawer").hidden = false; snd.open(); });
  $("#btnCloseSettings").addEventListener("click", () => { $("#drawer").hidden = true; snd.close(); });

  /* ---------- 路由 ---------- */
  const VIEWS = ["home", "browse", "search", "fav", "quiz"];
  let cur = "home";
  function go(v) { if (location.hash !== "#" + v) location.hash = v; else show(v); }
  function show(v) {
    if (!VIEWS.includes(v)) v = "home";
    cur = v;
    VIEWS.forEach(x => ($("#view-" + x).hidden = x !== v));
    $$("#tabbar button").forEach(b => b.classList.toggle("active", b.dataset.view === v));
    rerender(); scrollTo({ top: 0 });
    if (v === "search") setTimeout(() => qEl.focus({ preventScroll: true }), 50);
  }
  function rerender() {
    if (cur === "home") renderHome();
    if (cur === "browse") renderBrowse();
    if (cur === "search") doSearch();
    if (cur === "fav") renderFav();
    if (cur === "quiz") { showBest(); if (!quiz) { $("#quizStart").hidden = false; } }
  }
  function refreshLists() { if (cur === "fav") renderFav(); if (cur === "browse" && browseMode === "unit") renderBrowse(); if (cur === "search") doSearch(); }
  $("#tabbar").addEventListener("click", ev => { const b = ev.target.closest("button"); if (!b) return; snd.tap(); go(b.dataset.view); });
  addEventListener("hashchange", () => { closeSheet(); show(location.hash.slice(1)); });
  addEventListener("keydown", ev => { if (ev.key === "Escape") { closeSheet(); $("#drawer").hidden = true; } });

  applySettings();
  show(location.hash.slice(1) || "home");
})();
