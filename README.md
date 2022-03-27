# 重點解說
## 整體考量
- 除了正確及有效率的達成功能要求之外，也注重元件的可充用性和擴充性

## 檔案結構
- `pages/`：各route的container，如果需要dispatch Redux actions傾向集中在此管理
- `components/`：包含頁面會需要的各元件，並建立共用元件庫
- `store/`：管理Redux相關actions和reducers

## UI
- 共用元件：包含header, search bar, select, table，在此可設定基本的UI和邏輯，但不包含domain logic
- Repos page：
  - 搜尋：在文字輸入框之外也實作了sort和order選項，根據API文件，未指定sort時，order的值會被忽略並使用預設值`desc`
  - 列表：利用共用元件實作`ReposTable`顯示搜尋結果，載入過程中顯示`Loading...`文字提示使用者
  - 錯誤訊息：顯示於搜尋區塊下方

## 程式邏輯
- 執行搜尋：搜尋前先比對新舊參數，有變動才執行
- Debounce：文字框停止輸入後經過給定時間才執行搜尋
- Infinite scroll: 
  - 用clientHeight + scrollTop跟scrollHeight比對捲動量，幾乎觸底時fetch下一頁內容
  - 若收到錯誤訊息則停用此功能
  - 若目前捲動位置在第二頁以後，此時變動搜尋文字、sort、order時因為page會回到`1`，列表會自動捲動到頂端避免誤打多次API，但如果沒有搜尋結果則不需要進行，用`useEffect`偵測是否符合條件

## Redux
- 除了搜尋結果，也將搜尋參數儲存在此，考量到3個優點：
  - 頁面在搜尋時的payload只需要傳關鍵字、sort、order、page當中有變動的部分就好，其他可以直接在thunk裡從store取得
  - 若有增加其他的routes，換頁之後回來不會導致錯亂
  - 若有多層元件，能夠直接取得state，無需透過props逐層傳送
- 在fetch API前先行檢查，沒有關鍵字則不需要執行
- Error handling：422和503錯誤根據API文件指定對應的error message，其他則用error本身的message或status code告知user，同時會重設搜尋參數成之前的狀態

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
