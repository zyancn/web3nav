document.addEventListener('DOMContentLoaded', function() {
    // 主题切换功能
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    let currentTheme = localStorage.getItem('theme') || 'light';
    
    // 初始化主题
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // 主题切换事件
    themeToggle.addEventListener('click', function() {
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            currentTheme = 'dark';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            currentTheme = 'light';
        }
        localStorage.setItem('theme', currentTheme);
    });
    
    // 谷歌搜索功能
    const searchForm = document.getElementById('google-search-form');
    const searchTypeRadios = document.querySelectorAll('input[name="search-type"]');
    const searchScope = document.getElementById('search-scope');
    
    // 监听搜索类型选择变化
    searchTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'web3') {
                // 如果选择Web3相关，添加搜索限制词
                searchScope.value = 'blockchain OR ethereum OR web3 OR crypto OR nft OR defi OR dao';
            } else {
                // 如果选择全网搜索，不限制搜索范围
                searchScope.value = '';
            }
        });
    });
    
    // 表单提交前处理
    searchForm.addEventListener('submit', function(e) {
        const searchInput = document.getElementById('search-input');
        const searchValue = searchInput.value.trim();
        
        // 如果搜索框为空，阻止提交
        if (searchValue === '') {
            e.preventDefault();
            return false;
        }
        
        // 如果选择了Web3相关，但没有通过as_sitesearch设置，则在搜索词中添加Web3相关关键词
        const web3Radio = document.querySelector('input[name="search-type"][value="web3"]');
        if (web3Radio.checked && searchScope.value) {
            // 将搜索限制词添加到隐藏字段，谷歌会自动处理
        }
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // 滚动时导航栏样式变化
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px var(--shadow-color)';
        } else {
            header.style.boxShadow = '0 2px 10px var(--shadow-color)';
        }
    });
    
    // 动态加载网站图标（如果图标链接失效）
    document.querySelectorAll('.site-icon img').forEach(img => {
        img.addEventListener('error', function() {
            // 图标加载失败时，使用首字母作为替代
            const siteName = this.closest('.site-card').querySelector('h4').textContent;
            const firstLetter = siteName.charAt(0).toUpperCase();
            
            const iconContainer = this.parentElement;
            iconContainer.innerHTML = '';
            iconContainer.style.backgroundColor = getRandomColor();
            iconContainer.style.color = '#ffffff';
            iconContainer.style.display = 'flex';
            iconContainer.style.alignItems = 'center';
            iconContainer.style.justifyContent = 'center';
            iconContainer.style.fontWeight = 'bold';
            iconContainer.style.fontSize = '1.5rem';
            iconContainer.style.borderRadius = '8px';
            iconContainer.textContent = firstLetter;
        });
    });
    
    // 生成随机颜色
    function getRandomColor() {
        const colors = [
            '#3498db', '#2ecc71', '#9b59b6', '#e74c3c', '#f39c12',
            '#1abc9c', '#d35400', '#c0392b', '#16a085', '#8e44ad'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
});