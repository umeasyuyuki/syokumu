<script>
// ======== ここで「送信先のGoogle Apps Script URL」を指定してください ========
const scriptURL = "https://script.google.com/macros/s/AKfycbzJCzE2eCpXSnKWU0Q3papybktyrrQV3h74tD0yZyHwTPwmkFZPwXJvGCzHhoXaH3dNOg/exec";

// (1) 初期処理
document.addEventListener('DOMContentLoaded', () => {
  const today = new Date();
  window.currentDateString = `${today.getFullYear()}年${String(today.getMonth()+1).padStart(2,'0')}月${String(today.getDate()).padStart(2,'0')}日`;
  setupBindings();
  updatePreviewPages();
});

// (2) バインド処理 (既存のもの)
function bindText(selector){
  const el = document.querySelector(selector);
  if(!el) return;
  el.addEventListener('input', () => {
    updatePreviewPages();
  });
}
function setupBindings(){
  // 氏名/電話/メール/職務要約/スキル/PR
  bindText('#input-name');
  bindText('#input-tel');
  bindText('#input-mail');
  bindText('#input-summary');
  bindText('#input-skill');
  bindText('#input-pr');

  // career1
  bindText('#career1-period');
  bindText('#career1-company');
  bindText('#career1-employment');
  bindText('#career1-position');
  bindText('#career1-business');
  bindText('#career1-duty');
  bindText('#career1-achievement');
  bindText('#career1-empcount');
  bindText('#career1-capital');
  bindText('#career1-market');

  // edu1
  bindText('#edu1-period');
  bindText('#edu1-school');

  // license1
  bindText('#license1-year');
  bindText('#license1-month');
  bindText('#license1-name');

  // lang1
  bindText('#lang1-lang');
  bindText('#lang1-level');
}

// (3) 追加/削除ボタン
let careerCount = 1;
document.getElementById('add-career-row').addEventListener('click', () => {
  careerCount++;
  const div = document.createElement('div');
  div.className = 'sub-section';
  div.innerHTML = `
    <label>期間</label>
    <input type="text" id="career${careerCount}-period">
    <label>会社名</label>
    <input type="text" id="career${careerCount}-company">
    <label>雇用形態</label>
    <input type="text" id="career${careerCount}-employment">
    <label>役職</label>
    <input type="text" id="career${careerCount}-position">
    <label>事業内容</label>
    <textarea id="career${careerCount}-business"></textarea>
    <label>業務内容</label>
    <textarea id="career${careerCount}-duty"></textarea>
    <label>実績</label>
    <textarea id="career${careerCount}-achievement"></textarea>
    <label>従業員数</label>
    <input type="text" id="career${careerCount}-empcount">
    <label>資本金</label>
    <input type="text" id="career${careerCount}-capital">
    <label>株式市場</label>
    <input type="text" id="career${careerCount}-market">
  `;
  document.getElementById('career-extra').appendChild(div);

  // バインド
  bindText(`#career${careerCount}-period`);
  bindText(`#career${careerCount}-company`);
  bindText(`#career${careerCount}-employment`);
  bindText(`#career${careerCount}-position`);
  bindText(`#career${careerCount}-business`);
  bindText(`#career${careerCount}-duty`);
  bindText(`#career${careerCount}-achievement`);
  bindText(`#career${careerCount}-empcount`);
  bindText(`#career${careerCount}-capital`);
  bindText(`#career${careerCount}-market`);

  updatePreviewPages();
});

document.getElementById('remove-career-row').addEventListener('click', () => {
  if (careerCount > 1) {
    document.getElementById('career-extra').removeChild(document.getElementById('career-extra').lastElementChild);
    careerCount--;
  } else {
    document.getElementById('career1-period').value = '';
    document.getElementById('career1-company').value = '';
    document.getElementById('career1-employment').value = '';
    document.getElementById('career1-position').value = '';
    document.getElementById('career1-business').value = '';
    document.getElementById('career1-duty').value = '';
    document.getElementById('career1-achievement').value = '';
    document.getElementById('career1-empcount').value = '';
    document.getElementById('career1-capital').value = '';
    document.getElementById('career1-market').value = '';
  }
  updatePreviewPages();
});

