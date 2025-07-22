document.addEventListener('DOMContentLoaded', function() {
    // 导入Web3库
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/web3@1.8.2/dist/web3.min.js';
    script.onload = initWeb3Tools;
    document.head.appendChild(script);
    
    // 导入ethers库
    const ethersScript = document.createElement('script');
    ethersScript.src = 'https://cdn.ethers.io/lib/ethers-5.7.2.umd.min.js';
    document.head.appendChild(ethersScript);
    
    // 导入keccak库
    const keccakScript = document.createElement('script');
    keccakScript.src = 'https://cdn.jsdelivr.net/npm/keccak@3.0.3/browser.min.js';
    document.head.appendChild(keccakScript);
    
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
    
    // 初始化Web3工具
    function initWeb3Tools() {
        // 初始化Web3实例
        window.web3 = new Web3(window.ethereum || "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
        
        // 初始化各个工具模块
        initAddressTools();
        initHashTools();
        initConverterTools();
        initSignatureTools();
    }
    
    // 地址工具模块初始化
    function initAddressTools() {
        // 以太坊地址验证
        const validateEthAddressBtn = document.getElementById('validate-eth-address');
        const ethAddressInput = document.getElementById('eth-address');
        const ethAddressResult = document.getElementById('eth-address-result');
        
        if (validateEthAddressBtn) {
            validateEthAddressBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const address = ethAddressInput.value.trim();
                
                if (!address) {
                    ethAddressResult.innerHTML = '<div class="error">请输入以太坊地址</div>';
                    return;
                }
                
                try {
                    const isValid = web3.utils.isAddress(address);
                    const checksumAddress = isValid ? web3.utils.toChecksumAddress(address) : null;
                    
                    if (isValid) {
                        ethAddressResult.innerHTML = `
                            <div class="success">✓ 有效的以太坊地址</div>
                            <div class="result-item">校验和地址: ${checksumAddress}</div>
                        `;
                    } else {
                        ethAddressResult.innerHTML = '<div class="error">✗ 无效的以太坊地址</div>';
                    }
                } catch (error) {
                    ethAddressResult.innerHTML = `<div class="error">✗ 验证失败: ${error.message}</div>`;
                }
            });
        }
        
        // 地址格式转换
        const convertAddressBtn = document.getElementById('convert-address');
        const addressToConvert = document.getElementById('address-to-convert');
        const addressConvertFrom = document.getElementById('address-convert-from');
        const addressConvertTo = document.getElementById('address-convert-to');
        const addressConvertResult = document.getElementById('address-convert-result');
        
        if (convertAddressBtn) {
            convertAddressBtn.addEventListener('click', function() {
                const address = addressToConvert.value.trim();
                const fromType = addressConvertFrom.value;
                const toType = addressConvertTo.value;
                
                if (!address) {
                    addressConvertResult.innerHTML = '<div class="error">请输入地址</div>';
                    return;
                }
                
                try {
                    // 根据地址类型进行验证
                    let isValid = false;
                    if (fromType === 'eth' || fromType === 'bsc') {
                        isValid = web3.utils.isAddress(address);
                    } else if (fromType === 'sol') {
                        // 简单验证Solana地址格式（实际应使用专门的库）
                        isValid = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
                    }
                    
                    if (!isValid) {
                        addressConvertResult.innerHTML = `<div class="error">✗ 无效的${fromType === 'eth' ? '以太坊' : fromType === 'bsc' ? 'BSC' : 'Solana'}地址</div>`;
                        return;
                    }
                    
                    // 根据目标格式进行转换
                    let result = '';
                    if (toType === 'checksum' && (fromType === 'eth' || fromType === 'bsc')) {
                        result = web3.utils.toChecksumAddress(address);
                    } else if (toType === 'lowercase') {
                        result = address.toLowerCase();
                    } else if (toType === 'hex') {
                        result = address.startsWith('0x') ? address : `0x${address}`;
                        result = result.toLowerCase();
                    }
                    
                    addressConvertResult.innerHTML = `
                        <div class="success">✓ 转换成功</div>
                        <div class="result-item">转换结果: ${result}</div>
                    `;
                } catch (error) {
                    addressConvertResult.innerHTML = `<div class="error">✗ 转换失败: ${error.message}</div>`;
                }
            });
        }
        
        // ENS域名查询
        const lookupEnsBtn = document.getElementById('lookup-ens');
        const ensLookupInput = document.getElementById('ens-name');
        const ensLookupResult = document.getElementById('ens-result');
        
        if (lookupEnsBtn) {
            lookupEnsBtn.addEventListener('click', async function(e) {
                e.preventDefault();
                const ensName = ensLookupInput.value.trim();
                
                if (!ensName) {
                    ensLookupResult.innerHTML = '<div class="error">请输入ENS域名</div>';
                    return;
                }
                
                ensLookupResult.innerHTML = '<div class="loading">查询中...</div>';
                
                try {
                    // 使用ethers.js查询ENS
                    const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
                    const address = await provider.resolveName(ensName);
                    
                    if (address) {
                        ensLookupResult.innerHTML = `
                            <div class="success">✓ 已解析</div>
                            <div class="result-item">地址: ${address}</div>
                        `;
                    } else {
                        ensLookupResult.innerHTML = '<div class="error">✗ 未找到对应的地址</div>';
                    }
                } catch (error) {
                    ensLookupResult.innerHTML = `<div class="error">✗ 查询失败: ${error.message}</div>`;
                }
            });
        }
    }
    
    // 哈希工具模块初始化
    function initHashTools() {
        // Keccak-256哈希计算
        const calculateKeccakBtn = document.getElementById('calculate-keccak');
        const keccakHashInput = document.getElementById('keccak-input');
        const keccakHashResult = document.getElementById('keccak-result');
        
        if (calculateKeccakBtn) {
            calculateKeccakBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const input = keccakHashInput.value.trim();
                
                if (!input) {
                    keccakHashResult.innerHTML = '<div class="error">请输入要计算哈希的内容</div>';
                    return;
                }
                
                try {
                    const hash = web3.utils.keccak256(input);
                    keccakHashResult.innerHTML = `
                        <div class="success">✓ 计算完成</div>
                        <div class="result-item">Keccak-256哈希: ${hash}</div>
                    `;
                } catch (error) {
                    keccakHashResult.innerHTML = `<div class="error">✗ 计算失败: ${error.message}</div>`;
                }
            });
        }
        
        // SHA-256哈希计算
        const calculateSha256Btn = document.getElementById('calculate-sha256');
        const shaHashInput = document.getElementById('sha256-input');
        const shaHashResult = document.getElementById('sha256-result');
        
        if (calculateSha256Btn) {
            calculateSha256Btn.addEventListener('click', async function(e) {
                e.preventDefault();
                const input = shaHashInput.value.trim();
                
                if (!input) {
                    shaHashResult.innerHTML = '<div class="error">请输入要计算哈希的内容</div>';
                    return;
                }
                
                try {
                    // 使用Web API计算SHA-256
                    const encoder = new TextEncoder();
                    const data = encoder.encode(input);
                    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
                    const hashArray = Array.from(new Uint8Array(hashBuffer));
                    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                    
                    shaHashResult.innerHTML = `
                        <div class="success">✓ 计算完成</div>
                        <div class="result-item">SHA-256哈希: 0x${hashHex}</div>
                    `;
                } catch (error) {
                    shaHashResult.innerHTML = `<div class="error">✗ 计算失败: ${error.message}</div>`;
                }
            });
        }
        
        // 哈希比较工具
        const compareHashBtn = document.getElementById('compare-hash');
        const hashCompareInput1 = document.getElementById('hash1');
        const hashCompareInput2 = document.getElementById('hash2');
        const hashCompareResult = document.getElementById('hash-compare-result');
        
        if (compareHashBtn) {
            compareHashBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const hash1 = hashCompareInput1.value.trim();
                const hash2 = hashCompareInput2.value.trim();
                
                if (!hash1 || !hash2) {
                    hashCompareResult.innerHTML = '<div class="error">请输入两个哈希值进行比较</div>';
                    return;
                }
                
                // 标准化哈希值（移除0x前缀并转为小写）
                const normalizedHash1 = hash1.startsWith('0x') ? hash1.slice(2).toLowerCase() : hash1.toLowerCase();
                const normalizedHash2 = hash2.startsWith('0x') ? hash2.slice(2).toLowerCase() : hash2.toLowerCase();
                
                if (normalizedHash1 === normalizedHash2) {
                    hashCompareResult.innerHTML = '<div class="success">✓ 哈希值匹配</div>';
                } else {
                    hashCompareResult.innerHTML = '<div class="error">✗ 哈希值不匹配</div>';
                }
            });
        }
    }
    
    // 单位转换工具模块初始化
    function initConverterTools() {
        // 以太坊单位转换
        const convertEthUnitsBtn = document.getElementById('convert-eth-units');
        const ethUnitInput = document.getElementById('eth-value');
        const ethUnitFromSelect = document.getElementById('eth-unit-from');
        const ethUnitToSelect = document.getElementById('eth-unit-to');
        const ethUnitResult = document.getElementById('eth-unit-result');
        
        if (convertEthUnitsBtn) {
            convertEthUnitsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const value = ethUnitInput.value.trim();
                const fromUnit = ethUnitFromSelect.value;
                const toUnit = ethUnitToSelect.value;
                
                if (!value || isNaN(value)) {
                    ethUnitResult.innerHTML = '<div class="error">请输入有效的数值</div>';
                    return;
                }
                
                try {
                    let result;
                    if (fromUnit === 'wei') {
                        result = web3.utils.fromWei(value, toUnit);
                    } else if (toUnit === 'wei') {
                        result = web3.utils.toWei(value, fromUnit);
                    } else {
                        // 先转换为wei，再转换为目标单位
                        const valueInWei = web3.utils.toWei(value, fromUnit);
                        result = web3.utils.fromWei(valueInWei, toUnit);
                    }
                    
                    ethUnitResult.innerHTML = `
                        <div class="success">✓ 转换完成</div>
                        <div class="result-item">${value} ${fromUnit} = ${result} ${toUnit}</div>
                    `;
                } catch (error) {
                    ethUnitResult.innerHTML = `<div class="error">✗ 转换失败: ${error.message}</div>`;
                }
            });
        }
        
        // Gas费用计算器
        const calculateGasFeeBtn = document.getElementById('calculate-gas-fee');
        const gasLimitInput = document.getElementById('gas-limit');
        const gasPriceInput = document.getElementById('gas-price');
        const gasCalcResult = document.getElementById('gas-fee-result');
        
        if (calculateGasFeeBtn) {
            calculateGasFeeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const gasLimit = gasLimitInput.value.trim();
                const gasPrice = gasPriceInput.value.trim();
                
                if (!gasLimit || !gasPrice || isNaN(gasLimit) || isNaN(gasPrice)) {
                    gasCalcResult.innerHTML = '<div class="error">请输入有效的Gas Limit和Gas Price</div>';
                    return;
                }
                
                try {
                    // 计算Gas费用（以wei为单位）
                    const gasFeeWei = BigInt(Math.floor(parseFloat(gasLimit))) * BigInt(Math.floor(parseFloat(gasPrice) * 1e9));
                    const gasFeeGwei = Number(gasFeeWei) / 1e9;
                    const gasFeeEth = web3.utils.fromWei(gasFeeWei.toString(), 'ether');
                    
                    gasCalcResult.innerHTML = `
                        <div class="success">✓ 计算完成</div>
                        <div class="result-item">Gas费用: ${gasFeeEth} ETH</div>
                        <div class="result-item">Gas费用: ${gasFeeGwei} Gwei</div>
                        <div class="result-item">Gas费用: ${gasFeeWei.toString()} Wei</div>
                    `;
                } catch (error) {
                    gasCalcResult.innerHTML = `<div class="error">✗ 计算失败: ${error.message}</div>`;
                }
            });
        }
        
        // 时间戳转换
        const convertTimestampBtn = document.getElementById('convert-timestamp');
        const currentTimestampBtn = document.getElementById('current-timestamp');
        const timestampInput = document.getElementById('timestamp');
        const timestampResult = document.getElementById('timestamp-result');
        
        if (convertTimestampBtn) {
            convertTimestampBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const timestamp = timestampInput.value.trim();
                
                if (!timestamp) {
                    timestampResult.innerHTML = '<div class="error">请输入时间戳</div>';
                    return;
                }
            });
        }
        
        if (currentTimestampBtn) {
            currentTimestampBtn.addEventListener('click', function(e) {
                e.preventDefault();
                // 获取当前时间戳
                const now = Math.floor(Date.now() / 1000);
                timestampInput.value = now;
                
                // 显示转换结果
                const date = new Date(now * 1000);
                const formattedDate = date.toLocaleString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                });
                
                timestampResult.innerHTML = `
                    <div class="success">✓ 当前时间戳</div>
                    <div class="result-item">时间戳: ${now}</div>
                    <div class="result-item">日期时间: ${formattedDate}</div>
                    <div class="result-item">UTC时间: ${date.toUTCString()}</div>
                `;
            });
        }
        
        // 注意：此事件监听器已在上面定义，这里删除重复代码
    }
    
    // 签名验证工具模块初始化
    function initSignatureTools() {
        // 消息签名验证
        const verifyEthSignatureBtn = document.getElementById('verify-eth-signature');
        const sigMessageInput = document.getElementById('verify-message');
        const sigSignatureInput = document.getElementById('verify-signature');
        const sigAddressInput = document.getElementById('verify-address');
        const sigVerifyResult = document.getElementById('signature-verify-result');
        
        if (verifyEthSignatureBtn) {
            verifyEthSignatureBtn.addEventListener('click', async function(e) {
                e.preventDefault();
                const message = sigMessageInput.value.trim();
                const signature = sigSignatureInput.value.trim();
                const address = sigAddressInput.value.trim();
                
                if (!message || !signature || !address) {
                    sigVerifyResult.innerHTML = '<div class="error">请填写所有字段</div>';
                    return;
                }
                
                try {
                    // 使用ethers.js验证签名
                    const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
                    const signerAddr = ethers.utils.verifyMessage(message, signature);
                    
                    if (signerAddr.toLowerCase() === address.toLowerCase()) {
                        sigVerifyResult.innerHTML = `
                            <div class="success">✓ 签名验证成功</div>
                            <div class="result-item">签名者地址: ${signerAddr}</div>
                        `;
                    } else {
                        sigVerifyResult.innerHTML = `
                            <div class="error">✗ 签名验证失败</div>
                            <div class="result-item">签名者地址: ${signerAddr}</div>
                            <div class="result-item">提供的地址: ${address}</div>
                        `;
                    }
                } catch (error) {
                    sigVerifyResult.innerHTML = `<div class="error">✗ 验证失败: ${error.message}</div>`;
                }
            });
        }
        
        // 签名类型检测
        const detectSignatureTypeBtn = document.getElementById('detect-signature-type');
        const sigTypeInput = document.getElementById('signature-to-check');
        const sigTypeResult = document.getElementById('signature-type-result');
        
        if (detectSignatureTypeBtn) {
            detectSignatureTypeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const signature = sigTypeInput.value.trim();
                
                if (!signature) {
                    sigTypeResult.innerHTML = '<div class="error">请输入签名</div>';
                    return;
                }
                
                try {
                    let sigType = '未知';
                    let description = '';
                    
                    // 移除0x前缀进行检查
                    const sigWithout0x = signature.startsWith('0x') ? signature.slice(2) : signature;
                    
                    if (sigWithout0x.length === 130) {
                        // 检查v值
                        const v = sigWithout0x.slice(128);
                        if (v === '1b' || v === '1c') {
                            sigType = 'Ethereum签名 (EIP-191)';
                            description = '标准以太坊签名，用于签署消息。';
                        } else if (v === '00' || v === '01') {
                            sigType = 'EIP-2098签名';
                            description = '压缩格式的以太坊签名。';
                        }
                    } else if (sigWithout0x.length === 128) {
                        sigType = 'EIP-2098压缩签名';
                        description = '压缩格式的以太坊签名，省略了v值。';
                    } else if (signature.startsWith('0x')) {
                        if (signature.length > 132) {
                            sigType = '可能是EIP-712结构化数据签名';
                            description = '用于签署结构化数据的签名格式。';
                        }
                    }
                    
                    sigTypeResult.innerHTML = `
                        <div class="success">✓ 检测完成</div>
                        <div class="result-item">签名类型: ${sigType}</div>
                        <div class="result-item">描述: ${description}</div>
                        <div class="result-item">签名长度: ${signature.length}字符</div>
                    `;
                } catch (error) {
                    sigTypeResult.innerHTML = `<div class="error">✗ 检测失败: ${error.message}</div>`;
                }
            });
        }
    }
});