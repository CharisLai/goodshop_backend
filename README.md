<h3>GoodShop 購物平台 -- backend</h3>

<h4>簡介</h4>
<p>以Node.js MySQL 實作購物網站後端API</p>
<h4>核心功能</h4>
<ui>
    <li>商品展示 / 庫存量 敘述 價格</li>
    <li>購物車/ 品項加入購物車 數量增減 品項刪除 總額計算</li>
    <li>後台商品管理/ 品項 增刪改查 圖片上傳功能</li>
    <li>使用者權限區分 訪客首頁瀏覽 會員 商家</li>
</ui>
<h4>開發工具</h4>
<ul>
<li>Node.js 16.16.0<br>
<li>Express 4.16.4<br>
<li>Express-Handlebars 4.0.2<br>
<li>Bootstrap 4.3.1<br>
<li>MySQL <br>
</ul>
<h4>安裝</h4>
<ol>
    <li>基本條件： 確認本地已安裝 Node.js、npm 與 MySQL workbench</li>
    <li>將此專案Clone 到本地指定資料夾並載入組件，輸入： <code>npm install</code></li>
    <li>使用MySQL workbench建立新的Schema</li>
    <li>載入初始化資料庫與種子資料，請檢查是否成功連接至本地資料庫<br> <code>npx sequelize db:migrate</code> <br> <code>npx sequelize db:seed all</code></li>
    <li>請參考 .env.example 更新環境變數.env</li>
    <li>在本地運行程式 <code>npm run dev</code></li>
</ol>
<h4>測試帳號</h4>
<table>
<thead>
<tr>
<th>使用權限</th>
<th>Email</th>
<th>Password</th>
</tr>
</thead>
<tbody>
<tr>
<td>會員</td>
<td>buyer001@example.com</td>
<td>titaner</td>
</tr>
<tr>
<td>商家</td>
<td>seller001@example.com</td>
<td>titaner</td>
</tr>
</tbody>
</table>