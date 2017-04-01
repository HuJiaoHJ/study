const path = require('path');
const fs = require('fs');
const glob = require('glob');

var html = glob.sync('./src/*/**/*.html').map(function (item) {
    return new HtmlWebpackPlugin({
        filename: item.substr(6),
        template: 'ejs-compiled-loader!' + item,
        inject: false,
        minify: false
    });
});

let markdowns = glob.sync('./md/*.md').map((file) => {
    return file.substr(5);
});

const contentObj = {};

for (let item of markdowns) {
    const title = item.split('_')[0];
    if (!contentObj[title]) {
        contentObj[title] = [];
    }
    contentObj[title].push(item);
}

let content = `#### Study Notes`;

for (let item of Object.keys(contentObj)) {
    content += `\r\n\r\n##### ${item} \r\n\r\n`;
    for (let i of contentObj[item]) {
        content += `* [${i.split('_')[1].replace(/\.md$/, '')}](./md/${i}) \r\n`;
    }
}

const readme = path.resolve(__dirname, './README.md');

fs.writeFileSync(readme, content, 'utf8');
