# Web3导航网站

一个简洁大气的Web3网址导航网站，集合了DeFi、NFT、DAO、元宇宙和Web3工具等多个分类的优质资源，并支持谷歌AdSense广告投放。

## 功能特点

- 简洁大气的UI设计
- 响应式布局，适配各种设备
- 暗黑模式支持
- 实时搜索功能
- 分类展示Web3资源
- 谷歌AdSense广告位集成
- 平滑滚动导航

## 文件结构

```
/
├── index.html      # 主HTML文件
├── styles.css      # CSS样式文件
├── script.js       # JavaScript交互文件
└── README.md       # 项目说明文档
```

## 使用方法

1. 克隆或下载本项目到本地
2. 使用浏览器打开`index.html`文件即可查看网站
3. 根据需要修改网站内容和样式

## 谷歌AdSense配置

要启用谷歌AdSense广告，请按照以下步骤操作：

1. 注册谷歌AdSense账户并获取您的发布商ID
2. 在`index.html`文件中找到以下代码：

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ADSENSE_ID"></script>
```

3. 将`YOUR_ADSENSE_ID`替换为您的AdSense发布商ID
4. 对页面中的所有广告单元进行类似的替换：

```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-YOUR_ADSENSE_ID"
     data-ad-slot="YOUR_AD_SLOT_ID"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
```

5. 将`YOUR_AD_SLOT_ID`替换为您在AdSense后台创建的广告单元ID

## 自定义和扩展

### 添加新网站

要添加新的网站到导航中，只需在相应分类的`site-grid`中添加新的`site-card`元素：

```html
<a href="网站URL" class="site-card" target="_blank">
    <div class="site-icon"><img src="网站图标URL" alt="网站名称"></div>
    <div class="site-info">
        <h4>网站名称</h4>
        <p>网站描述</p>
    </div>
</a>
```

### 添加新分类

要添加新的分类，可以复制现有分类的HTML结构并修改：

```html
<section class="category" id="新分类ID">
    <div class="category-header">
        <h3><i class="fas fa-图标代码"></i> 分类名称</h3>
        <p>分类描述</p>
    </div>
    <div class="site-grid">
        <!-- 网站卡片 -->
    </div>
</section>
```

同时，记得在导航菜单中添加对应的链接：

```html
<li><a href="#新分类ID">分类名称</a></li>
```

## 许可证

本项目采用MIT许可证。详情请参阅LICENSE文件。

## 联系方式

如有任何问题或建议，请通过以下方式联系我们：

- 电子邮件：your.email@example.com
- 网站：https://yourwebsite.com

---

祝您使用愉快！