// 学歴
let eduCount = 1;
document.getElementById('add-edu-row').addEventListener('click', () => {
  eduCount++;
  const div = document.createElement('div');
  div.className = 'sub-section';
  div.innerHTML = `
    <label>期間</label>
    <input type="text" id="edu${eduCount}-period">
    <label>学校名</label>
    <input type="text" id="edu${eduCount}-school">
  `;
  document.getElementById('edu-extra').appendChild(div);

  bindText(`#edu${eduCount}-period`);
  bindText(`#edu${eduCount}-school`);

  updatePreviewPages();
});
document.getElementById('remove-edu-row').addEventListener('click', () => {
  if (eduCount > 1) {
    document.getElementById('edu-extra').removeChild(document.getElementById('edu-extra').lastElementChild);
    eduCount--;
  } else {
    document.getElementById('edu1-period').value = '';
    document.getElementById('edu1-school').value = '';
  }
  updatePreviewPages();
});

// 免許・資格
let licenseCount = 1;
document.getElementById('add-license-row').addEventListener('click', () => {
  licenseCount++;
  const div = document.createElement('div');
  div.className = 'sub-section';
  div.innerHTML = `
    <label>年</label>
    <input type="text" id="license${licenseCount}-year" placeholder="例：2025">
    <label>月</label>
    <input type="text" id="license${licenseCount}-month" placeholder="例：01">
    <label>免許・資格名</label>
    <input type="text" id="license${licenseCount}-name" placeholder="例：普通自動車免許">
  `;
  document.getElementById('license-extra').appendChild(div);

  bindText(`#license${licenseCount}-year`);
  bindText(`#license${licenseCount}-month`);
  bindText(`#license${licenseCount}-name`);

  updatePreviewPages();
});
document.getElementById('remove-license-row').addEventListener('click', () => {
  if (licenseCount > 1) {
    document.getElementById('license-extra').removeChild(document.getElementById('license-extra').lastElementChild);
    licenseCount--;
  } else {
    document.getElementById('license1-year').value = '';
    document.getElementById('license1-month').value = '';
    document.getElementById('license1-name').value = '';
  }
  updatePreviewPages();
});

// 語学
let langCount = 1;
document.getElementById('add-lang-row').addEventListener('click', () => {
  langCount++;
  const div = document.createElement('div');
  div.className = 'sub-section';
  div.innerHTML = `
    <label>語学</label>
    <input type="text" id="lang${langCount}-lang" placeholder="例：英語">
    <label>レベル</label>
    <input type="text" id="lang${langCount}-level" placeholder="例：ビジネス会話レベル">
  `;
  document.getElementById('lang-extra').appendChild(div);

  bindText(`#lang${langCount}-lang`);
  bindText(`#lang${langCount}-level`);

  updatePreviewPages();
});
document.getElementById('remove-lang-row').addEventListener('click', () => {
  if (langCount > 1) {
    document.getElementById('lang-extra').removeChild(document.getElementById('lang-extra').lastElementChild);
    langCount--;
  } else {
    document.getElementById('lang1-lang').value = '';
    document.getElementById('lang1-level').value = '';
  }
  updatePreviewPages();
});

// (4) プレビュー更新 (複数ページ)
function updatePreviewPages() {
  const wrap = document.getElementById('resumePages');
  wrap.innerHTML = '';

  function createNewPage() {
    const page = document.createElement('div');
    page.className = 'resume-page';
    wrap.appendChild(page);
    return page;
  }

  let currentPage = createNewPage(); 

  // タイトル & 名前など
  currentPage.appendChild( makeTitleBlock() );

  // 職務要約
  currentPage.appendChild( makeSectionTitle('職務要約') );
  {
    const text = document.getElementById('input-summary').value;
    const block = makeSimpleTable(text);
    if (isOverflowAfterAppend(currentPage, block)) {
      currentPage = createNewPage();
      currentPage.appendChild( makeSectionTitle('職務要約(続き)') );
    }
    currentPage.appendChild(block);
  }

  // 職歴
  currentPage.appendChild( makeSectionTitle('職歴') );
  for(let i=1; i<=careerCount; i++){
    const table = makeCareerTable(i);
    table.classList.add('career-table-block');
    if (isOverflowAfterAppend(currentPage, table)) {
      currentPage = createNewPage();
      currentPage.appendChild( makeSectionTitle('職歴(続き)') );
    }
    currentPage.appendChild(table);
  }

  // 学歴
  currentPage.appendChild( makeSectionTitle('学歴') );
  for(let i=1; i<=eduCount; i++){
    const table = makeEduTable(i);
    if (isOverflowAfterAppend(currentPage, table)) {
      currentPage = createNewPage();
      currentPage.appendChild( makeSectionTitle('学歴(続き)') );
    }
    currentPage.appendChild(table);
  }

  // 活かせる経験・知識・技術
  currentPage.appendChild( makeSectionTitle('活かせる経験・知識・技術') );
  {
    const text = document.getElementById('input-skill').value;
    const block = makeSimpleTable(text);
    if (isOverflowAfterAppend(currentPage, block)) {
      currentPage = createNewPage();
      currentPage.appendChild( makeSectionTitle('活かせる経験・知識・技術(続き)') );
    }
    currentPage.appendChild(block);
  }

  // 免許・資格
  currentPage.appendChild( makeSectionTitle('免許・資格') );
  for(let i=1; i<=licenseCount; i++){
    const table = makeLicenseTable(i);
    if (isOverflowAfterAppend(currentPage, table)) {
      currentPage = createNewPage();
      currentPage.appendChild( makeSectionTitle('免許・資格(続き)') );
    }
    currentPage.appendChild(table);
  }

  // 語学
  currentPage.appendChild( makeSectionTitle('語学') );
  for(let i=1; i<=langCount; i++){
    const table = makeLangTable(i);
    if (isOverflowAfterAppend(currentPage, table)) {
      currentPage = createNewPage();
      currentPage.appendChild( makeSectionTitle('語学(続き)') );
    }
    currentPage.appendChild(table);
  }

  // 自己PR
  currentPage.appendChild( makeSectionTitle('自己PR') );
  {
    const text = document.getElementById('input-pr').value;
    const block = makeSimpleTable(text);
    if (isOverflowAfterAppend(currentPage, block)) {
      currentPage = createNewPage();
      currentPage.appendChild( makeSectionTitle('自己PR(続き)') );
    }
    currentPage.appendChild(block);
  }
}

// (5) 要素生成系
function makeTitleBlock(){
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="preview-title">職務経歴書</div>
    <div class="top-right">
      <div>作成日: ${window.currentDateString||''}</div>
      <div>名前: ${esc(document.getElementById('input-name').value)}</div>
      <div>Tel: ${esc(document.getElementById('input-tel').value)}</div>
      <div>Mail: ${esc(document.getElementById('input-mail').value)}</div>
    </div>
  `;
  return div;
}
function makeSectionTitle(ttl){
  const d = document.createElement('div');
  d.className = 'preview-section-title';
  d.textContent = ttl;
  return d;
}

// ★★★ 枠を消すためにテーブルではなく div を使うよう変更 ★★★
function makeSimpleTable(text){
  const div = document.createElement('div');
  // 適度なマージン
  div.style.marginBottom = '10px';
  // 改行を反映
  div.style.whiteSpace = 'pre-wrap';
  // HTMLエスケープした文字をそのままテキストに
  div.textContent = text;
  return div;
}

function makeCareerTable(i){
  const p = docVal(`career${i}-period`);
  const c = docVal(`career${i}-company`);
  const e = docVal(`career${i}-employment`);
  const pos = docVal(`career${i}-position`);
  const b = docVal(`career${i}-business`);
  const d = docVal(`career${i}-duty`);
  const a = docVal(`career${i}-achievement`);
  const emp = docVal(`career${i}-empcount`);
  const cap = docVal(`career${i}-capital`);
  const m = docVal(`career${i}-market`);

  const table = document.createElement('table');
  table.innerHTML = `
    <tr>
      <th>期間</th>
      <td style="width:50mm;">${esc(p)}</td>
      <th>会社名</th>
      <td>${esc(c)}</td>
    </tr>
    <tr>
      <th>雇用形態</th>
      <td>${esc(e)}</td>
      <th>役職</th>
      <td>${esc(pos)}</td>
    </tr>
    <tr>
      <th>事業内容</th>
      <td colspan="3" class="box-large" style="height:auto;">${esc(b)}</td>
    </tr>
    <tr>
      <th>業務内容</th>
      <td colspan="3" class="box-large" style="height:auto;">${esc(d)}</td>
    </tr>
    <tr>
      <th>実績</th>
      <td colspan="3" class="box-large" style="height:auto;">${esc(a)}</td>
    </tr>
    <tr>
      <th>従業員数</th>
      <td>${esc(emp)}</td>
      <th>資本金</th>
      <td>${esc(cap)}</td>
    </tr>
    <tr>
      <th>株式市場</th>
      <td colspan="3">${esc(m)}</td>
    </tr>
  `;
  return table;
}
function makeEduTable(i){
  const p = docVal(`edu${i}-period`);
  const s = docVal(`edu${i}-school`);
  const table = document.createElement('table');
  table.innerHTML = `
    <tr>
      <th>期間</th>
      <td style="width:50mm;">${esc(p)}</td>
      <th>学校名</th>
      <td>${esc(s)}</td>
    </tr>
  `;
  return table;
}
function makeLicenseTable(i){
  const y = docVal(`license${i}-year`);
  const mo = docVal(`license${i}-month`);
  const nm = docVal(`license${i}-name`);
  const table = document.createElement('table');
  table.innerHTML = `
    <tr>
      <th>年</th>
      <td style="width:30mm;">${esc(y)}</td>
      <th>月</th>
      <td style="width:30mm;">${esc(mo)}</td>
    </tr>
    <tr>
      <th colspan="1" style="text-align:center;">免許・資格名</th>
      <td colspan="3" class="box-large" style="height:auto;">${esc(nm)}</td>
    </tr>
  `;
  return table;
}
function makeLangTable(i){
  const l = docVal(`lang${i}-lang`);
  const lv = docVal(`lang${i}-level`);
  const table = document.createElement('table');
  table.innerHTML = `
    <tr>
      <th>語学</th>
      <td>${esc(l)}</td>
      <th>レベル</th>
      <td>${esc(lv)}</td>
    </tr>
  `;
  return table;
}

// 補助関数
function docVal(id){ return document.getElementById(id)?.value || ''; }
function esc(str){ 
  return (str||'').replace(/[&<>"']/g, s => ({
    '&':'&amp;',
    '<':'&lt;',
    '>':'&gt;',
    '"':'&quot;',
    "'":'&#039;'
  })[s]);
}
function isOverflowAfterAppend(pageElem, blockElem){
  pageElem.appendChild(blockElem);
  const isOverflow = pageElem.scrollHeight > pageElem.clientHeight;
  pageElem.removeChild(blockElem);
  return isOverflow;
}

// ============== (6) PDFダウンロード + スプレッドシート送信 ==============
document.getElementById('download-pdf').addEventListener('click', async () => {
  
  // (A) まずスプレッドシートへ送信する
  const sendData = {
    createdDate: window.currentDateString || "",
    name: docVal('input-name'),
    tel:  docVal('input-tel'),
    mail: docVal('input-mail')
  };

  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(sendData)
    });
    const resultText = await response.text();
    console.log("スプレッドシート送信結果:", resultText);
  } catch(e) {
    console.error("送信エラー:", e);
  }

  // (B) PDFをダウンロードする処理
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('portrait', 'pt', 'a4'); 
  const pages = document.querySelectorAll('.resume-page');

  for(let i=0; i<pages.length; i++){
    if(i>0) pdf.addPage();
    const canvas = await html2canvas(pages[i], { scale: 2 });
    const imgData = canvas.toDataURL('image/jpeg', 1.0);

    const pdfWidth  = pdf.internal.pageSize.getWidth();  
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidthPx  = canvas.width;
    const imgHeightPx = canvas.height;
    const scale = pdfWidth / imgWidthPx;
    const imgHeightInPdf = imgHeightPx * scale;
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, imgHeightInPdf);
  }
  pdf.save('職務経歴書.pdf');
});
</script>
